import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

export const BulletinStateContext = React.createContext();
export const BulletinDispatchContext = React.createContext();

function App() {
  const [data, setData] = useState([]);
  // const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((newData) => {
        // console.log(data, newData);
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, [data.length]);

  // CREATE || EDIT
  const onCreateEdit = (author, content, id, isEdit) => {
    const newItem = {
      author,
      content,
    };

    const req = {
      author: newItem.author,
      content: newItem.content,
      id: id,
    };

    fetch(isEdit ? "/edit" : "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => {
        setData([]);
      })
      .catch((err) => console.log(err));
  };

  //DELETE
  const onRemove = (id) => {
    fetch("/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        setData([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <BulletinStateContext.Provider value={data}>
      <BulletinDispatchContext.Provider value={{ onCreateEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BulletinDispatchContext.Provider>
    </BulletinStateContext.Provider>
  );
}

export default App;
