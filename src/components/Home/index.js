import './home.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Load from '../Load'
import api from '../../service/api';

export default function Home(){

    const [pokemonName, setPokemonName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [infos, setInfos] = useState([]);
    const [qtdPokes, setQtdPokes] = useState(21);

    async function loadPokemons(){
        setIsProcessing(true);
        const pokemons = await api.get(`?offset=0&limit=${qtdPokes}`);
        setPokemonName(pokemons.data.results);
        setIsProcessing(false);
      }

      async function dataPokemons(){
        setIsProcessing(true);
        const infosPokes = [];
        for(let i = 0;  i < pokemonName.length; i++){
        
            infosPokes[i] = await api.get(pokemonName[i].name)
            .then((res)=>{
               return res.data
            });

        }        
        setInfos(infosPokes);
        setIsProcessing(false);

    }


    useEffect(loadPokemons, [qtdPokes]);
    useEffect(dataPokemons,[pokemonName, qtdPokes]);


    function loadPokes(){
        let quantidade = qtdPokes + 21;
        setQtdPokes(quantidade);
    }

     if(loading){
        return(
            <Load />
        )
     }

     else{
        return(
        <div className="container-geral">
            <div className="container-pokes">
                {infos.map((item, key)=>{

                    return(
                <div className="cards" key={key}>
                    <Link to={`/pokemon/${item.id}`} name={item.name} >
                        <div >
                            <div id={item.id} href={item.id}>
                               <img className="pokesImg" alt={item.name} src={item.sprites.other.dream_world.front_default}/>
                               <p>Nº00{item.id}</p>
                               <h1>{item.name}</h1>
                               <h4>Types: {item.types.length > 1 ? 
                               <><span>{item.types[0].type.name}</span>
                               <span> {item.types[1].type.name}</span></>
                               :<span>{item.types[0].type.name}</span>}</h4>
                            </div>
                        </div>
                    </Link>
                </div>)
                })}
            </div>
            {isProcessing ? <Button variant="info" onClick={()=> loadPokes()}>Carregando...</Button> : 
            <Button variant="info" onClick={()=> loadPokes()}>Carregar mais pokemons</Button>}
        </div>
        )
     }
}