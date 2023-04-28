import { Component } from 'react';
import './App.css';
import LegendHorizontal from './LegendHorizontal';
import LegendVertical from './LegendVertical';
import Map from './Map';
import spain from './spain.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upperLimit: 0,
            lowerLimit: 400
        }
        this.pageLanguage = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
        const temperatures = spain.paths.map(p => p.temperature);
        this.maxTemperature = Math.max(...temperatures);
        this.minTemperature = Math.min(...temperatures);
        this.width = Math.min(1000, window.innerWidth);
    }

    render() {
        const isTouchScreen = matchMedia('(pointer: coarse)').matches;
        return (
        <div className="app">
            <div
                className="title"
            >
                <svg
                    width={420}
                    height={150}
                    viewBox='0 0 500 200'
                >
                    <defs>
                    <pattern
                        id="fire"
                        patternUnits="userSpaceOnUse"
                        width="100"
                        height="700"
                        patternTransform="scale(.25)"
                    >
                        <g>
                            <rect width="100" height="700" style={{fill: "#f2de00"}}/>
                            <path
                                d="M 2.8690239e-6,7.0186115e-6 H 99.999997 L 99.999994,337.50002 H -2.3957047e-6 Z"
                                style={{
                                    fill: "#2e2e2e",
                                    stroke: "none"
                                }}
                            />
                            <path
                                d="m 99.999996,262.50002 c -24.999999,-1e-5 -2e-6,-75 -49.999999,-100 -12.5,74.99999 -49.9999993957047,50 -49.9999993957047,100 v 75.00001 H 99.999996 Z"
                                style={{
                                    fill: "#f20000",
                                    stroke: "none"
                                }}
                            />
                            <path
                                d="m 99.999996,312.50003 c 0,-25 -49.999999,-50.00001 -49.999999,-75.00001 -49.9999993957047,25 0,50.00001 -49.999999014235,75.00001 l -1.6e-6,25 H 99.999996 Z"
                                style={{
                                    fill: "#f29100",
                                    stroke: "none"
                                }}
                            />
                            <path
                                d="M -3.614235e-6,337.50003 C 24.999997,312.50002 49.999997,325.00002 49.999997,287.50003 c 25,0 25,50 49.999996,50 l 10e-7,12.49999 H -2.3957047e-6 Z"
                                style={{
                                    fill: "#f2de00",
                                    stroke: "none"
                                }}
                            />
                        </g>
                    </pattern>
                    </defs>
                    <text
                        x="50%"
                        y="70%"
                        fontSize={125}
                        fontWeight={"bold"}
                        style={{
                            stroke: 'black',
                            strokeWidth: 7,
                        }}
                        textAnchor='middle'
                    >¡CALOR!</text>
                    <text
                        x="50%"
                        y="70%"
                        fontSize={125}
                        fontWeight={"bold"}
                        style={{
                            stroke: 'black',
                            strokeWidth: 20,
                            fill: 'url(#fire)',
                            paintOrder: 'stroke markers fill'
                        }}
                        textAnchor='middle'
                    >¡CALOR!</text>
                </svg>
                <div className="subtitle">
                    {
                        this.pageLanguage === "es" &&
                        <span>Una aplicación didáctica contra la manipulación</span>
                    }
                    {
                        this.pageLanguage === "en" &&
                        <span>A didactic application against manipulation</span>
                    }
                </div>
                <div className="signature">
                    {
                        this.pageLanguage === "es" &&
                        <span>por </span>
                    }
                    {
                        this.pageLanguage === "en" &&
                        <span>by </span>
                    }
                    <a href="/" target="_blank">progredemente</a>
                </div>
            </div>
            <div className="container">
                <div className="legend-container">
                    <div className="legend-title">
                        {
                            this.pageLanguage === "es" &&
                            <span>Mueve el rango de colores</span>
                        }
                        {
                            this.pageLanguage === "en" &&
                            <span>Move the color range</span>
                        }
                    </div>
                    {
                        !isTouchScreen &&
                        <LegendVertical
                            upperLimit={(upperLimit) => this.setState({upperLimit})}
                            lowerLimit={(lowerLimit) => this.setState({lowerLimit})}
                            maxTemperature={this.maxTemperature}
                            minTemperature={this.minTemperature}
                        />
                    }
                    {
                        isTouchScreen &&
                        <LegendHorizontal
                            upperLimit={(upperLimit) => this.setState({upperLimit})}
                            lowerLimit={(lowerLimit) => this.setState({lowerLimit})}
                            maxTemperature={this.maxTemperature}
                            minTemperature={this.minTemperature}
                        />
                    }
                </div>
                <Map
                    map={spain}
                    upperLimit={this.state.upperLimit}
                    lowerLimit={this.state.lowerLimit}
                    maxTemperature={this.maxTemperature}
                    minTemperature={this.minTemperature}
                    width={this.width}
                />
            </div>
        </div>
        )
    }
}

export default App;
