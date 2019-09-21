import React from 'react';
import style from './box2.module.css';
import cn from 'classnames';

function Box2({size}) {
    if (size === 'big') {
        return <div className={cn(style.box, style.big)}>큰 박스</div>
    }
    else {
        return <div className={cn(style.box, style.small)}>작은 박스</div>
    }
}

export default Box2