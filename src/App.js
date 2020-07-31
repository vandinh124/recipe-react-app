import React, {useEffect, useState} from 'react';
import Recipe from "./recipe";
import './App.css';

const App = () => {
  const APP_ID = '7e7f9092';
  const APP_KEY = '679eab1dad5db45a50b380fe27dcedf7';

  const [search, setSearch] = useState("")
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("chicken")

  useEffect(() =>{
    getRecipes()
  },[query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }
  return (
    <div className="App">
      <h1 className="name">Recipe World</h1>
      <form onSubmit={getSearch} className="search-form" >
        <input className="search-bar" type = "text" value={search} onChange={updateSearch}/>
        <button className="search-button" type = "submit" >
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
