/* eslint-disable react/prop-types */
const Card = ({event}) => {
    return (
        <div className="px-6">
            <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h3  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.eventName}</h3>
                <div className="font-normal ext-gray-700 dark:text-gray-400">Date: {event.eventDate}</div>
            </div>
        </div>
    )
}

export default Card