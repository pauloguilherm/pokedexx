import './home.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from '../../service/api';



export default function Home(){

    const [pokemonName, setPokemonName] = useState([])
    const [loading, setLoading] = useState(true)
    const [infos, setInfos] = useState([])
    const [qtdPokes, setQtdPokes] = useState(21)
    const infosPokes = []


    useEffect(()=>{

        async function loadPokemons(){

            const pokemons = await api.get(`?offset=0&limit=${qtdPokes}`)
            setPokemonName(pokemons.data.results) 
            setLoading(false)
          }
        

       loadPokemons();
       
    }, [qtdPokes])

    useEffect(()=>{
        async function dataPokemons(){
            setLoading(true)
            for(let i = 0;  i < pokemonName.length; i++){
                
                infosPokes[i] = await api.get(pokemonName[i].name)
                .then((res)=>{
                   return res.data
                })
                
            }        
            setInfos(infosPokes) 
            setLoading(false)  
        }

        dataPokemons()
    },[pokemonName, qtdPokes])


    function loadPokes(){
        let quantidade = qtdPokes + 21;
        setQtdPokes(quantidade)
    }
     if(loading){
        return(
            <h1>Carregando...</h1> 
        )
     }

     else{
        
        return(
        <div className="container-geral">
            <div className="container-pokes">
                {infos.map((item, key)=>{

                    return(<Link to={`/pokemon/${item.id}`} name={item.name}  key={key}>
                        <div >
                            <div className="cards">
                               <img className="pokesImg" src={item.sprites.other.dream_world.front_default}/>
                               <p>Nº00{item.id}</p>
                               <h1>{item.name}</h1>
                               <h4>Types: {item.types.length > 1 ? 
                               <><span>{item.types[0].type.name}</span>
                               <span> {item.types[1].type.name}</span></>
                               :<span>{item.types[0].type.name}</span>}</h4>
                            </div>
                        </div>
                        </Link>)
                })}
            </div>
            <Button variant="info" onClick={()=> loadPokes()}>Carregar mais pokemons</Button>{' '}
        </div>
        )
     }
}