"use client";
// import { serverSideFunction } from "@/utils/server-utils"; // work only in server components
import React from "react";
import Slider from "react-slick"; // work only in client components
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@/components/theme-provider";
import { clientSideFunction } from "@/utils/client-utils"; // work only in client components

export default function ClientRoute() {
	// const result = serverSideFunction(); // throws error: server components cannot be used in client components
	// return <h1>Client Route {result}</h1>;
	const settings = {
		dots: true,
	};
	const theme = useTheme();
	const result = clientSideFunction();
	return (
		<>
			<h1 style={{ color: theme.colors.primary }}>Client Route</h1>
			<p>{result}</p>
			<div className="image-slider-container">
				<Slider {...settings}>
					<div>
						<img src="https://picsum.photos/400/200" />
					</div>
					<div>
						<img src="https://picsum.photos/400/200" />
					</div>
					<div>
						<img src="https://picsum.photos/400/200" />
					</div>
					<div>
						<img src="https://picsum.photos/400/200" />
					</div>
				</Slider>
			</div>
		</>
	);
}
