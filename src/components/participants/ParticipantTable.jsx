import { Link } from "react-router-dom"
import { BsPersonFill } from 'react-icons/bs';

/* eslint-disable react/prop-types */
const ParticipantTable = ({participant}) => {

    return (
        <Link to={'/participant/' + participant.id}>
            <div className='flex items-center p-1 hover:bg-gray-300 hover:rounded-lg'>
                <div className='bg-gray-200 p-3 rounded-lg'>
                    <BsPersonFill className='text-gray-800' />
                </div>
                <p className='pl-4'>{participant.first_name + ' ' + participant.last_name}</p>
            </div>
        </Link>
    )
}

export default ParticipantTable