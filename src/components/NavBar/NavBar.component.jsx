import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useViewportScroll } from "framer-motion";
import "./NavBar.styles.scss";

import { Bars, Times } from "@styled-icons/fa-solid";

import { BsBag } from "react-icons/bs";
import { IconContext } from "react-icons";

const NavList = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "Menu",
		link: "/menu",
	},
	{
		name: "About",
		link: "/about",
	},
	{
		name: "Contact",
		link: "/contact",
	},
	{
		name: "News",
		link: "/news",
	},
];

const TimesIcon = styled(Times)`
	height: 100%;
	width: 3rem;
	margin: 0 2rem;
`;
const BarsIcon = styled(Bars)`
	height: 100%;
	width: 3rem;
	margin: 0 2rem;
`;
const NavBar = () => {
	const [isSticky, setIsSticky] = useState(false);
	const { scrollY } = useViewportScroll();
	const [button, setButton] = useState(false);
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	scrollY.onChange((offsetY) => {
		if (offsetY > 40) {
			if (!isSticky) {
				setIsSticky(true);
				// setIsSticky(true);
				// console.log(">40");
			}
		} else {
			if (isSticky) {
				setIsSticky(false);
				// console.log("<40");
			}
		}
	});

	const showButton = () => {
		if (window.innerWidth <= 992) {
			setButton(true);
			setClick(false);
		} else {
			setButton(false);
			setClick(true);
		}
	};

	useEffect(() => {
		showButton();
		window.addEventListener("resize", showButton);
		return () => {
			window.addEventListener("resize", showButton);
		};
	}, []);

	return (
		<nav className={`container ${isSticky ? "sticky" : ""}`}>
			<div className="navbar-container">
				<div className="navbar-container__logo">
					<Link to="/" className="nav-links">
						<img src="../../../img/logo_transparent.png" alt="Logo" />
					</Link>
				</div>

				{click && (
					<ul className="nav-menu">
						<li className="nav-item">
							<Link to="/" className="nav-links">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/menu" className="nav-links">
								Menu
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/contact" className="nav-links">
								Contact
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="nav-links">
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/news" className="nav-links">
								News
							</Link>
						</li>
					</ul>
				)}
				{button && (
					<div className="menu-icon" onClick={handleClick}>
						{click ? <TimesIcon /> : <BarsIcon />}
					</div>
				)}
				<div className="checkout-bag">
					<IconContext.Provider value={{ style: {}, size: "2.5rem" }}>
						<Link to="/checkout-bag" className="checkout-links">
							<BsBag />
						</Link>
					</IconContext.Provider>
				</div>
				<div className="reservation">
					<p>Reservation</p>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
