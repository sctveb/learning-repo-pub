import { connect } from 'react-redux';
import store from "../redux/store";
import * as TestActions from "../redux/testCase/state";
import { getNextTest } from "../redux/common/mockData";
import TestList from '../components/testList';

class Index extends React.Component {
    onClickAdd = () => {
        const test = getNextTest();
        this.props.addTest(test);
    }
    render() {
        const {tests} = this.props;
        return (
            <React.Fragment>
                <div className="header">
                    <h1>Devpools</h1>
                    <p>개발자들의 놀이터</p>
                </div>
                <div className="nav">
                    <a href="#">Alex</a>
                    <a href="#">sbad</a>
                    <a href="#">aerar</a>
                </div>
                <div className="row">
                    <div className="left">
                        <div className="card">
                            <h2>[Github Trends] 2018년 6월 깃허브 트랜드</h2>
                            <h5>Github Trends (6월 2주)</h5>
                            <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                            <h5>1. ry / deno</h5>
                            <p>이번 주에 8,792번의 스타를 받은 리포지터리다</p>
                            <button onClick={this.onClickAdd}>test 늘리기</button>
                            <TestList tests={tests}/>
                        </div>
                    </div>
                    <div className="right">
                        <div className="card">
                            <h2>개발 바보들이란</h2>
                            <div className="fakeimg" style={{ height: '100px' }}>Image</div>
                            <p>개발만 좋아하는 바보들이 모였다.</p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <h3>link: 아이고난</h3>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { tests: state.testCase.tests }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addTest: test => {
//             dispatch(addTest(test))
//         }
//     }
// };

export default connect(mapStateToProps, TestActions)(Index);