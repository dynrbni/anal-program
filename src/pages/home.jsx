import React from "react";
import NavbarLogin from "../component/navbarLoggedIn";
import Home from "./../component/homeFeli";
import Slider from "./..//component/slider";
import FeaturedProduct from "./../component/featured";
import Flashsale from "./../component/flashsale";
import OtherServices from "./../component/otherservices";
import Flashsale2 from "./../component/flashsale2"
import Footer from "./../component/footer";



const HomePage = () => {



    return(
        <>
        <NavbarLogin />
        <Slider />
        <Home />
        <FeaturedProduct/>
        <Flashsale />
        {/*
        <Flashsale3 /> */}
        <OtherServices />
        <Flashsale2 />
        <Footer />
         </>
    )
}

export default HomePage;