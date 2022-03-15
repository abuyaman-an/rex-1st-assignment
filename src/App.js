import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage/Homepage';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import About from './Pages/About/About';
import './Assets/SCSS/line-awesome/css/line-awesome.min.css';
import './Assets/SCSS/main.scss';

function App() {

  let links = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'About us',
      url: '/about'
    },
    {
      label: 'Second',
      url: '#'
    }
    , {
      label: 'Third',
      url: '#'
    }
    , {
      label: 'Fourth',
      url: '#'
    }
  ]
  return (
    <div className="main-container">
      <Navbar links={links} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="recipe/:id/" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
