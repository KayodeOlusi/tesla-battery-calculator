import React from "react";
import "./TeslaCar.css";

// This is a component that renders the image of a tesla car with animations
const TeslaCar = (props) => {
    return ( 
        <div className="tesla-car">
            <div className="tesla-wheels">
                <div className = {`tesla-wheel tesla-wheel--front tesla-wheel--${props.wheelSize}`}></div>
                <div className = {`tesla-wheel tesla-wheel--rear tesla-wheel--${props.wheelSize}`}></div>
            </div>
        </div>
    );
}
 
export default TeslaCar;