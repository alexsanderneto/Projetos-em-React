import { useEffect, useState, useRef } from "react";

import "./Style.css";
import lixo from "../../assets/lixo.png";
import api from "../../services/api";
function Home() {
  //hooks de react
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  //Pegando dados do back-end
  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
    console.log(users);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function DeleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>{" "}
              </p>
              <p>
                idade: <span>{user.age}</span>
              </p>
              <p>
                E-mail: <span>{user.email}</span>{" "}
              </p>
            </div>
            <button onClick={() => DeleteUsers(user.id)}>
              <img className="lixo" src={lixo} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
