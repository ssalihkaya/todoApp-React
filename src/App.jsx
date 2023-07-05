import { useState } from "react";
import React from "react";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";
import { useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    //Yapılacaklar listesi
    const createTask = async (title) => {
        const response = await axios.post("http://localhost:3000/tasks", {
            title,
            isCheck: false,
            checkCss: {
                opacity: "1",
                textDecoration: "none",
                transition: "0.5s",
                transform: "",
            },
        });

        const createdTask = [...tasks, response.data];
        setTasks(createdTask);
    };

    //Sayfa açıldığında kayıtlı görevleri serverdan çekme

    const fetchTasks = async () => {
        const response = await axios.get("http://localhost:3000/tasks");
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //Silme tuşuna basıldığında id'ye göre görev silme

    const deleteTaskById = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        const deleteCss = tasks.map((task, index) => {
            if (task.id == id) {
                task.checkCss = {
                    opacity: "1",
                    textDecoration: "none",
                    transition: "0.5s",
                    transform: "scale(0)",
                };
            }
            return task;
        });
        setTasks(deleteCss);

        setTimeout(() => {
            const afterDeletingTasks = tasks.filter((task) => {
                return task.id !== id;
            });

            setTasks(afterDeletingTasks);
        }, 500);
    };

    const updateTitle = async (id, task) => {
        const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
            title: task.title,
            isCheck: task.isCheck,
            checkCss: {
                opacity: task.checkCss.opacity,
                textDecoration: task.checkCss.textDecoration,
                transition: task.checkCss.transition,
                transform: "",
            },
        });
    };

    //Tamamlandı butonuna basıldığında id'ye göre işaretleme
    const checkTaskById = async (id) => {
        const afterCheckById = tasks.map((task) => {
            if (task.id == id) {
                if (task.isCheck == true) {
                    task.isCheck = false;
                    task.checkCss = {
                        opacity: "1",
                        textDecoration: "none",
                        transition: "0.5s",
                    };
                } else {
                    task.isCheck = true;
                    task.checkCss = {
                        opacity: "0.5",
                        textDecoration: "line-through",
                        transition: "0.5s",
                    };
                }
                updateTitle(id, task);
            }

            return task;
        });

        setTasks(afterCheckById);
    };

    const editTaskById = async (task, editTitle) => {
        const response = await axios.put(
            `http://localhost:3000/tasks/${task.id}`,
            {
                title: editTitle,
                isCheck: task.isCheck,
                checkCss: {
                    opacity: task.checkCss.opacity,
                    textDecoration: task.checkCss.textDecoration,
                    transition: task.checkCss.transition,
                    transform: "",
                },
            }
        );
    };

    return (
        <>
            <TaskCreate onCreate={createTask} />
            <TaskList
                tasks={tasks}
                onDelete={deleteTaskById}
                onCheck={checkTaskById}
                onEdit={editTaskById}
            />
        </>
    );
}

export default App;
