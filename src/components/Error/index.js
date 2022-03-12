import img from './assets/imagens/error.gif'
import { Link } from 'react-router-dom'
import './error.css'

export default function Error(){

    return(
        <div className="containerError">
            <h1>Pokemon não encontrado :(</h1>
            <img src={img} alt="errpr"/>
            <Link to="/" className="buttonHome">HOME</Link>
        </div>
    )
}