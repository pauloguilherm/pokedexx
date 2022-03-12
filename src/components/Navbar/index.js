import './Navbar.css'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Bag from './assets/img/pokeBag.jpg'

export default function Navbar(){
    const [pokeName, setPokeName] = useState();
    const navigate= useNavigate();

    function loadPokes(){
        navigate(`/pokemon/${pokeName}`)
        window.location.reload();
    }
    return(
        <div>
            <nav className="nav">

                <Link to="/" className="logo"></Link>

                <div className="container-search">

                <input 
                onChange={(e)=> setPokeName((e.target.value).toLowerCase())}
                type="text"
                className="input form-control"
                placeholder="Pesquise pokemons"/>

                <Button onClick={loadPokes}>Pesquisar</Button>
                </div>
            </nav>
        </div>
    )
}