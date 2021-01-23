import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BrowserRouter as Router } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel.component";
import NavBar from "../../components/NavBar/NavBar.component";
import TopBar from "../../components/Topbar/TopBar.component";
import FlipCard from "../../components/FlipCard/FlipCard.component";
import Menu from "../../components/Menu/Menu.component";
import OurTeam from "../../components/OurTeam/OurTeam.component";
import UpComingEvent from "../../components/UpComingEvent/UpComingEvent.component";
import CustomerReview from "../../components/CustomerReview/CustomerReview.component";
import Footer from "../../components/Footer/Footer.component";

import { BsArrowRight } from "react-icons/bs";
import { IconContext } from "react-icons";
import { DoubleQuoteSerifRight } from "@styled-icons/open-iconic";

import "./Home.styles.scss";

const QouteIcon = styled(DoubleQuoteSerifRight)`
	color: #c19d60;
`;

const SignatureBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: -1;
	transition: linear;
	overflow: hidden;
	& img {
		height: 130%;
		width: 100%;
		transform: translateY(-15%);
		object-fit: fill;
	}
`;

const OpenHoursContainer = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0rem;
	position: relative;
	background-color: #303030;
	background-image: url("../../../img/11.png");
	background-size: cover;
	background-position: center;
	background-repeat: repeat;
	background-origin: content-box;

	@media screen and (max-width: 768px) {
		width: 100%;
		position: relative;
		padding: 5rem 0;
	}
`;

const WrappedOpenTime = styled.div`
	display: flex;
	flex-direction: row;
	${"" /* flex-wrap: wrap; */}
	justify-content: space-between;
	align-items: center;
	width: 100%;
	position: relative;

	min-height: 17rem;
	margin-bottom: 2rem;

	&::before {
		content: "";
		position: absolute;
		top: 3rem;
		left: 50%;
		margin-left: -5px;
		width: 10px;
		bottom: 20px;
		background: url(../../../img/ver-separator.png) repeat-y;
	}

	@media screen and (max-width: 1440px) {
		min-height: 15rem;
		margin-bottom: 1.5rem;
	}
`;

const carouselInfo = [
	{
		id: 1,
		title: "View Our Story",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, repellat",
		imageNum: 1,
	},
	{
		id: 2,
		title: "Buy Delicious Dessert",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, repellat",
		imageNum: 2,
	},
	{
		id: 3,
		title: "Explore Our Restaurent",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, repellat",
		imageNum: 3,
	},
	{
		id: 4,
		title: "Explore Our Menu",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, repellat",
		imageNum: 4,
	},
	{
		id: 5,
		title: "View Our Team",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, repellat",
		imageNum: 5,
	},
];

const IntroItem = styled.div`
	height: auto;
	width: 70%;
	z-index: 15;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& h1 {
		font-size: 2.4rem;
		font-weight: 700;
		color: #fff;
		padding-top: 2rem;
	}
	& p {
		font-size: 1.4rem;
		font-weight: 500;
		color: #c19d60;
		padding: 1rem 0 2.3rem;
		text-align: center;
	}

	& .three-dot-seperator span::after {
		color: #c19d60;
		font-size: 1.5rem;
		padding-bottom: 2rem;
	}
`;

const InitCarouselSettings = {
	transitionDuration: 1.4,
	startIdx: 1,
	itemToShow: 3,
	zIndex: 10,
	imageToShow: [1, 2, 3, 4, 5],
	carouselInfo,
};

