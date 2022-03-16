import React, { Suspense, lazy } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import './ThemeStyles/General.scss';

// Lazy loading pages components
const Homepage = lazy(() => import("./Pages/Homepage/Homepage"));
const RecipeDetails = lazy(() => import("./Pages/RecipeDetails/RecipeDetails"));
const About = lazy(() => import("./Pages/About/About"));

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
        <Suspense fallback={<LoadingScreen fullscreen />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="recipe/:id/" element={<RecipeDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
