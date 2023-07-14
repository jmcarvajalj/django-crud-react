import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-hot-toast";


export default function TaskFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const styles = {
        background: "#27272A",
        color: "#FFFFFF",
        fontFamily: "Lato"
    }

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data)
            toast.success("Task updated", {
                position: "bottom-right",
                duration: 2200,
                style: styles
            })
        } else {
            await createTask(data)
            toast.success("Task created", {
                position: "bottom-right",
                duration: 2200,
                style: styles
            })
        }

        navigate("/tasks")
    })

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const res = await getTask(params.id)
                setValue("title", res.data.title)
                setValue("description", res.data.description)
            }
        }
        loadTask()
    }, [])

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    type="text"
                    placeholder="Task title"
                    {...register("title", { required: true })} />

                {errors.title && <span className="py-3">Task title is required</span>}

                <textarea
                    className="bg-zinc-700 p-3 rounded-lg block w-full my-3"
                    rows="10"
                    placeholder="Task description"
                    {...register("description", { required: true })}>
                </textarea>

                {errors.description && <span className="py-3">Task description is required</span>}

                <button className="bg-emerald-700 p-3 block rounded-lg w-full mt-3 hover:bg-emerald-600 hover:cursor-pointer">
                    Save Task
                </button>
            </form>

            {params.id &&
                (<button
                    className="bg-red-700 p-3 rounded-lg w-full mt-3 hover:bg-red-600 hover:cursor-pointer"
                    onClick={async () => {
                        const accepted = window.confirm("Do you want to delete this task?")
                        if (accepted) {
                            await deleteTask(params.id)
                            toast.success("Task deleted", {
                                position: "bottom-right",
                                duration: 2200,
                                style: styles
                            })
                            navigate("/tasks")
                        }
                    }}
                >
                    Delete Task
                </button>)}
        </div>
    )
}
