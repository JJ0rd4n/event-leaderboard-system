import { useEffect, useState } from "react";
import supabaseClient from "../server/supabaseClient";
import NewEventsModal from "../components/modals/AddEventsModal";
import EventCard from "../components/events/EventCard"

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [fetchError, setFetchError] = useState(null);
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    async function fetchEvents() {
      const { data, error } = await supabaseClient.from("events").select();
  
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

    return (
        <div>
          <NewEventsModal />
          <main>
            {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
            <ul>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </ul>
          </main>
        </div>
    )
}

export default Dashboard