import React, { useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import baseAxios from "./api/baseAxios";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "./utils/toast";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [data, setData] = useState<any[]>([]);
  const [formCreate, setFormCreate] = useState({
    content: "",
  });
  const handleGetData = async () => {
    const result = await baseAxios.get(`/`);
    setData(result.data);
  };
  handleGetData();
  const handleDelete = async (id: number) => {
    await baseAxios.delete(`/delete/${id}`);
    toastSuccess("Đã xóa công việc thành công !");
    handleGetData();
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      if (formCreate.content.length > 0) {
        await baseAxios.post("/", formCreate);
        setFormCreate({
          content: "",
        });
        handleGetData();
        toastSuccess("Tạo công việc mới thành công !");
      } else {
        toastError("Vui lòng điền đầy đủ thông tin");
      }
    } catch (error) {
      console.log(error);
      toastError("Lỗi");
    }
  };
  const handleChangeFormCreate = (e: any) => {
    const { name, value } = e.target;
    setFormCreate({
      ...formCreate,
      [name]: value,
    });
  };

  return (
    <div>
      <ToastContainer />
      <header className="header">
        <h1>Note App</h1>
      </header>
      <div className="todo_list_body">
        <form className="add_todo_box" onSubmit={handleSubmitForm}>
          <h2>Title</h2>
          <input
            onChange={handleChangeFormCreate}
            type="text"
            value={formCreate.content}
            name="content"
            placeholder="Take a note..."
            autoFocus
          />
          <button className="button_add" type="submit">
            +
          </button>
        </form>
        <div className="todo_tiny_box">
          <ul className="todo_list_detail">
            {data.map((item: any) => (
              <li className="todo_detail_box" key={item.id}>
                <h3>{item.content}</h3>
                <button
                  className="button_delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
