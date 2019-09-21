import React from 'react';
import styled from 'styled-components';

// const BoxCommon = styled.div`
// height: 50px;
// background-color: #aaaaaa;
// `
// const BoxBig = BoxCommon.extend`
// width: 200px;
// `
// const BoxSmall = BoxCommon.extend`
// width: 100px;
// `

// function Box4({size}) {
//     if (size === 'big') {
//         return <BoxBig>큰 박스</BoxBig>
//     }
//     else {
//         return <BoxSmall>작은 박스</BoxSmall>
//     }
// }

const BoxCommon = styled.div`
width: ${props => (props.isBig ? 200 : 100)}px;
height: 50px;
background-color: brown;
`;

function Box4({size}) {
    const isBig = size === 'big';
    const label = isBig ? '큰 박스' : '작은 박스';
    return <BoxCommon isBig={isBig}>{label}</BoxCommon>
}


export default Box4