import React from 'react';
import './assets/css/main.scss';
import Navbar from './components/navbar';
import { Routes, Route } from "react-router-dom";
import Homepage from './screens/homepage/homepage';
import RecipeDetails from './screens/recipe-details/recipe-details';
import './assets/css/line-awesome/css/line-awesome.min.css';

const About = () => {
  return (
    <div className="main-content__grid main">
      <h1>About Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur, quis, ratione rerum quibusdam eveniet cum, quo eius tempora laboriosam sed obcaecati. Tenetur saepe doloremque repellendus aperiam id ea mollitia quia dolor sequi dolorem, modi necessitatibus, cumque reprehenderit, non ad corporis rerum debitis! Alias, nostrum at. Accusantium modi eum mollitia rerum veniam a, molestiae velit, hic laboriosam ea repudiandae quas nobis consectetur animi iure quos adipisci ad error pariatur. Est nulla quas, perferendis harum aperiam necessitatibus, ad qui incidunt, earum molestiae magnam maiores voluptatum nesciunt deleniti eligendi in sequi blanditiis ipsam rem? Porro iusto sequi dignissimos quasi officia, perferendis odio!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus unde consectetur, impedit itaque eligendi maxime corrupti commodi vitae optio nulla, enim ex inventore velit magnam mollitia at atque, quas cumque eaque neque quos esse amet sunt! Vel, at atque, quas aliquam repellendus maxime sit tempore, nemo vero voluptate rem minus perferendis assumenda! Tempora commodi quas quos voluptate, eligendi, dolores ut a quae nostrum nobis optio qui quasi alias id. Non dolor placeat doloremque nostrum beatae.</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos esse in maxime facere nihil debitis rerum corporis praesentium alias? Quia ab aspernatur ex amet consectetur sint commodi tempore iure repellat quidem, hic odit corrupti molestias aut officia. Architecto repellat quasi quibusdam, saepe magnam maiores incidunt repudiandae! Reiciendis tempore odit minus.</p>
    </div>
  )
}

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
          <Route path="recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
