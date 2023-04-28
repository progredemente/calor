import { Component } from "react";
import './LegendHorizontal.css';
import { getColor } from './common';

class LegendHorizontal extends Component {
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
        this.prevUpperTouch = null;
        this.prevLowerTouch = null;
        this.prevFrameTouch = null
    }
    componentDidMount() {
        this.props.upperLimit(this.state.upperLimit);
        this.props.lowerLimit(this.state.lowerLimit);
    }

    dragUpperLimit = (drag) => {
        this.setState({draggingUpperLimit: drag}, () => {
            if(!drag) {
                this.props.upperLimit(this.state.upperLimit);
                this.prevUpperTouch = null;
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
                this.prevLowerTouch = null;
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

    touchMoveUpperLimit = (evt) => {
        const touch = evt.touches[0];
        if(this.prevUpperTouch) {
            const movement = -1 * (touch.pageX - this.prevUpperTouch.pageX);
            this.moveUpperLimit(movement);
        }
        this.prevUpperTouch = touch;
    }

    touchMoveLowerLimit = (evt) => {
        const touch = evt.touches[0];
        if(this.prevLowerTouch) {
            const movement = -1 * (touch.pageX - this.prevLowerTouch.pageX);
            this.moveLowerLimit(movement);
        }
        this.prevLowerTouch = touch;
    }

    touchMoveFrame = (evt) => {
        const touch = evt.touches[0];
        if(this.prevFrameTouch) {
            const movement = -1 * (touch.pageX - this.prevFrameTouch.pageX);
            this.moveFrame(movement);
        }
        this.prevFrameTouch = touch;
    }

    render() {
        return (
            <div
                className="legend-horizontal"
                style={{
                    "--upper": `${this.state.upperLimit}px`,
                    "--lower": `${this.state.lowerLimit}px`
                }}
            >
                <div
                    className="frame-horizontal"
                    onTouchStart={() => this.dragFrame(true)}
                    onTouchMove={(evt) => this.touchMoveFrame(evt)}
                    onTouchEnd={() => this.dragFrame(false)}
                ></div>
                <div
                    className="cursor-horizontal"
                    style={{
                        "--distance": `${this.state.upperLimit}px`,
                        backgroundColor: getColor(this.state.upperLimit),
                        color: this.state.upperLimit > 15 ? "black" : "white"
                    }}
                    onTouchStart={() => this.dragUpperLimit(true)}
                    onTouchMove={(evt) => this.touchMoveUpperLimit(evt)}
                    onTouchEnd={() => this.dragUpperLimit(false)}
                >{this.props.maxTemperature}°</div>
                <div
                    className="cursor-horizontal"
                    style={{
                        "--distance": `${this.state.lowerLimit}px`,
                        backgroundColor: getColor(this.state.lowerLimit),
                        color: this.state.lowerLimit > 15 ? "black" : "white"
                    }}
                    onTouchStart={() => this.dragLowerLimit(true)}
                    onTouchMove={(evt) => this.touchMoveLowerLimit(evt)}
                    onTouchEnd={() => this.dragLowerLimit(false)}
                >{this.props.minTemperature}°</div>
            </div>
        );
    }
}

export default LegendHorizontal;