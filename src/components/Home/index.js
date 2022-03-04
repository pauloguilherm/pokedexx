import './home.css'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import api from '../../service/api';



export default function Home(){

    const [pokemonName, setPokemonName] = useState([])
    const [loading, setLoading] = useState(true)
    const [infos, setInfos] = useState([])
    const infosPokes = []


    useEffect(()=>{

        async function loadPokemons(){

            const pokemons = await api.get()
            setPokemonName(pokemons.data.results) 
 
          }

        async function dataPokemons(){
            for(let i = 0;  i < pokemonName.length; i++){
                
                infosPokes[i] = await api.get(pokemonName[i].name)
                .then((res)=>{
                   return res.data
                })
                
            }        
            setInfos(infosPokes)
            setInterval(()=>{
                setLoading(false)
            },1000)
            
        }
        

       loadPokemons();
       dataPokemons();

       
    }, [loading])


     if(loading){
        return(
            <h1>Carregando...</h1> 
        )
     }

     else{console.log(infos)
        
        return(
            
            <div className="container-pokes">
                {infos.map((item, key)=>{

                    return(
                        <div key={key}>
                            <div className="cards">
                               <img className="pokesImg" src={item.sprites.other.dream_world.front_default}/>
                               <p>Nº00{item.id}</p>
                               <h1>{item.name}</h1>
                               <h4>Types: {item.types.length > 1 ? 
                               <><span>{item.types[0].type.name}</span>
                               <span>{item.types[1].type.name}</span></>
                               :<span>{item.types[0].type.name}</span>}</h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
     }
}