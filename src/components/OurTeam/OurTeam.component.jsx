import React from "react";
import Button from "../Button/Button.component";
import { Facebook, Twitter, Instagram, Vk } from "@styled-icons/boxicons-logos";

import { ChefsInfo } from "./OurChefInfo";

import "./OurTeam.styles.scss";

const OurTeam = () => {
	return (
		<section className="chef-team">
			<div className="chef-team-container">
				<div className="section-title">
					<h2>Our Awesome Team</h2>
					<h1>Meet Our Chefs</h1>
					<div className="dot-seperator">
						<span></span>
					</div>
				</div>
				<div className="intro-wrap">
					<div className="row">
						{ChefsInfo.map((chef, idx) => {
							const { id, name, liveIn, intro, photoId } = chef;
							return (
								<div className="card-wrap">
									<div key={id} className="chef-card">
										<div className="chef-photo">
											<div className="overlay"></div>
											<div className="team-social">
												<span className="ts-title">Follow</span>
												<ul className="no-list-style">
													<li>
														<Facebook />
													</li>
													<li>
														<Twitter />
													</li>
													<li>
														<Instagram />
													</li>
													<li>
														<Vk />
													</li>
												</ul>
											</div>
											<img
												src={`../../../img/team/${photoId}.jpg`}
												alt="chef"
											/>
										</div>
										<div className="chef-intro">
											<h1>{name}</h1>
											<h2>Master Chef in {liveIn}</h2>
											<p>{intro}</p>
											<div className="three-dot-seperator">
												<span></span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="recipes-book">
					<h1>Want to cook somthing tasty? Read our best recipes.</h1>
					<Button
						content={"Recipes Book"}
						background={"#292929"}
						border={"#292929"}
						marginTop={"0rem"}
						paddingTop={"12px"}
					/>
				</div>
			</div>
		</section>
	);
};

export default OurTeam;
