import React, { useState } from "react";
import api from "../../services/api";

import Logo from "../../assets/logo.svg";

import "./index.css";

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/dev", {
        username
      });

      history.push(`/dev/${data._id}`);
    } catch (error) {
      setError("Usuário não encontrado!");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="Tindev, o tinder dos desenvolvedores" />
        <input
          value={username}
          placeholder="Informe seu usuário no github"
          onChange={e => setUsername(e.target.value)}
        />
        {error && <em>{error}</em>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
