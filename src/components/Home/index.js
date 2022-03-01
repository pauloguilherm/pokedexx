import { useEffect, useState } from 'react';
import api from '../../service/api'


export default function Home(){

    const [pokemons, setPokemons] = useState([])

    useEffect(() =>{

      async function loadPokemons(){

        const response = await api.get('bulbasaur');

        setPokemons(response.data)
        console.log(pokemons)
      }

       loadPokemons();
    }, [])

    return(
        <div className="home">
        </div>
    )
}