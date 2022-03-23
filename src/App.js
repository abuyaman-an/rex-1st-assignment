import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import './themeStyles/general.scss';

// Lazy loading pages components
const Homepage = lazy(() => import( /* webpackChunkName: "pages.homepage" */ "./pages/Homepage/Homepage"));
const RecipeDetails = lazy(() => import( /* webpackChunkName: "pages.recipe-details" */ "./pages/RecipeDetails/RecipeDetails"));
const About = lazy(() => import( /* webpackChunkName: "pages.about" */ "./pages/About/About"));

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
      url: '/second'
    }
    , {
      label: 'Third',
      url: '/third'
    }
    , {
      label: 'Fourth',
      url: '/Fourth'
    }
  ]
  return (
    <div className="main-container">
      <Navbar links={links} />
      <main className="main-content">
        <Suspense fallback={<LoadingScreen fullscreen />}>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="recipe/:id/" element={<RecipeDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
