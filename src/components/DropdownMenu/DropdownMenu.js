import React, { memo } from "react";
import { Menu } from "@headlessui/react";
import "./DropdownMenu.scss";

const DropdownMenu = ({ buttonComponent, items }) => {
    return (
        <Menu as="div" className="menu">
            <Menu.Button className="no-btn">
                {buttonComponent}
            </Menu.Button>
            <Menu.Items className="menu-items">
                {items ?
                    items.map((item, index) => (
                        <Menu.Item key={index.toString()}>
                            <a
                                className={`menu__item ${item.className ?? ""}`}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        </Menu.Item>
                    ))
                    :
                    <p className="menu__empty-message">This menu has no options</p>
                }
            </Menu.Items>
        </Menu>
    )
}

export default memo(DropdownMenu);