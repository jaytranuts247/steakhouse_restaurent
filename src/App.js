import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import Carousel from "./components/Carousel/Carousel.component";
// import Carousel2 from "./components/carousel2/carousel2.component";
// import CarouselTest from "./components/carouselTest";

import NavBar from "./components/NavBar/NavBar.component";
import TopBar from "./components/Topbar/TopBar.component";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/contact" component={ContactUs} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;

/*
<Carousel settings={carouselSettings}>
				{imageToShow.map((i) => (
					<div>
						<img src={`../img/${i}.jpg`} alt="No Item Found" />
					</div>
				))}
			</Carousel>
			<TopBar />
			<Router>
				<NavBar />
			</Router>
			<section className="explore-our-story">
				<div className="explore-our-story-container">
					<div className="explore-menu">
						<h1 className="our-story">Our Sotry</h1>
						<h1 className="words-about-us">Few words about us</h1>
						<p className="about-us-content">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
							delectus molestias ad! Iure repellat quia beatae officiis vel
							aperiam incidunt voluptatem corrupti rem molestias expedita
							nesciunt, reprehenderit dolore ab nobis.
						</p>
						<button className="menu-btn">Explore Our Menu</button>
					</div>
					<div className="menu-photo">
						<img src="" alt="Menu"/>
						<img src="" alt="Menu"/>
						<div className="background-broken-line-border"></div>
					</div>
				</div>
			</section>
			 */
