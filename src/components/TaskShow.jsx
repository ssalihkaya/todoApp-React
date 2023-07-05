import { useState } from "react";
import axios from "axios";

function TaskShow({ task, onDelete, onCheck, onEdit }) {
    const [showEdit, setShowEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    //Görev silme işlemi için silme butonu tıklanan görevin id'sini App.jsx'e gönderme
    const handleDeleteClick = () => {
        onDelete(task.id);
    };

    //Görev tamamlanma işlemi için check butonu tıklanan görevin id'sini App.jsx'e gönderme
    const handleCheckClick = () => {
        onCheck(task.id);
    };

    const handleChance = (event) => {
        setEditTitle(event.target.value);
    };

    //Edit Butonuna basıldığında true/false gönderme
    const handleEditClick = (event) => {
        event.preventDefault();
        setShowEdit(!showEdit);
        task.title = editTitle;
        onEdit(task, editTitle);
    };

    //Görev listesi şablonu
    return (
        <>
            {showEdit ? (
                <div className="container">
                    <ul className="p-0">
                        <form onSubmit={handleEditClick}>
                            <div className="editDiv input-group rounded-2">
                                <li
                                    className="editTask d-flex my-1 rounded-2"
                                    style={task.checkCss}
                                >
                                    <input
                                        className="editForm form-control form-control-sm"
                                        defaultValue={task.title}
                                        onChange={handleChance}
                                    />
                                    <button className="btnEdit btn-outline rounded-end">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                </li>
                            </div>
                        </form>
                    </ul>
                </div>
            ) : (
                <div className="container">
                    <ul className="p-0">
                        <li
                            className="gorev align-items-center bg-white d-flex my-3 ps-2 rounded-2"
                            style={task.checkCss}
                        >
                            {task.title}
                            <button
                                onClick={handleCheckClick}
                                className="btnCmplt btn-outline ms-auto"
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button
                                onClick={handleEditClick}
                                className="btnEdit btn-outline"
                            >
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="btnDlt rounded-end btn-outline"
                            >
                                {/* <i className="far fas fa-trash-alt"></i> */}
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default TaskShow;
