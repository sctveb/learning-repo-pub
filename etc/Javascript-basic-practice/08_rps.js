var computer = 0;
var dict = {
    rock: '0',
    scissor: '-150px',
    paper: '-300px'
};
// console.log(Object.entries(dict))
// findIndex도 있다
function find_select(computer) {
    return Object.entries(dict).find((y) => {
        // console.log(y);
        return y[1] === computer;
    })[0];
}
var interval;
function intervalmaker() {
    interval = setInterval(() => {
        if(computer === dict.rock) {
            computer = dict.scissor;
        } else if (computer === dict.scissor) {
            computer = dict.paper; 
        } else {
            computer = dict.rock;
        }
        document.querySelector('.computer').style.background = `url('http://placehold.it/450x450.jpg?text=RRRRRRRRRRPPPPPPPPPPSSSSSSSSSS')` + computer + ' 0';
    }, 100);
} 
intervalmaker();

var score = {
    scissor: 1,
    rock: 0,
    paper: -1,
}

document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(interval);
        var my_select = this.textContent;
        var my_score = score[my_select];
        var com_score = score[find_select(computer)];
        var result_score = my_score - com_score;
        console.log(my_select, find_select(computer));
        setTimeout(()=> {
            intervalmaker();            
        },1000);
        if (result_score === 0){
            console.log('draw');
        // } else if (result_score === -1 | result_score === 2) {
        } else if ([-1,2].includes(result_score)) {
            console.log('win');
        } else {
            console.log('lose');
        }
    });
})

