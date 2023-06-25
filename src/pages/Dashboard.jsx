import { useEffect, useState } from "react";
import supabase from "../server/supabaseClient";
import AddParticipantsModal from "../components/modals/AddParticipantsModal";
import WorkoutsModal from "../components/modals/WorkoutsModal";

const style = {
  tableHeaders: `px-6 py-4 text-md text-gray-500`,
  table: `flex flex-col bg-gray-100 shadow-xl relative`,
  addTimeButton: `bg-green-200 rounded-lg px-4`
}

const ParticipantTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch the table data from your database, joining the participants and workouts tables
    // Example API call using Supabase client library:
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
        .select('*');

      const mergedData = participants.map((participant) => {
        const participantWorkouts = workouts.filter(
          (workout) => workout.participantId === participant.id
        );
        return { ...participant, workouts: participantWorkouts };
      });

      setTableData(mergedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <AddParticipantsModal />
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <table className="divide-y divide-gray-300">
            <thead className="text-gray-700 text-base uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className={style.tableHeaders}>Standing</th>
                <th className={style.tableHeaders}>Name</th>
                <th className={style.tableHeaders}>Workout 1</th>
                <th className={style.tableHeaders}>Workout 2</th>
                <th className={style.tableHeaders}>Workout 3</th>
                <th className={style.tableHeaders}>Workout 4</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.standing ? (participant.standing) 
                  : (<p>null</p>)
                  }
                  </td>
                  <td>{participant.first_name + " " + participant.last_name}</td>
                  <td>
                    {participant.workouts[0] ? (
                      <>{participant.workouts[0].time_secs + " : " + participant.workouts[0].time_secs + " (" + participant.workouts[0].rank + ") "}</>) 
                      : (<WorkoutsModal participant_id={participant.id} />)
                    }
                  </td>
                  <td>
                    {participant.workouts[1] ? 
                      (<>{participant.workouts[1].time_secs + " : " + participant.workouts[1].time_secs + " (" + participant.workouts[1].rank + ") "}</>) 
                    : 
                      (<WorkoutsModal participant_id={participant.id} />)
                    }
                  </td>
                  <td>
                    {participant.workouts[2] ? (
                      <>{participant.workouts[2].time_secs + " : " + participant.workouts[2].time_secs + " (" + participant.workouts[2].rank + ") "}</>) 
                      : (<WorkoutsModal participant_id={participant.id} />)
                    }
                  </td>
                  <td>
                    {participant.workouts[3] ? (
                      <>{participant.workouts[3].time_secs + " : " + participant.workouts[3].time_secs + " (" + participant.workouts[3].rank + ") "}</>) 
                      : (<WorkoutsModal participant_id={participant.id} />)
                    }
                  </td>
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
