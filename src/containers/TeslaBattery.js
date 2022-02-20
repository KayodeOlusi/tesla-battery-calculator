import React from "react";
import "./TeslaBattery.css";
import TeslaNotice from "../components/TeslaNotice/TeslaNotice";
import TeslaCar from "../components/TeslaCar/TeslaCar";

// This component is responsible for creating and managing data and state as a container component
class TeslaBattery extends React.Component {
    render() { 
        return ( 
            <form className = "tesla-battery">
                <h1>Range Per Charge</h1>
                <TeslaCar />
                <TeslaNotice /> 
            </form>
         );
    }
}
 
export default TeslaBattery;