import React from 'react';
import { getNextTimeline } from "../../common/mockData";
import TimelineList from '../component/timelineList.js';
import { connect } from 'react-redux';
import { actions } from '../state';

class TimelineMain extends React.Component {
    state = {
        currentText: ""
    }
    onAdd = () => {
        const { addTimeline } = this.props;
        const timeline = getNextTimeline();
        addTimeline(timeline);
    }
    onLike = e => {
        const { timelines } = this.props;
        const id = Number(e.target.dataset.id);
        const timeline = timelines.find(item => item.id === id);
        this.props.requestLike(timeline);
    }
    onChangeText = e => {
        const text = e.currentTarget.value;
        this.props.trySetText(text);
        this.setState({ currentText: text});
    }
    render() {
        console.log("timelineMain render");
        const { timelines, isLoading, error, text } = this.props;
        const { currentText } = this.state;
        return (
            <div>
                <input type="text" value={currentText} onChange={this.onChangeText} />
                {currentText != "" && <p>current text: {currentText}</p>}
                {!!text && <p>saga text: {text}</p>}
                <br/>
                <button onClick={this.onAdd}>타임라인 추가</button>
                <TimelineList timelines={timelines} onLike={this.onLike} />
                {!!isLoading && <p>전송 중...</p>}
                {!!error && <p>에러 발생: {error}</p>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    timelines: state.timeline.timelines,
    isLoading: state.timeline.isLoading,
    error: state.timeline.error,
    text: state.timeline.text,
});

export default connect(mapStateToProps, actions)(TimelineMain);