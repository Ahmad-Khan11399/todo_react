import React, { useState } from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import "./styles.css";
let t;
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
    const selectedDateObj = new Date(event.target.value);
    const curr = new Date();
    if (selectedDateObj > curr) {
      setStatus("Open");
    } else if (selectedDateObj < curr) {
      setStatus("Overdue");
    } else {
      setStatus("Due today");
    }
  };

  const handleAddTodo = () => {
    setTodos([...todos, { title: newTodo, description: newDescription }]);
    setNewTodo("");
    setNewDescription("");
    const d = new Date();
    t = d.toLocaleString();
  };
  const handleDeleteTodo = (key) => {
    const filteredTodos = todos.filter((todo) => todo.key !== key);
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "10%",
      render: (text) => <p>{text.slice(10, 100)}</p>
    },
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleDeleteTodo(record.key)}>Delete</Button>
      )
    }
  ];

  const dataSource = todos.map((todo, index) => {
    return {
      key: index,
      title: todo.title.slice(0, 100),
      description: todo.description.slice(0, 1000),
      time: t,
      due: date,
      status: status
    };
  });

  return (
    <div>
      <h1>Todo List</h1>
      <div className="input-container">
        <Input
          placeholder="Title"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <Input.TextArea
          placeholder="Description"
          value={newDescription}
          onChange={handleNewDescriptionChange}
        />
        <input
          type="date"
          id="date-input"
          value={date}
          onChange={handleDateChange}
        />
        <br />
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>
      <Table className="todo-table" columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default TodoList;
