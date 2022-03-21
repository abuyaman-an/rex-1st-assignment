import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

const Navbar = ({ links }) => {
    /**
     * The main navbar component.
     * @param {Array} links - An array of object that each represent a navbar link, each link should contain two attributes {label:string, link:string}.
     */
    const navList = useRef(null);

    const OpenMenu = () => {
        // (Mobile) shows the navbar menu as aside menu.
        if (null !== navList.current) {
            navList.current.classList.add('open');
        }
    }

    const CloseMenu = () => {
        // (Mobile) hides the navbar menu as aside menu.
        if (null !== navList.current) {
            navList.current.classList.remove('open');
        }
    }

    return (
        <nav className="navbar">
            <Link className="navbar__logo" to="/">Da'Recipe</Link>
            <div className="navbar__links-container" ref={navList}>
                <ul className="navbar__links" >
                    {
                        links.map((link, index) => (
                            <li key={index.toString()}><Link to={link.url}>{link.label}</Link></li>
                        ))
                    }
                </ul>
                <div aria-hidden='true' onClick={CloseMenu} className="navbar__links__overlay"></div>
            </div>
            <svg onClick={OpenMenu} xmlns="http://www.w3.org/2000/svg" className="navbar__m-expand-menu" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </nav>
    )
}

export default Navbar;