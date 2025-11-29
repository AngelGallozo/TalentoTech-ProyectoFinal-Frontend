import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import About from './pages/About';
import Contact from './pages/Contact';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Footer from './components/Footer';
import Pedidos from './components/Pedidos';
import { useState } from 'react';
import Login from './pages/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import RutaProtegida from './components/RutaProtegida';
import { useNavigate } from "react-router-dom";
import '../src/App.css';
import ProductoDetalle from './pages/ProductoDetalle';

function App() {

  return (
    <div className="app-container">
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<ProductList title={'Productos'}/>}/>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/carrito' element={
            <RutaProtegida>
              <Carrito/>
            </RutaProtegida>
          } />
          <Route path='/admin' element={<RutaProtegida> <Admin /> </RutaProtegida>} />
          <Route path='/joyeria' element={<ProductList  title={'Joyería'} category={'jewelery'}/>}/>
          <Route path='/hombres' element={<ProductList  title={'Hombres'} category={"men's clothing"}/>}/>
          <Route path='/mujeres' element={<ProductList  title={'Mujeres'} category={"women's clothing"}/>}/>
          <Route path='/electronica' element={<ProductList title={'Electrónica'} category={'electronics'}/>}/>
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/pedidos" element={<RutaProtegida> <Pedidos /> </RutaProtegida> }/>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );

}

export default App
