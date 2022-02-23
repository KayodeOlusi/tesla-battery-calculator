import React from "react";
import "./TeslaBattery.css";
import { getModelData } from "../services/BatteryService";
import TeslaNotice from "../components/TeslaNotice/TeslaNotice";
import TeslaCar from "../components/TeslaCar/TeslaCar";
import TeslaStats from "../components/TeslaStats/TeslaStats";
import TeslaCounter from "../components/TeslaCounter/TeslaCounter";
import TeslaClimate from "../components/TeslaClimate/TeslaClimate";
import TeslaWheels from "../components/TeslaWheels/TeslaWheels";

// This component is responsible for creating and managing data and state as a container component
class TeslaBattery extends React.Component {
    constructor(props) {
        super(props);

        this.calculateStats = this.calculateStats.bind(this);
        this.statsUpdate = this.statsUpdate.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.updateCounterState = this.updateCounterState.bind(this);
        this.handleChangeClimate = this.handleChangeClimate.bind(this);
        this.handleChangeWheels = this.handleChangeWheels.bind(this);

        this.state = {
            carstats: [],
            config: {
                speed: 55,
                temperature: 20,
                climate: true,
                wheels: 19
            }
        }; 
    };

    calculateStats = (models, value) => {
        const dataModels = getModelData();
        return models.map(model => {
            const { speed, temperature, climate, wheels } = value;
            const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
            return {
                model,
                miles
            };
        });
    };

    statsUpdate() {
        const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
        // Fetch model info from BatteryService and calculate then update state
        this.setState({
            carstats: this.calculateStats(carModels, this.state.config)
        });
    };

    componentDidMount() {
        this.statsUpdate();
    };

    updateCounterState(title, newValue) {
        const config = { ...this.state.config };
        // update config state with new value
        title === 'Speed' ? config['speed'] = newValue : config['temperature'] = newValue;
        // update our state
        this.setState({ config }, () => {this.statsUpdate()});
    }

    // handle wheels click event handler
    handleChangeWheels(size) {
        const config = {...this.state.config};
        config['wheels'] = size;
        this.setState({ config }, () => {this.statsUpdate()});
      }

    // handle aircon & heating click event handler
    handleChangeClimate() {
        const config = { ...this.state.config };
        config['climate'] = !this.state.config.climate;
        this.setState({ config }, () => {this.statsUpdate()});
    }

    increment(e, title) {
        e.preventDefault();
        let currentValue, maxValue, step;
        const { speed, temperature } = this.props.counterDefaultVal;
        if (title === 'Speed') {
          // Herer we check the props to see if a key of speed is what was clicked
          currentValue = this.state.config.speed;
          maxValue = speed.max;
          step = speed.step;
          // we add according to the step/rate
        } else {
          currentValue = this.state.config.temperature;
          maxValue = temperature.max;
          step = temperature.step;
        }
        if (currentValue < maxValue) {
          const newValue = currentValue + step;
          this.updateCounterState(title, newValue);
        }
    }

    // decrement is the same with increment but we subtract from the value with the step as a rate
    decrement(e, title) {
        e.preventDefault();
        let currentValue, minValue, step;
        const { speed, temperature } = this.props.counterDefaultVal;
        if (title === 'Speed') {
          currentValue = this.state.config.speed;
          minValue = speed.min;
          step = speed.step;
        } else {
          currentValue = this.state.config.temperature;
          minValue = temperature.min;
          step = temperature.step;
        }
        if (currentValue > minValue) {
          const newValue = currentValue - step;
          this.updateCounterState(title, newValue);
        }
    }


    render() {
        const { config, carstats } = this.state;
        
        return ( 
            <form className = "tesla-battery">
                <h1 className = "title-animation">Range Per Charge</h1>
                <TeslaCar wheelSize = { config.wheels } />
                <TeslaStats carstats = { carstats } />
                <div className="tesla-controls cf tesla-controls-animation">
                    <TeslaCounter 
                        currentValue = { this.state.config.speed }
                        initValues = { this.props.counterDefaultVal.speed }
                        increment = { this.increment }
                        decrement = { this.decrement }
                    />
                    <TeslaCounter
                        currentValue = { this.state.config.temperature }
                        initValues = { this.props.counterDefaultVal.temperature }
                        increment = { this.increment }
                        decrement = { this.decrement }
                    />
                    <TeslaClimate
                        value = { this.state.config.climate }
                        limit = { this.state.config.temperature > 10 }
                        handleChangeClimate = { this.handleChangeClimate }
                    />
                    <TeslaWheels
                        value = { this.state.config.wheels }
                        handleChangeWheels = { this.handleChangeWheels }
                    />
                </div>
                <TeslaNotice /> 
            </form>
         );
    }
}
 
export default TeslaBattery;