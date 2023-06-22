import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const Card = ({event}) => {
    return (
        <div className="px-6">
            <div className="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <Link to={'/event/' + event.id}>
                    <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h3  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.event_name}</h3>
                        <div className="font-normal ext-gray-700 dark:text-gray-400">Date: {event.event_date}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card