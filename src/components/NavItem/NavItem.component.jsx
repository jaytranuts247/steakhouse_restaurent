import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ name, link }) => {
	return (
		<li className="nav-item">
			<Link to={link} className="nav-links">
				<span classNam="nav-item--name">{name}</span>
			</Link>
		</li>
	);
};

export default NavItem;
