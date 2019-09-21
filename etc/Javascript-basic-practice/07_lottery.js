
var map = Array(45).fill().map((value, index) => {
    return index + 1;
})

var shaffle = [];
while(map.length > 0) {
    var move = map.splice(Math.floor(Math.random() * map.length), 1)[0];
    shaffle.push(move);
}
var bouns = shaffle[shaffle.length-1];
var correct = shaffle.slice(0,6).sort((p,c)=>{ return p - c;});
console.log(bouns,"+",correct);
// var result = document.getElementById('result');
var result = document.querySelector('#result');


// for (var i = 0; i < correct.length; i += 1) {
//     var ball = document.createElement('div');
//     ball.textContent = correct[i];
//     result.appendChild(ball);
// }

// var bball_html = document.getElementsByClassName('bball')[0];
// var ball = document.createElement('div');
// ball.textContent = bouns;
// bball_html.appendChild(ball);

function ballmake(num, res) {
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px'
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    ball.fontSize = '12px';
    ball.className = 'ballid' + num;
    var color;
    if(num <= 10) {
        color = 'red';
    } else if(num <= 20) {
        color = 'orange';
    } else if(num <= 30) {
        color = 'yellow';
    } else if(num <= 40) {
        color = 'blue';
    } else {
        color = 'green';
    }
    ball.style.background = color;
    res.appendChild(ball);
}

// setTimeout(() => {
//     ballmake(correct[0],result);    
// }, 1000);
// setTimeout(() => {
//     ballmake(correct[1],result);
// }, 2000);
// setTimeout(() => {
//     ballmake(correct[2],result);
// }, 3000);
// setTimeout(() => {
//     ballmake(correct[3],result);
// }, 4000);
// setTimeout(() => {
//     ballmake(correct[4],result);
// }, 5000);
// setTimeout(() => {
//     ballmake(correct[5],result);
// }, 6000);

for(var i = 0; i < correct.length; i++){
    (function closer(j) {
        setTimeout(() => {
            ballmake(correct[j],result);    
        }, (j + 1) * 1000);
    })(i);
}
setTimeout(() => {
    // var bball_html = document.getElementsByClassName('bball')[0];
    var bball_html = document.querySelector('.bball');
    ballmake(bouns, bball_html);     
}, 7000);