const Home = () => {
	const imageToShow = [1, 2, 3, 4, 5];

	var servicesArray = Array.from(Array(3).keys());
	const [carouselSettings, setCarouselSettings] = useState(
		InitCarouselSettings
	);

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		let itemToShow = 3;
	// 		if (window.innerWidth <= 768) {
	// 			itemToShow = 1;
	// 		}
	// 		setCarouselSettings((prevState) => ({
	// 			...prevState,
	// 			itemToshow: itemToShow,
	// 		}));
	// 	};

	// 	handleResize();

	// 	window.addEventListener("resize", handleResize);
	// 	return () => window.addEventListener("resize", handleResize);
	// }, []);

	return (
		<>
			<Carousel settings={InitCarouselSettings}>
				{carouselInfo.map((cardInfo, idx) => (
					<IntroItem key={cardInfo.id} imageNum={cardInfo.imageNum}>
						{/* <img src={`../img/long/${i}.jpg`} alt="No Item Found" /> */}
						<div className="three-dot-seperator">
							<span></span>
						</div>
						<h1>{cardInfo.title}</h1>
						<p>{cardInfo.description}</p>
						<div className="bold-seperator">
							<span></span>
						</div>
					</IntroItem>
				))}
			</Carousel>
			<TopBar />
			<NavBar />

			<section className="explore-our-story">
				<div className="explore-our-story-container">
					<div className="top-border-line"></div>
					<div className="explore-menu">
						<h1 id="our-story">Our Story</h1>
						<h1 id="words-about-us">Few words about us</h1>
						<div className="dot-seperator">
							<span></span>
						</div>
						<div className="content-container"></div>
						<p className="about-us-content">
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium totam aperiam. Eaque ipsa quae
							ab illo inventore veritatis et quasi architecto beatae vitae dicta
							sunt. Ut enim ad minima veniam, quis nostrum exercitationem ullam
							corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
							consequatur.
						</p>
						<p className="about-us-content">
							Quis autem vel eum iure reprehenderit qui in ea voluptate velit
							esse quam nihil molestiae consequatur. Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Cupiditate aliquid magnam.
						</p>
						<IconContext.Provider
							value={{ style: { paddingTop: ".5rem" }, size: "2rem" }}
						>
							<button id="menu-btn">
								Explore Our Menu{" "}
								<span>
									<BsArrowRight />
								</span>
							</button>
						</IconContext.Provider>
					</div>
					<div className="menu-photo">
						<div className="menu-photo-6">
							<img id="img-6" src="../../../img/4.jpg" alt="photo-6" />
						</div>
						<div className="menu-photo-7">
							<img id="img-7" src="../../../img/9.jpg" alt="photo-7" />
						</div>
						<div className="dotted-border"></div>
					</div>
				</div>
			</section>

			<section className="working-hours">
				<div className="working-hours__container">
					<div className="signature-container">
						<SignatureBackground>
							<img src="../../../img/10.jpg" alt="signature background" />
						</SignatureBackground>
						<div className="overlay"></div>
						<div className="signature">
							<div className="quote-icon">
								<QouteIcon size="48" title="chef's quote" />
							</div>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
								totam quam repudiandae assumenda doloremque quo, consequuntur
								ullam sint delectus consequatur, ex ut libero amet nihil dolores
								optio ipsum minima repellendus.
							</p>

							<div className="restaurent-chef">
								<span>Gordon Ramsay - Restaurent's Chef</span>
								<div className="restaurent-chef__signature">
									<img src="../../../img/chef-signature.jpeg" alt="signature" />
								</div>
							</div>
						</div>
					</div>
					<OpenHoursContainer>
						<div className="open-hours">
							<div className="open-hours__container">
								<div className="column-text">
									<div className="open-hours-title">
										<h2> Call For Reservations</h2>
										<h1>Opening Hours</h1>
										<div className="dot-seperator">
											<span></span>
										</div>
									</div>
									<WrappedOpenTime>
										<div className="working-day">
											<h1>Sunday to Tuesday</h1>
											<h2>9:00</h2>
											<h2>22:00</h2>
										</div>
										<div className="weekend">
											<h1>Friday to Saturday</h1>
											<h2>11:00</h2>
											<h2>19:00</h2>
										</div>
									</WrappedOpenTime>

									<div className="bold-seperator">
										<span></span>
									</div>
									<div className="calling-now">
										<h1>(+1) 919-721-1111</h1>
									</div>
								</div>
							</div>
						</div>
					</OpenHoursContainer>
				</div>
			</section>

			<section className="services">
				<div
					className="services-background"
					style={{ backgroundImage: "url('../../../img/section-bg.png')" }}
				></div>
				<div className="services-container">
					<div className="section-title">
						<h2>Why People choose us</h2>
						<h1>Prepare for first-class service</h1>
						<div className="dot-seperator">
							<span></span>
						</div>
					</div>
					<div className="section-row">
						{servicesArray.map((i, idx) => {
							return <FlipCard key={idx} id={i} />;
						})}
					</div>
					<div className="more-about-us">
						<IconContext.Provider
							value={{ style: { paddingTop: ".2rem" }, size: "1.4rem" }}
						>
							<button className="more-about-us-btn">
								Read More About us{" "}
								<span>
									<BsArrowRight />
								</span>
							</button>
						</IconContext.Provider>
					</div>
				</div>
			</section>

			<Menu />
			<OurTeam />
			<UpComingEvent />
			<CustomerReview />
			<Footer />
		</>
	);
};

export default Home;
