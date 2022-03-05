import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokemon from './components/Pokemon';

const Rotas = () =>{

    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/pokemon/:id" element={<Pokemon />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;