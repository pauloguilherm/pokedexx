import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'

const Rotas = () =>{

    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;