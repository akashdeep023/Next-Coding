// Metadata Static -> about page
// export const metadata = { // title string
//     title: "About Page",
// };

import { Metadata } from "next";

export const metadata: Metadata = {
    // title string ---
    title: "About Page", // Add with parent title template
    // title object ---
    // title: {
    //     absolute: "About page", // Exact title name
    // },
};

// About page (route -> '/about')
export default function About() {
    return <h1>About page</h1>;
}
