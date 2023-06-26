import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-gray-dark flex justify-between items-center px-8 text-gray-light text-gray-200 bg-gray-800">
            <Link to="/" className="text-2xl">Leaderboard Basic</Link>
        </div>
    )
}

export default Navbar