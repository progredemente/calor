import React, { Component } from "react";
import './LegendVertical.css';
import { getColor } from './common';

class LegendVertical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upperLimit: 25,
            draggingUpperLimit: false,
            lowerLimit: 110,
            draggingLowerLimit: false,
            draggingFrame: false
        }
        this.margin = 75;
    }
    componentDidMount() {
        this.props.upperLimit(this.state.upperLimit);
        this.props.lowerLimit(this.state.lowerLimit);
    }

    dragUpperLimit = (drag) => {
        this.setState({draggingUpperLimit: drag}, () => {
            if(!drag) {
                this.props.upperLimit(this.state.upperLimit);
            }
        });
    }

    moveUpperLimit = (movement) => {
        if(this.state.draggingUpperLimit) {
            const upperLimit = Math.min(this.state.lowerLimit - this.margin, Math.max(0, this.state.upperLimit + movement));
            this.setState({upperLimit});
        }
    }

    dragLowerLimit = (drag) => {
        this.setState({draggingLowerLimit: drag}, () => {
            if(!drag) {
                this.props.lowerLimit(this.state.lowerLimit);
            }
        });
    }

    moveLowerLimit = (movement) => {
        if(this.state.draggingLowerLimit) {
            const lowerLimit = Math.min(400, Math.max(this.state.upperLimit + this.margin, this.state.lowerLimit + movement));
            this.setState({lowerLimit});
        }
    }

    dragFrame = (drag) => {
        this.setState({draggingFrame: drag}, () => {
            if(!drag) {
                this.props.upperLimit(this.state.upperLimit);
                this.props.lowerLimit(this.state.lowerLimit);
            }
        });
    }

    moveFrame = (movement) => {
        if(this.state.draggingFrame && this.state.lowerLimit + movement <= 400 && this.state.upperLimit + movement >= 0){
            this.setState({lowerLimit: this.state.lowerLimit + movement, upperLimit: this.state.upperLimit + movement});
        }
    }

    render() {
        return (
            <div
                className="legend-vertical"
                style={{
                    "--upper": `${this.state.upperLimit}px`,
                    "--lower": `${this.state.lowerLimit}px`
                }}
            >
                <div
                    className="frame-vertical"
                    onMouseDown={() => this.dragFrame(true)}
                    onMouseMove={(evt) => this.moveFrame(evt.movementY)}
                    onMouseUp={() => this.dragFrame(false)}
                    onMouseOut={() => this.dragFrame(false)}
                ></div>
                <div
                    className="cursor-vertical"
                    style={{
                        "--distance": `${this.state.upperLimit}px`,
                        backgroundColor: getColor(this.state.upperLimit),
                        color: this.state.upperLimit > 15 ? "black" : "white"
                    }}
                    onMouseDown={() => this.dragUpperLimit(true)}
                    onMouseMove={(evt) => this.moveUpperLimit(evt.movementY)}
                    onMouseUp={() => this.dragUpperLimit(false)}
                    onMouseOut={() => this.dragUpperLimit(false)}
                >{this.props.maxTemperature}°</div>
                <div
                    className="cursor-vertical"
                    style={{
                        "--distance": `${this.state.lowerLimit}px`,
                        backgroundColor: getColor(this.state.lowerLimit),
                        color: this.state.lowerLimit > 15 ? "black" : "white"
                    }}
                    onMouseDown={() => this.dragLowerLimit(true)}
                    onMouseMove={(evt) => this.moveLowerLimit(evt.movementY)}
                    onMouseUp={() => this.dragLowerLimit(false)}
                    onMouseOut={() => this.dragLowerLimit(false)}
                >{this.props.minTemperature}°</div>
            </div>
        );
    }
}

export default LegendVertical;