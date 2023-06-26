import { useEffect, useState } from "react";
import supabase from "../server/supabaseClient";
import AddParticipantsModal from "../components/modals/AddParticipantsModal";
import WorkoutsModal from "../components/modals/WorkoutsModal";

const style = {
  tableHeaders: `px-6 py-4 text-md text-gray-500`,
  table: `flex flex-col bg-gray-100 shadow-xl relative`,
  addTimeButton: `bg-green-200 rounded-lg px-4`,
  tableBodyRow: `px-6 py-4 text-md text-gray-500`
}

const ParticipantTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: participants, error } = await supabase
        .from('participant')
        .select('*')

      if (error) {
        console.error('Error fetching participants:', error.message);
        return;
      }

      const { data: workouts } = await supabase
        .from('workout')
        .select();

      const mergedData = participants.map((participant) => {
        const participantWorkouts = workouts.filter(
          (workout) => workout.participant_id === participant.id
        );
        return { ...participant, workouts: participantWorkouts };
      });
      setTableData(mergedData);
    };

    fetchData();
  }, []);

  const getWorkoutByNumber = (participant, workoutNumber) => {
    return participant.workouts.find(
      (workout) => workout.workout_nr === workoutNumber
    );
  };

  return (
    <div>
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
            <tbody className="bg-white divide-y divide-gray-300">
              {tableData.map((participant) => (
                <tr key={participant.id}>
                  <td className={style.tableBodyRow}>{participant.standing ? (participant.standing) 
                  : (<p>null</p>)
                  }</td>
                  <td className={style.tableBodyRow}>{participant.first_name + " " + participant.last_name}</td>
                  <td className={style.tableBodyRow}>
                    {getWorkoutByNumber(participant, 1) ? (
                      <>{participant.workouts[0].time_mins + "m : " + participant.workouts[0].time_secs + "s (" + participant.workouts[0].rank + ") "}</>) 
                      : (<WorkoutsModal participant={participant} workout={1} />)
                    }
                  </td>
                  <td className={style.tableBodyRow}>
                    {getWorkoutByNumber(participant, 2) ? (
                    <>{getWorkoutByNumber(participant, 2)?.time_mins + "m : " + getWorkoutByNumber(participant, 2)?.time_secs + "s (" + getWorkoutByNumber(participant, 2)?.rank + ") "}</>) 
                    : 
                      (<WorkoutsModal participant={participant} workout={2} />)
                    }
                  </td>
                  <td className={style.tableBodyRow}>
                    {getWorkoutByNumber(participant, 3) ? (
                      <>{getWorkoutByNumber(participant, 3)?.time_mins + "m : " + getWorkoutByNumber(participant, 3)?.time_secs + "s (" + getWorkoutByNumber(participant, 3)?.rank + ") "}</>) 
                      : (<WorkoutsModal participant={participant} workout={3} />)
                    }
                  </td>
                  <td className={style.tableBodyRow}>
                    {getWorkoutByNumber(participant, 4) ? (
                      <>{getWorkoutByNumber(participant, 4)?.time_mins + "m : " + getWorkoutByNumber(participant, 4)?.time_secs + "s (" + getWorkoutByNumber(participant, 4)?.rank + ") "}</>) 
                      : (<WorkoutsModal participant={participant} workout={4} />)
                    }
                  </td>
                  <td className={style.tableBodyRow}>{participant.overall ? (participant.standing) 
                  : (<p>null</p>)
                  }</td>
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
