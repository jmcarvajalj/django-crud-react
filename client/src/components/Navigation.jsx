import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="flex justify-between py-8">
            <Link to="/tasks">
                <h1 className="font-bold text-3xl mb-4">Tasks App</h1>
            </Link>
            <Link to="/tasks-create">
                <button className="bg-emerald-700 hover:bg-emerald-600  hover:cursor-pointer px-3 py-2 rounded-lg">
                    Create Task
                </button>
            </Link>
        </div>
    )
}
