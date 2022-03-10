import './home.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Load from '../Load'
import api from '../../service/api';
import pokeBolaAberta from './assets/imagens/pokebolaAberta.png'
import pokeBolaFechada from  './assets/imagens/pokebolaFechada.jpg'



export default function Home(){

    const [pokemonName, setPokemonName] = useState([])
    const [loading, setLoading] = useState(true)
    const [infos, setInfos] = useState([])
    const [qtdPokes, setQtdPokes] = useState(21)
    var Catch = []
    var Catchs = JSON.parse(localStorage.getItem('pokemons'))
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

            let scroll
            if(infosPokes[infosPokes.length - 1].id > 21){
                scroll = infosPokes[infosPokes.length - 1].id - 21
                window.location.href=`#${scroll}`
            }
            
                setLoading(false) 
        }
        dataPokemons();
        
       
    },[pokemonName, qtdPokes])


    function loadPokes(){
        let quantidade = qtdPokes + 21;
        setQtdPokes(quantidade)
    }

    function catchPoke(e){
        if(e.target.src.slice(-39) == 'pokebolaAberta.8f7a0a9a7936bcfa9603.png'){
            e.target.src = pokeBolaFechada
            Catch.push(e.target.alt)
            localStorage.setItem('pokemons', JSON.stringify(Catch))
        }
        else{
            e.target.src = pokeBolaAberta
            const Capturados = Catch.filter(poke => poke !== e.target.alt)
            Catch = Capturados
            localStorage.setItem('pokemons', JSON.stringify(Capturados))
        }
        
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
                               <img className="pokesImg" src={item.sprites.other.dream_world.front_default}/>
                               <p>Nº00{item.id}</p>
                               <h1>{item.name}</h1>
                               <h4>Types: {item.types.length > 1 ? 
                               <><span>{item.types[0].type.name}</span>
                               <span> {item.types[1].type.name}</span></>
                               :<span>{item.types[0].type.name}</span>}</h4>
                            </div>
                        </div>
                    </Link>
                    {Catchs.includes(item.name) ? <img onClick={catchPoke} src={pokeBolaFechada} className="pokebola" alt={item.name}/>
                    : <img onClick={catchPoke} src={pokeBolaAberta} alt={item.name} className="pokebola"/>}
                </div>)
                })}
            </div>
            <Button variant="info" onClick={()=> loadPokes()}>Carregar mais pokemons</Button>{' '}
        </div>
        )
     }
}