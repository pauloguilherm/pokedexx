import './Navbar.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar(){
    const [pokeName, setPokeName] = useState([])
    
    function searchPokes(){


    }
    return(
        <div>
            <nav className="nav">

                <Link to="/" className="logo"></Link>

                <div className="container-search">

                <input 
                type="text"
                className="input form-control"
                placeholder="Pesquise pokemons"/>

                <Button>Pesquisar</Button>
                
                </div>
            </nav>
        </div>
    )
}