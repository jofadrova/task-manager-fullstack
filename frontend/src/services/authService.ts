import api from "./api";

export const login = async (
    username: string,
    password: string
) => {

    const response = await api.post("/login", {
        username,
        password
    });

    return response.data;
};

export const register = async (
    nombre: string,
    username: string,
    password: string
) => {
    const response = await api.post("/register", {
        nombre,
        username,
        password
    });
    return response.data;
};