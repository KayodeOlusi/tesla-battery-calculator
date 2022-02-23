import { connect } from "react-redux";
import { speedDown, speedUp } from "../actions";
import { counterDefaultVal } from "../constants/counterDefaultVal";
import TeslaCounter from "../components/TeslaCounter/TeslaCounter"; 

const mapStateToProps = (state) => {
    return {
        currentValue: state.config.speed,
        initValues: counterDefaultVal.speed
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (value) => {
            dispatch(speedUp(value))
        },
        decrement: (value) => {
            dispatch(speedDown(value))
        } 
    };
};

const TeslaSpeedCounterContainer = connect(mapStateToProps, mapDispatchToProps)(TeslaCounter);

export default TeslaSpeedCounterContainer;