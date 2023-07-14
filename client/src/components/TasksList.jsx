import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api";
import TaskCard from "./TaskCard";

export default function TasksList() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks()
            setTasks(res.data)
        }
        loadTasks()
    }, [])

    if (tasks.length === 0) {
        return (
            <div className="text-center">
                <h1 className="text-4xl my-8">You don't have any tasks!</h1>
                <h1 className="text-3xl my-8">Click on the "Create Task" button to create a new task.</h1>
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-3 gap-3">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        )
    }
}