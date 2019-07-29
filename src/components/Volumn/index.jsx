import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style';

export default class Volumn extends Component {
    constructor (props) {
        super(props);

        this.state = {
            volumnProcessBoxMove: false
        };

        this.volumnProcess = React.createRef();
        this.volumnCurrent = React.createRef();
        this.volumnItem = React.createRef();
        this.audio = React.createRef();

        this.onVolumnProcessBoxMouseDown = this.onVolumnProcessBoxMouseDown.bind(this);
        this.onVolumnProcessBoxMouseMove = this.onVolumnProcessBoxMouseMove.bind(this);
        this.onVolumnProcessBoxMouseUp = this.onVolumnProcessBoxMouseUp.bind(this);
        this.onVolumnProcessSet = this.onVolumnProcessSet.bind(this);
        this.onPlay = this.onPlay.bind(this);
    }

    onPlay () {
        this.audio.current.play();
    }
    onPause() {

    }
    onVolumnProcessSet (e) {
        // 获取当前音量调的宽度
        const volumnProcessWidth = this.volumnProcess.current.offsetWidth;
        // 获取当前点击偏移量
        let volumnOffsetWidth = e.clientX - this.volumnProcess.current.getBoundingClientRect().left;

        // 当前音量进度比例
        let volumnPercentage = 0;
        if (volumnOffsetWidth < 0) {
            volumnOffsetWidth = 0;
        }

        if (volumnOffsetWidth > volumnProcessWidth) {
            volumnOffsetWidth = volumnProcessWidth;
        }

        // 计算比例
        volumnPercentage = (volumnOffsetWidth / volumnProcessWidth).toFixed(2);

        // 设置进度条宽度
        this.volumnCurrent.current.style.width = `${volumnOffsetWidth}px`;
        // 设置进度条item
        this.volumnItem.current.style.left = `${volumnOffsetWidth - 12}px`;
        // 设置音量
        this.audio.current.volume = volumnPercentage;
    }

    onVolumnProcessBoxMouseDown (e) {
        this.setState({
            volumnProcessBoxMove: true
        })
    }

    onVolumnProcessBoxMouseMove (e) {
        const { volumnProcessBoxMove } = this.state;

        if (volumnProcessBoxMove) {
            this.onVolumnProcessSet(e);
        }
    }

    onVolumnProcessBoxMouseUp (e) {
        // const { volumnProcessBoxMove } = this.state;
        // // 为什么这里还要判断volumnProcessBoxMove是不是true
        // if (volumnProcessBoxMove) {
        //     this.setState({
        //         volumnProcessBoxMove: false
        //     })
        // }
        this.setState({
            volumnProcessBoxMove: false
        })
    }

    componentDidMount () {
        document.addEventListener('mouseup', this.onVolumnProcessBoxMouseUp, false);
        document.addEventListener('mousemove', this.onVolumnProcessBoxMouseMove, false);
    }
    componentWillUnmount () {
        document.removeEventListener('mouseup', this.onVolumnProcessBoxMouseUp, false);
        document.removeEventListener('mousemove', this.onVolumnProcessBoxMouseMove, false);
    }
    render () {
        return (
            <div className="audio-test">
                <audio ref={this.audio} src="/assets/audios/prepare_female.mp3" controls={true}></audio>
                <div className="volume-controll">
                    <div className="volume-process" ref={this.volumnProcess} onClick={this.onVolumnProcessSet}>
                        <div className="volume-current" ref={this.volumnCurrent}>
                            <div 
                                className="volume-item" ref={this.volumnItem}
                                onMouseDown={this.onVolumnProcessBoxMouseDown}
                            ></div>
                        </div>
                    </div>
                </div>
                <button onClick={this.onPlay}>播放</button>
                <button onClick={() => {
                    console.dir(this.audio.current)
                    this.audio.current.volume = 0.0;
                }}>设置音量</button>
            </div>
        )
    }
}