const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 3000;

const prisma = new PrismaClient();
const SECRET_KEY = "taskmanager_secret";

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
    res.send("🚀 Task Manager API");
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

app.post("/register", async (req: any, res: any) => {

    try {

        const { nombre, username, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "El nombre de usuario ya existe"
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                nombre,
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "Usuario registrado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error del servidor"
        });

    }

});

app.post("/login", async (req: any, res: any) => {

    try {

        const { username, password } = req.body;

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        // Comparar contraseña
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        // Crear token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }

        );

        res.json({
            message: "Login correcto",
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                username: user.username
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error del servidor"
        });

    }

});

app.get("/profile", (req: any, res: any) => {

    // Leer el encabezado Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "No se envió el token"
        });

    }

    // Obtener solo el token
    const token = authHeader.split(" ")[1];

    try {

        // Verificar el token
        const decoded = jwt.verify(token, SECRET_KEY);

        res.json({
            message: "Perfil del usuario",
            user: decoded
        });

    } catch (error) {

        res.status(401).json({
            message: "Token inválido"
        });

    }

});

app.post("/tasks", async (req: any, res: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "No se envió el token"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(token, SECRET_KEY);

        const { text } = req.body;

        const task = await prisma.task.create({

            data: {

                text,

                userId: decoded.id

            }

        });

        res.status(201).json({

            message: "Tarea creada correctamente",

            task

        });

    } catch (error) {

        res.status(401).json({

            message: "Token inválido"

        });

    }

});

app.get("/tasks", async (req: any, res: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            message: "No se envió el token"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(token, SECRET_KEY);

        const tasks = await prisma.task.findMany({

            where: {
                userId: decoded.id
            },

            orderBy: {
                createdAt: "desc"
            }

        });

        res.json(tasks);

    } catch (error) {

        res.status(401).json({
            message: "Token inválido"
        });

    }

});

app.put("/tasks/:id", async (req: any, res: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No se envió el token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(token, SECRET_KEY);

        const id = Number(req.params.id);

        const { text, completed } = req.body;

        // Buscar la tarea del usuario autenticado
        const task = await prisma.task.findFirst({

            where: {
                id: id,
                userId: decoded.id
            }

        });

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        const updatedTask = await prisma.task.update({

            where: {
                id
            },

            data: {

                text: text ?? task.text,

                completed: completed ?? task.completed

            }

        });

        res.json({
            message: "Tarea actualizada correctamente",
            task: updatedTask
        });

    } catch (error) {

        res.status(401).json({
            message: "Token inválido"
        });

    }

});

app.delete("/tasks/:id", async (req: any, res: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No se envió el token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(token, SECRET_KEY);

        const id = Number(req.params.id);

        // Buscar la tarea del usuario autenticado
        const task = await prisma.task.findFirst({

            where: {
                id: id,
                userId: decoded.id
            }

        });

        if (!task) {

            return res.status(404).json({
                message: "Tarea no encontrada"
            });

        }

        await prisma.task.delete({

            where: {
                id: id
            }

        });

        res.json({
            message: "Tarea eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(401).json({
            message: "Token inválido"
        });

    }

});