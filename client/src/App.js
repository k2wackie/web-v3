import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import New from "./pages/New";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bulletin from "./pages/Bulletin";
import Auth from "./hoc/Auth";

export const BulletinStateContext = React.createContext();
export const BulletinDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET": {
      return action.data;
    }
    case "CREATE": {
      fetch(
        action.data.isEdit ? "/api/bulletin/update" : "/api/bulletin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.data),
        }
      );
      return [];
    }
    case "DELETE": {
      fetch("/api/bulletin/delete/" + action.data, {
        method: "DELETE",
      }).catch((err) => console.log(err));
      return [];
    }
    default:
      return [];
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  //GET DATA
  useEffect(() => {
    fetch("/api/bulletin/read")
      .then((res) => res.json())
      .then((newData) => {
        dispatch({ type: "GET", data: newData });
      })
      .catch((err) => console.log(err));
  }, [data.length]);

  // CREATE || EDIT
  const onCreateEdit = (author, content, id, isEdit) => {
    const req = {
      id: id,
      author: author,
      content: content,
      isEdit: isEdit,
    };
    dispatch({ type: "CREATE", data: req });
  };

  //DELETE
  const onRemove = (id) => {
    dispatch({ type: "DELETE", data: id });
  };

  const AuthHomePage = Auth(Home, null);
  const AuthBulletinPage = Auth(Bulletin, false);
  const AuthNewPage = Auth(New, null);

  return (
    <BulletinStateContext.Provider value={data}>
      <BulletinDispatchContext.Provider value={{ onCreateEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<AuthHomePage />} />
              <Route path="/bulletin" element={<AuthBulletinPage />} />
              <Route path="/new" element={<AuthNewPage />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/bulletin/edit/:id" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BulletinDispatchContext.Provider>
    </BulletinStateContext.Provider>
  );
}

export default App;
