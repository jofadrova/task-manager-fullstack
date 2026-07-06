import api from "./api";

export const getTasks = async () => {
   
    const token = localStorage.getItem("token");
    const response = await api.get("/tasks", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const createTask = async (text: string) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
        "/tasks",
        { text },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const updateTask = async (
    id: number,
    data: any) => {
    const token = localStorage.getItem("token");
    const response = await api.put(
        `/tasks/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export const deleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};