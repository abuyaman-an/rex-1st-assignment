import React from "react";
import PeepOne from '../../Assets/Images/peep-setting.svg';
import { Link } from "react-router-dom";
import "./HeroSection.scss";

const HeroSection = ({ title, description, callToActionLabel, callToActionLink }) => {
    /**
     * A Header/Hero section 
     * @param {string} title - A title for the hero section.
     * @param {string} description - A description for the hero section.
     * @param {string} [callToActionLabel] - (optional) A Label for the call to action button/link.
     * @param {string} [callToActionLink] - (optional) A link for the call to action button/link.
     */
    return (
        <header className="hero-section">
            <div className="hero-section__inner">
                <img src={PeepOne} alt="A doodle of a guy sitting" />
                <div className="hero-section__inner__text">
                    <h1>{title}</h1>
                    <p className="big">{description}</p>
                    <Link to={callToActionLink}>
                        <button className='btn' style={{ alignSelf: 'flex-start' }}>{callToActionLabel}</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default HeroSection;