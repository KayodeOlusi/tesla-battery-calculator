import { connect } from "react-redux";
import TeslaStats from "../components/TeslaStats/TeslaStats";

const mapStateToProps = (state) => {
    return {
        carstats: state.carstats
    };
};

const TeslaCarStats = connect(mapStateToProps, null)(TeslaStats);

export default TeslaCarStats;