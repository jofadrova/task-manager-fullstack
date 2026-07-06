import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function RegisterPage() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!nombre.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            await register(
                nombre,
                username,
                password
            );

            alert("Usuario registrado correctamente");
            navigate("/");
        } catch (error: any) {
            alert(
                error.response?.data?.message ||
                "No se pudo registrar el usuario"
            );
        }
    };
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }} >
                <div className="text-center mb-4">
                    <i className="bi bi-person-plus display-1 text-success"></i>
                    <h2 className="fw-bold mt-3">Crear cuenta</h2>
                    <p className="text-muted">Registra un nuevo usuario</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input className="form-control" placeholder="Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input className="form-control" placeholder="Ingrese un usuario" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Ingrese una contraseña" value={password} onChange={(e) => setPassword(e.target. value)} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" placeholder="Repita la contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleRegister();
                            }
                        }} />
                </div>
                <button  className="btn btn-success w-100 fw-bold"  onClick={handleRegister} disabled={ 
                        !nombre.trim() ||
                        !username.trim() ||
                        !password.trim() ||
                        !confirmPassword.trim()
                    } >
                    <i className="bi bi-person-check me-2"></i>
                    Registrarse
                </button>
                <hr />
                <p className="text-center mb-3">
                    ¿Ya tienes una cuenta?
                </p>
                <Link to="/" className="btn btn-outline-primary w-100" >
                    Iniciar sesión
                </Link>
            </div>
        </div>
    );
}
export default RegisterPage;