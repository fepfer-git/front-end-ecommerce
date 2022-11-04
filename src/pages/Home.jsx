import React from "react";
// import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
// import PolicyCard from "../components/PolicyCard";
// import Grid from "../components/Grid";
// import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
// import policy from "../assets/fake-data/policy";
// import productData from "../assets/fake-data/products";

// import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section></Section>
      {/* end policy section */}

      {/* best selling section */}

      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
