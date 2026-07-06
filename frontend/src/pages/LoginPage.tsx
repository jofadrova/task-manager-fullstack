import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
        alert("Debe ingresar usuario y contraseña");
        return;
    }

    try {
        const response = await login(username, password);
        console.log(response);
         localStorage.setItem(
            "token",
            response.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        navigate("/dashboard");
    } catch (error:any) {
        alert(error.response?.data?.message || "Error al iniciar sesión"
    );

    }

};

    return (

        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-check2-square display-1 text-primary"></i>
                    <h2 className="fw-bold mt-3">Task Manager</h2>
                    <p className="text-muted">
                        Organiza tus tareas fácilmente
                    </p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" placeholder="Ingrese su usuario" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button  className="btn btn-primary w-100" onClick={handleLogin}>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Ingresar
                </button>
                <hr />
                <p className="text-center mb-3">
                    ¿No tienes una cuenta?
                </p>
                <Link to="/register" className="btn btn-outline-secondary w-100" >
                    Registrarse
                </Link>
            </div>
        </div>
    );
}
export default LoginPage;         