import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header.js';

const App = () => {
    const[pokemon, setPokemon] = useState("pikachu");
    const[pokemonData, setPokemonData] = useState([]);
    const[pokemonType, setPokemonType] = useState("");

    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase())
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        getPokemon();
    };

    const getPokemon = async () => {
        const toArray = [];

        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            const res = await axios.get(url)
            toArray.push(res.data);
            setPokemonType(res.data.types[0].type.name);
            setPokemonData(toArray);
            console.log(res)
        } catch(e)
        { console.log(e)
        }    
    };

    return (
        <div className = "App">
            <Header/>
            
            <form onSubmit ={handleSubmit}> 
                 <label>
                <input 
                type = "text" 
                onChange = {handleChange} 
                placeholder = "Enter Pokemon Name"
                />
                </label>
            </form>
            {pokemonData.map((data) => {
                return(
                    <div className = "container">
                        <img src = {data.sprites["front_default"]} /> 
                        <div className = "divTable">
                            <div className = "divTableBody">
                            <div className = "divTableRow">
                            <div className = "divTableCell">Type</div> 
                            <div className = "divTableCell">{pokemonType}</div>
                  </div>

                  <div className = "divTableRow">
                            <div className = "divTableCell">Height</div> 
                            <div className = "divTableCell">{data.height/10}m</div>
                  </div>

                  <div className = "divTableRow">
                            <div className = "divTableCell">Weight</div> 
                            <div className = "divTableCell">{data.weight/10} kg</div>
                  </div>

                 </div>
                </div>   
                </div>      
                )
            })}
        </div>
    );
};

export default App;
