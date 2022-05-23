import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';

import { Container } from 'react-bootstrap';

import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Store from './pages/Store';
import ProductShow from './pages/ProductShow';
import ProductEdit from './pages/ProductEdit';

function App() {
  return (
    <>
      <Router>
        <div className="body-color">
          <Header />
          <Container>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductShow />} />
              <Route path="/product/:id/edit" element={<ProductEdit />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
