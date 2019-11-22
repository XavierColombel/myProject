import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("farid");
  const [password, setPassword] = useState("azerty");
  const handleFormSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", {
        username: username,
        password: password,
      })
      .then(response => {
        console.log(response);
      });
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button>S'enregistrer</button>
      </form>
    </>
  );
}

export default App;
