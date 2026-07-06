import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/Task";
import { useNavigate } from "react-router-dom";

function DashboardPage() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState("");
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

const pendingTasks = totalTasks - completedTasks;
    const loadTasks = async () => {
        try {
            const data = await getTasks();
            console.log("Tareas recibidas:", data);
            setTasks(data);
        } catch (error) {
            console.error("Error cargando tareas:", error);
        }
    };

    const handleAddTask = async () => {
   if (!text.trim()) {
        alert("Ingrese una tarea");
        return;
    }

    try {
        await createTask(text);
        setText("");
        loadTasks();
    } catch (error) {
        console.error(error);
    }
};

const handleToggleTask = async (task: Task) => {
    try {
        await updateTask(task.id, {
            completed: !task.completed
        });

        loadTasks();
    } catch (error) {
        console.error(error);
    }
};

const handleDeleteTask = async (id: number) => {
    if (!confirm("¿Eliminar esta tarea?")) {
        return;
    }
    try {
        await deleteTask(id);
        loadTasks();
    } catch (error) {
        console.error(error);
    }
};

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
};
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/");
        return;
    }
    loadTasks();
}, []);

return (
    <div className="container py-5">
        <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
                <h3 className="mb-0 fw-bold"><i className="bi bi-check2-square me-2"></i>Task Manager</h3>
                <div className="d-flex align-items-center">
                    <span className="me-3 fw-semibold">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.nombre}
                    </span>
                    <button className="btn btn-light btn-sm" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Salir
                    </button>
                </div>
            </div>
            <div className="card-body">
                <h4 className="mb-4">Bienvenido {user.nombre}</h4>
                <div className="row mb-4">
                    <div className="col-md-10">
                        <input type="text" className="form-control"  placeholder="Escriba una nueva tarea..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddTask();
                            }
                        }} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success w-100 fw-bold" onClick={handleAddTask} disabled={!text.trim()} >
                            <i className="bi bi-plus-circle me-2"></i>
                            Agregar
                        </button>
                    </div>
                </div>
            <div className="row mb-4">

            <div className="col-md-4">
                <div className="card bg-primary-subtle border-primary shadow-sm text-center">
                    <div className="card-body">
                        <i className="bi bi-list-check display-5 text-primary"></i>
                        <h5 className="mt-2">Total</h5>
                        <h2>{totalTasks}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card bg-primary-subtle border-primary shadow-sm text-center">
                    <div className="card-body">
                        <i className="bi bi-hourglass-split display-5 text-warning"></i>
                        <h5 className="mt-2">Pendientes</h5>
                        <h2>{pendingTasks}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card bg-primary-subtle border-primary shadow-sm text-center">
                    <div className="card-body">
                        <i className="bi bi-check-circle display-5 text-success"></i>
                        <h5 className="mt-2">Completadas</h5>
                        <h2>{completedTasks}</h2>
                    </div>
                </div>
            </div>
        </div>
    {
    tasks.length === 0 ? (
        <div className="alert alert-warning">
            No existen tareas.
        </div>
    ) : (
        <ul className="list-group shadow-sm">
            {tasks.map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center"   style={{transition: "0.2s"}}>
                    <span
                        style={{cursor: "pointer",
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "#6c757d" : "#212529",
                            fontWeight: task.completed ? "normal" : "500"
                        }}
                        onClick={() => handleToggleTask(task)}>
                        {task.completed ? "✅" : "⬜"} {task.text}
                    </span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTask(task.id)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </li>
            ))}
        </ul>
    )
    }

    </div>

</div>

</div>

);

}

export default DashboardPage;