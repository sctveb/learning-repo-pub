var html_body = document.body;
var num_can;
var num_array;

function num_pop () {
    num_can = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    num_array = [];
    for (var i = 0; i < 4; i++) {
        var put = num_can.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        num_array.push(put);
    }
}
num_pop();


// for (var i = 0; i < 4; i += 1) {
//     var put = num_can.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
//     num_array.push(put);

    // var num_pop = num_can.pop();
    // var num_shift = num_can.shift();

    // num_array.push(num_pop);
    // num_array.unshift(num_shift);
// }

var html_result = document.createElement('h1');
html_body.append(html_result);
var html_form = document.createElement('form');
html_body.append(html_form);
var html_input = document.createElement('input');
html_input.type = 'text';
html_input.maxLength = 4;
html_form.append(html_input);
var html_button = document.createElement('button');
html_button.textContent = '입력';
html_form.append(html_button);

var wrong = 0;
html_form.addEventListener('submit', (e) => {
    e.preventDefault();
    var answer = html_input.value;
    console.log(num_array, answer);
    if (answer === num_array.join('')) {
        html_result.textContent = "홈런";
        html_input.value = '';
        html_input.focus();
        num_pop();        
        wrong = 0;
    } else {
        var answer_array = answer.split('');
        var strike = 0;
        var ball = 0;
        wrong += 1;
        console.log('답이 틀리면');
        if (wrong > 4) {
            html_result.textContent = "10회 넘음, 실패! 답: " + num_array.join(',');
            html_input.value = '';
            html_input.focus();
            num_pop();
            wrong = 0;
        } else {
            for (var i = 0; i < 5; i++) {
                if (Number(answer_array[i]) === num_array[i]) {
                    console.log('같은 자리')
                    strike += 1;
                } else if (num_array.indexOf(Number(answer_array[i])) > -1) {
                    ball += 1;
                }
            }
            html_result.textContent = "스트라이크: " + strike + ", 볼: " + ball + "입니다.";
            html_input.value = '';
            html_input.focus();
            console.log(wrong);
        }
    }
})