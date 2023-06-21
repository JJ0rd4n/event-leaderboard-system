import { useEffect, useState } from "react";
import supabaseClient from "./server/supabaseClient";

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
    <main className="container mx-auto">
      {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
      <ul>
        {events.map((event) => (
          <li key={event.eventName}>{event.eventName}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;