import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../../server/supabaseClient'

const EventView = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [eventName, setEventName] = useState("");
    const [participants, setParticipants] = useState([])
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        fetchEvent();
        fetchParticipants();
    }, []);
    
    async function fetchEvent() {
        const { data, error } = await supabase
            .from('events')
            .select()
            .eq('id', id)
            .single()
    
        if (error) {
            console.log(error.message, error.hint)
            navigate('/', { replace: true })
        }
        if (data) {
            console.log(eventName)
            setEventName(data.eventName)
        }
        
    }
    
    async function fetchParticipants() {
        const { data, error } = await supabase
            .from("events")
            .select("*, participants(*)")
            
            
        if(error){
            setFetchError(error)
            setParticipants([])
            console.log(error.message)
        }
        if(data){
            setParticipants(data);
            setFetchError(null)
            console.log(participants)
        }
    }


    return (
        <div>
            {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
            <h2>Participants of Event: {eventName}</h2>
                <ul>

                </ul>
            
            <ul>
            </ul>
        </div>
    )
}

export default EventView