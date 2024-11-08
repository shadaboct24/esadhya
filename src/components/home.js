import React from "react";
import Carousel from "./carousal";
import CdacInfoCard from "./homeCards/cdacinfoCard";

function Home(){
    return(
        <div style={{ backgroundColor: '#e1e0de'}}>
        <Carousel/>
        <CdacInfoCard/>
        </div>
    );
}
export default Home;