import React from "react";
import { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";
import ListItem from "./components/ListItem";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get('/repositories')
      .then(response => setRepositories([...repositories, ...response.data]));
  }, []);
  
  async function handleAddRepository() {
    const addObj = {
      title: "This repo was added with the add button",
      url: "https://github.com/babel/babel/issues/5085",
      techs: ["OneTech", "TwoTech"]
    };

    const response = await api.post('/repositories', addObj);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status == 204) {
      const deletedIndex = repositories.findIndex(repo => repo.id === id)
      const newRepos = [...repositories];
      newRepos.splice(deletedIndex, 1);
      setRepositories(newRepos);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => <ListItem key={item.id} title={item.title} btnFunc={handleRemoveRepository} id={item.id}/>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
