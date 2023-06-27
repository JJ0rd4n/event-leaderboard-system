import { useEffect, useState } from "react";
import supabase from "../server/supabaseClient";
import AddParticipantsModal from "../components/modals/AddParticipantsModal";
import WorkoutsModal from "../components/modals/WorkoutsModal";
import Navbar from "../components/Navbar";



const ParticipantTable = () => {
  const [participants, setParticipants] = useState([]);

  const style = {
    tableHeaders: `px-6 py-4 text-md text-gray-500`,
    table: `flex flex-col bg-gray-100 shadow-xl relative`,
    addTimeButton: `bg-green-200 rounded-lg px-4`,
    tableBodyRow: `px-6 py-4 text-md text-gray-500`
  }
  
  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const { data: participantsData, error: participantsError } = await supabase
      .from('participants')
      .select('id, first_name, last_name, standing');
  
    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
    } else {
      // Fetch workouts data
      const { data: workoutsData, error: workoutsError } = await supabase
        .from('workouts')
        .select('id, participant_id, workout_nr, rank, time_mins, time_secs');
  
      if (workoutsError) {
        console.error('Error fetching workouts:', workoutsError);
      } else {
        // Fetch workout ranks data
        const { data: workoutRanksData, error: workoutRanksError } = await supabase
          .from('workout_ranks')
          .select('id, workout_nr, rank, time_mins, time_secs');
  
        if (workoutRanksError) {
          console.error('Error fetching workout ranks:', workoutRanksError);
        } else {

          const updatedParticipants = updateWorkoutRanks(participantsData, workoutsData, workoutRanksData);

          const standings = calculateStandings(updatedParticipants);
  
          setParticipants(standings);
        }
      }
    }
  };
  
  const updateWorkoutRanks = (participants, workouts, workoutRanks) => {
    const updatedParticipants = participants.map((participant) => {
      const participantWorkouts = workouts.filter((workout) => workout.participant_id === participant.id);
  
      const participantWorkoutsWithRanks = participantWorkouts.map((workout) => {
        const matchingRank = workoutRanks.find(
          (rank) => rank.id === workout.id && rank.workout_nr === workout.workout_nr
        );
        if (matchingRank) {
          return {
            ...workout,
            rank: matchingRank.rank
          };
        } else {
          return workout;
        }
      });
  
      const overall_points = participantWorkoutsWithRanks.reduce((sum, workout) => sum + workout.rank, 0);
  
      return {
        ...participant,
        workouts: participantWorkoutsWithRanks,
        overall_points,
      };
    });
  
    return updatedParticipants;
  };

  const calculateStandings = (participants) => {
    const sortedParticipants = [...participants].sort((a, b) => b.overallScore - a.overallScore);

    const standings = sortedParticipants.map((participant, index) => ({
      ...participant,
      standing: index + 1,
    }));

    return standings;
  };

  return (
    <div>
      <Navbar />
      <AddParticipantsModal />
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <table className="divide-y divide-gray-300">
            <thead className="text-gray-700 text-base uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className={style.tableHeaders}>Standing</th>
                <th className={style.tableHeaders}>Participant</th>
                <th className={style.tableHeaders}>Workout 1</th>
                <th className={style.tableHeaders}>Workout 2</th>
                <th className={style.tableHeaders}>Workout 3</th>
                <th className={style.tableHeaders}>Workout 4</th>
                <th className={style.tableHeaders}>Overall Points</th>
              </tr>
            </thead>
            <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className={style.tableBodyRow}>{participant.standing ? (participant.standing) 
                  : (<p>null</p>)
                  }</td>
              <td className={style.tableBodyRow}>{participant.first_name + " " + participant.last_name}</td>
              {[1, 2, 3, 4].map((workoutNumber) => {
                const workout = participant.workouts.find(
                  (workout) => workout.workout_nr === workoutNumber
                );

                return (
                  <td key={workoutNumber}>
                    {workout && workout.rank !== undefined ? (
                      <div className={style.tableBodyRow}>{workout.time_mins + ":" + workout.time_secs + " (" + workout.rank + ") "}</div>
                    ) : (
                      (<WorkoutsModal participant={participant} workoutNr={workoutNumber} />)
                    )}
                  </td>
                );
              })}
              <td>{participant.overall_points}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParticipantTable;
