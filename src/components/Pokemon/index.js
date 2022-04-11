
import './pokemon.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../service/api'
import Load from '../Load'

export default function Pokemon(){
    const { id } = useParams();
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    
    useEffect(()=>{

        async function loadPoke(){

            const poke = await api.get(`/${id}`)
            .then(res => {
                return res.data
            })
            .catch(()=>{
                history('/error')
            })

            setPokemon(poke)
            setLoading(false)
        }

        loadPoke()
    }, []) 

 
    if(loading){
        return(
            <Load />
        )
    }
    else{
        return(
        <div className="container-pokemons">
                <div><h1>{pokemon.name} - Nº 00{pokemon.id}</h1></div>

            <div className="container-infos">

                <div className="pokemonFront">
                    <img src={pokemon.sprites.other.dream_world.front_default}/>
                </div>

                <div className="pokeStatus">

                    <div className="pokeDetails">
                        <h3>Height:
                        <p>{pokemon.height}.0 M</p>

                        </h3>

                        <h3>Weight:
                        <p>{pokemon.weight}.0 KG</p>
                        </h3>
                    </div>

                    <div className="pokeDetails">
                    <h3>Abilities:</h3>
                        <div>  {pokemon.abilities.length > 1 ? 
                               <><p>{pokemon.abilities[0].ability.name}</p>
                               <p> {pokemon.abilities[1].ability.name}</p></>
                               :<p>{pokemon.abilities[0].ability.name}</p>}
                        </div>
                    </div>

                    <div className="pokeDetails">
                    <h3>Types:</h3>
                        <div>
                                {pokemon.types.length > 1 ? 
                               <><p>{pokemon.types[0].type.name}</p>
                               <p> {pokemon.types[1].type.name}</p></>
                               :<p>{pokemon.types[0].type.name}</p>}
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
            )
    }
}