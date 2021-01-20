import React from "react";
import "./TopBar.styles.scss";

const TopBar = () => {
	return (
		<div className="topbar-container">
			<div className="top-bar">
				<div className="top-bar__language">
					<span className="english">En </span> /{" "}
					<span className="espanol">Es</span>
				</div>
				<div className="top-bar__contacts">
					<div className="top-bar__contacts--phone">
						<span className="call-now">Call Now: </span>
						<span className="phone-number">(+1) 919-721-2312</span>
					</div>
					<div className="top-bar__contacts--email">
						<span className="email">Email: </span>
						<span className="restaurent-email">steak.awesome@gmail.com</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
