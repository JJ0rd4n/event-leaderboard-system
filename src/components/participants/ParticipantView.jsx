import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../../server/supabaseClient'

const ParticipantView = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        fetchParticipant()
    }, []);
    
    async function fetchParticipant() {
        const { data, error } = await supabase
            .from('participant')
            .select()
            .eq('id', id)
            .single()
    
        if (error) {
            setFetchError(error)
            navigate('/', { replace: true })
            console.log(error.message, error.hint)
        }
        if (data) {
            setFetchError(null)
            setFirstName(data.first_name)
            setLastName(data.last_name)
        }
    }

    return (
        <div>
            {fetchError && (<p>{fetchError.message} : {fetchError.hint}</p>)}
            <h2>Showing Participant: {firstName + " " + lastName}</h2>
        </div>
    )
}

export default ParticipantView