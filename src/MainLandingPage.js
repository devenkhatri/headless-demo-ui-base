import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import Testimonial from "components/testimonials/SimplePrimaryBackground.js";
import Footer from "components/footers/MiniCenteredFooter.js";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <Blog />
    <Testimonial />
    <Footer />
  </AnimationRevealPage>
);
