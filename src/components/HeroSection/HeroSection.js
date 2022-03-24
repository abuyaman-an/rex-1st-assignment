import React from "react";

import PeepOne from '../../assets/Images/Cooking-cuate.svg';
import Button from "../Button/Button";
import Badge from "../Badge/Badge";
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
                    <Badge message="new" className="self-start" type="primary" />
                    <h1 className="hero-section__title">{title}</h1>
                    <p className="big">{description}</p>
                    <Button
                        to={callToActionLink}
                        label={callToActionLabel}
                        style={{ alignSelf: "flex-start" }}
                    />
                </div>
            </div>
        </header>
    )
}

export default HeroSection;