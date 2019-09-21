import React from 'react';
import style from './box3.module.scss';
import cn from 'classnames';

function Box3({size}) {
    if (size === 'big') {
        return <div className={cn(style.box, style.big)}>큰 박스</div>
    }
    else {
        return <div className={cn(style.box, style.small)}>작은 박스</div>
    }
}

export default Box3