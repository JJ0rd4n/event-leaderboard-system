import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../../server/supabaseClient'
import ParticipantLine from '../participants/ParticipantLine'

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
            .from('event')
            .select()
            .eq('id', id)
            .single()
    
        if (error) {
            navigate('/', { replace: true })
            console.log(error.message, error.hint)
        }
        if (data) {
            setEventName(data.event_name)
        }
    }
    
    async function fetchParticipants() {
        const { data, error } = await supabase
            .from("participants")
            .select()
            .eq('event_id', id)
            
            
        if(error){
            setFetchError(error)
            setParticipants([])
            console.log(error.message, error.hint)
        }
        if(data){
            setParticipants(data);
            setFetchError(null)
        }
    }

    return (
        <div>
            {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
            <h2>Showing Leaderboard of Event: {eventName}</h2>
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <span>Name</span>
                    <span className='hidden md:grid'>Workouts</span>
                    <span className='hidden sm:grid'>Method</span>
                </div>
                <ul>
                    {participants.map((participant) => (
                        <ParticipantLine key={participant.id} participant={participant} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default EventView