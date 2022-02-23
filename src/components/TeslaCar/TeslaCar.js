import "./TeslaCar.css";

// This is a component that renders the image of a tesla car with animations
const TeslaCar = (props) => {
    return ( 
        <div className="tesla-car tesla-car-animation">
            <div className = {`tesla-wheels tesla-wheel--animation--${props.wheelsize === 19 ? 19 : 21}`}>
                <div className = {`tesla-wheel tesla-wheel--front tesla-wheel--${props.wheelSize}`}></div>
                <div className = {`tesla-wheel tesla-wheel--rear tesla-wheel--${props.wheelSize}`}></div>
            </div>
        </div>
    );
}
 
export default TeslaCar;