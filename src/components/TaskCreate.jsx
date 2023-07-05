import { useState } from "react";

function TaskCreate({ onCreate }) {
    const [title, setTitle] = useState("");

    const handleChance = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(title);
        setTitle("");
    };
    //Form input bölümü
    return (
        <div className="container">
            <h1 className="text-center fw-semibold pt-5">To Do</h1>
            <form id="todoInputForm" action="#" method="GET">
                <div className="input-group form-outline shadow ">
                    <input
                        id="todoInput"
                        value={title}
                        onChange={handleChance}
                        className="form-control form-control-lg "
                        type="text"
                        placeholder="Yapılacakları yazınız"
                    />
                    {/* <label class="form-label" for="todoInput">
                        Yapılacakları yazınız
                    </label> */}
                    <button onClick={handleSubmit} className="rounded-end btn ">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskCreate;
