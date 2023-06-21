import { useEffect, useState } from "react";
import supabaseClient from "./server/supabaseClient";
import NewEventsModal from "./components/modals/EventsModal";
import Navbar from "./components/navbar";
import EventCard from "./components/EventCard"

function App() {
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
    <>
      <Navbar />
      <NewEventsModal />
      <main>
        {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
        <ul>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
        
      </main>
    </>
  );
}

export default App;