import { Component } from "react";
import { getColor } from './common';

class Map extends Component {


    getColorIndex(temperature) {
        const temperatureInPercentage = (temperature - this.props.minTemperature) / (this.props.maxTemperature - this.props.minTemperature);
        return this.props.lowerLimit - (this.props.lowerLimit - this.props.upperLimit) *  temperatureInPercentage;
    }

    render(){
        return(
            <svg
                className="map"
                viewBox={this.props.map.viewBox}
                style={{width: `${this.props.width}px`, height: "auto"}}
            >
                <rect
                    width={this.props.map.width}
                    height={this.props.map.height}
                    style={{fill: "#006bb7"}}
                />
                {
                    this.props.map.other.map(p => {
                        return (
                            <path
                                id={p.id}
                                d={p.path}
                                style={{fill: "gray"}}
                            />
                        )
                    })
                }
                {
                    this.props.map.separators.map(p => {
                        return (
                            <path
                                id={p.id}
                                d={p.path}
                                style={{stroke: "black", fill: "none", strokeWidth: this.props.map.strokeWidth}}
                            />
                        )
                    })
                }
                {
                    this.props.map.paths.map(p => {
                        const color = getColor(this.getColorIndex(p.temperature));
                        return (
                            <path
                                id={p.id}
                                d={p.path}
                                style={{
                                    stroke: color,
                                    fill: color,
                                    strokeWidth: this.props.map.strokeWidth
                                }}
                            />
                        )
                    })
                }
                {
                    this.props.map.paths.map(p => {
                        return (
                            <text
                                style={{
                                    fontSize: this.props.map.fontSize,
                                    fill: this.getColorIndex(p.temperature) > 15 ? "black" : "white"
                                }}
                                x={p.textPosition[0]}
                                y={p.textPosition[1]}
                            >
                                {p.temperature}°
                            </text>
                        )
                    })
                }
            </svg>
        )
    }
}

export default Map;