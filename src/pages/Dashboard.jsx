import { useEffect, useState } from "react";
import supabaseClient from "../server/supabaseClient";
import NewEventsModal from "../components/modals/AddEventsModal";
import EventCard from "../components/events/EventCard"
import AddParticipantsModal from "../components/modals/AddParticipantsModal";
import ParticipantTable from "../components/participants/ParticipantTable";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [fetchError, setFetchError] = useState(null);
  
    useEffect(() => {
      fetchEvents();
      fetchParticipants();
    }, []);
  
    async function fetchEvents() {
      const { data, error } = await supabaseClient.from("event").select();
  
      if(error){
        setFetchError(error)
        setEvents([])
        console.log(error.message)
      }
      if(data){
        setEvents(data);
        setFetchError(null)
      }
    }

    async function fetchParticipants() {
      const { data, error } = await supabaseClient.from("participant").select();
  
      if(error){
        setFetchError(error)
        setParticipants([])
        console.log(error.message)
      }
      if(data){
        setParticipants(data);
        setFetchError(null)
      }
    }

    return (
        <div>
          <div>
            <NewEventsModal />
            <AddParticipantsModal />
          </div>
          <main className="flex">
            {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
            <div className="container my-12 mx-auto px-4 md:px-12">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <ul>
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="container my-12 mx-auto px-4 md:px-12">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <ul>
                      {participants.map((participant) => (
                        <ParticipantTable key={participant.id} participant={participant} />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
    )
}

export default Dashboard