import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import Error from './components/Error'
import Capturados from './components/Capturados'

const Rotas = () =>{

    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/pokemon/:id" element={<Pokemon />} />
                <Route exact path="Capturados" element={<Capturados />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;