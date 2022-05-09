import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ImageContainer from './components/Images/imageContainer';
import NavBar from './components/layout/NavBar';
import ImagesState from './context/images/imagesState';

function App() {
  return (
    <ImagesState>
      <Router>
        <div className='App'>
          <NavBar />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<ImageContainer />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </ImagesState>
  );
}

export default App;
