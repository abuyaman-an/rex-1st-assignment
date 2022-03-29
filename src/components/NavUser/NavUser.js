import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./NavUser.scss";

const buttonComponent = (
    <div className="nav-user">
        <i className="nav-user__icon lar la-user-circle"></i>
        <span className="nav-user__username">Ahmad</span>
    </div>
);

const navLinks = [
    {
        label: "Account settings",
        href: "/settings",
    },
    {
        label: "Logout",
        href: "/logout"
    }
];

const NavUser = () => {
    return (
        <DropdownMenu
            buttonComponent={buttonComponent}
            items={navLinks}
        />
    );
}

export default NavUser;