import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Facebook, Twitter, Instagram, Vk } from "@styled-icons/boxicons-logos";
import { DoubleArrow } from "@styled-icons/material-rounded";

import Button from "../Button/Button.component";

import "./Footer.styles.scss";

const UpArrow = styled(DoubleArrow)`
	height: 16px;
	width: 16px;
	color: #c19d60;
	transform: rotateZ(-90deg);
	display: block;
	font-weight: 300;
`;
const IconWrap = styled(motion.div)`
	height: auto;
	width: auto48;
`;

const Footer = () => {
	const [showDoubleArrow, setShowDoubleArrow] = useState(false);

	const handleMouse = () => {
		setShowDoubleArrow((prev) => !prev);
	};

	return (
		<>
			<div className="footer-wrap"></div>
			<footer className="fixed-footer">
				<div className="footer-container">
					<div className="footer-top">
						<div className="logo-container">
							<Link to="/" className="nav-links">
								<img src="../../../img/logo_transparent.png" alt="Logo" />
							</Link>
						</div>
						<div className="lang-wrap">
							<span className="english">En </span> /{" "}
							<span className="espanol">Es</span>
						</div>
						<div className="follow-us">
							<span>Follow us: </span>
							<ul>
								<li className="social">
									<Link to="/" className="social-links">
										<Facebook />
									</Link>
								</li>
								<li className="social">
									<Link to="/" className="social-links">
										<Twitter />
									</Link>
								</li>
								<li className="social">
									<Link to="/" className="social-links">
										<Instagram />
									</Link>
								</li>
								<li className="social">
									<Link to="/" className="social-links">
										<Vk />
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-widget-wrap row">
						<div className="footer-about-us">
							<h2>About us</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Nesciunt numquam dolorem dicta aperiam illo ex saepe? Laboriosam
								praesentium, optio aspernatur, debitis enim in, ipsam similique
								odit explicabo assumenda omnis magni.
							</p>
							<Link to="/" className="connect-links">
								Read more
							</Link>
						</div>
						<div className="footer-contacts">
							<h2>Contact info</h2>
							<ul>
								<li>
									<span>Call:</span>
									<Link to="#" className="contact-links">
										+1 (919) 721-9999
									</Link>
									{"   "}|{"   "}
									<Link to="#" className="contact-links">
										+1 (919) 721-8888
									</Link>
								</li>
								<li>
									<span>Email:</span>
									<Link to="#" className="contact-links">
										steakawesome@gmail.com
									</Link>
								</li>
								<li>
									<span>Find us:</span>
									<Link to="#" className="contact-links">
										{" "}
										4047 Clark Street, Huntington, NY 11743, USA{" "}
									</Link>
								</li>
							</ul>
							<Link to="#" className="connect-links">
								Get in Touch
							</Link>
						</div>
						<div className="subscriber">
							<h2>Subscribe</h2>
							<p>
								Want to be notified when we launch a new template or an udpate.
								Just sign up and we'll send you a notification by email.
							</p>
							<form className="subscriber-email">
								<input type="email" placeholder="Your Email" />
								<Button
									content={"Send"}
									background={"#c19d60"}
									border={"#c19d60"}
									marginTop={"0rem"}
									paddingTop={"12px"}
								/>
							</form>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="copy-right">
							&copy; SteakAwesome. All rights reserved.
						</div>
						<AnimatePresence>
							<div
								className="to-top"
								onMouseEnter={handleMouse}
								onMouseLeave={handleMouse}
							>
								{showDoubleArrow ? (
									<IconWrap
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.8 }}
									>
										<UpArrow />
									</IconWrap>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.8 }}
										className="back-to-top"
									>
										Back to Top
									</motion.div>
								)}
							</div>
						</AnimatePresence>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
