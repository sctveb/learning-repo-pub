import React from 'react';
import style from './button3.module.scss';
import cn from 'classnames';

function Button3 ({size}) {
    if (size === 'big') {
        return <button className={cn(style.button, style.big)}>큰 버튼</button>
    }
    else {
        return <button className={cn(style.button, style.small)}>작은 버튼</button>
    }
}

export default Button3
console.log(style)