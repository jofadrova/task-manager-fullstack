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

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3 px-4">

                <h3 className="mb-0 fw-bold">
                    <i className="bi bi-check2-square me-2"></i>
                    Task Manager
                </h3>

                <div className="d-flex align-items-center">

                    <span className="me-3 fw-semibold">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.nombre}
                    </span>

                    <button
                        className="btn btn-light btn-sm fw-semibold"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Salir
                    </button>

                </div>
            </div>


            <div className="card-body p-4">

                <div className="mb-4">
                    <h4 className="fw-bold mb-1">
                        Bienvenido, {user.nombre}
                    </h4>

                    <p className="text-muted mb-0">
                        Administra tus tareas de forma sencilla.
                    </p>
                </div>


                {/* NUEVA TAREA */}

                <div className="row g-2 mb-4">

                    <div className="col-md-10">

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Escriba una nueva tarea..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddTask();
                                }
                            }}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-success btn-lg w-100 fw-bold"
                            onClick={handleAddTask}
                            disabled={!text.trim()}
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Agregar
                        </button>

                    </div>

                </div>


                {/* ESTADÍSTICAS */}

                <div className="row g-3 mb-4">

                    <div className="col-md-4">

                        <div className="card border-0 bg-primary-subtle shadow-sm text-center h-100">

                            <div className="card-body py-4">

                                <i className="bi bi-list-check fs-1 text-primary"></i>

                                <h6 className="mt-2 text-muted">
                                    Total
                                </h6>

                                <h2 className="fw-bold mb-0">
                                    {totalTasks}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 bg-warning-subtle shadow-sm text-center h-100">

                            <div className="card-body py-4">

                                <i className="bi bi-hourglass-split fs-1 text-warning"></i>

                                <h6 className="mt-2 text-muted">
                                    Pendientes
                                </h6>

                                <h2 className="fw-bold mb-0">
                                    {pendingTasks}
                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="card border-0 bg-success-subtle shadow-sm text-center h-100">

                            <div className="card-body py-4">

                                <i className="bi bi-check-circle fs-1 text-success"></i>

                                <h6 className="mt-2 text-muted">
                                    Completadas
                                </h6>

                                <h2 className="fw-bold mb-0">
                                    {completedTasks}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>


                {/* LISTADO */}

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="fw-bold mb-0">
                        <i className="bi bi-card-checklist me-2"></i>
                        Mis tareas
                    </h5>

                    <span className="badge bg-secondary">
                        {totalTasks} tareas
                    </span>

                </div>


                {
                    tasks.length === 0 ? (

                        <div className="alert alert-warning text-center mb-0">
                            <i className="bi bi-info-circle me-2"></i>
                            No existen tareas.
                        </div>

                    ) : (

                        <ul className="list-group shadow-sm">

                            {tasks.map(task => (

                                <li
                                    key={task.id}
                                    className="list-group-item d-flex justify-content-between align-items-center py-3"
                                >

                                    <span
                                        className="flex-grow-1"
                                        style={{
                                            cursor: "pointer",
                                            textDecoration: task.completed
                                                ? "line-through"
                                                : "none",
                                            color: task.completed
                                                ? "#6c757d"
                                                : "#212529",
                                            fontWeight: task.completed
                                                ? "normal"
                                                : "500",
                                            transition: "0.2s"
                                        }}
                                        onClick={() => handleToggleTask(task)}
                                    >

                                        <i
                                            className={
                                                task.completed
                                                    ? "bi bi-check-circle-fill text-success me-2"
                                                    : "bi bi-circle text-secondary me-2"
                                            }
                                        ></i>

                                        {task.text}

                                    </span>


                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteTask(task.id)}
                                        title="Eliminar tarea"
                                    >
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