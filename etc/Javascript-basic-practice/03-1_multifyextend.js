var num1 = Math.floor(Math.random() * 9 ) + 1;
var num2 = Math.floor(Math.random() * 9 ) + 1;
var result = num1 * num2;

var html_body = document.body;
var html_word = document.createElement('div');
html_word.textContent = String(num1) + ' x ' + String(num2) + '는?';
document.body.append(html_word);

var html_form = document.createElement('form');
document.body.append(html_form);

var html_input = document.createElement('input');
html_form.append(html_input);
html_input.type = 'number';

var html_button = document.createElement('button');
html_button.textContent = '입력';
html_form.append(html_button);

var html_result = document.createElement('div');
document.body.append(html_result);

html_form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(html_result, html_input.value)
    if(result === Number(html_input.value)){
        html_result.textContent = "정답";
        num1 = Math.ceil(Math.random() * 9 );
        num2 = Math.ceil(Math.random() * 9 );
        result = num1 * num2;
        html_word.textContent = String(num1) + ' x ' + String(num2) + '는?';
        html_input.value = '';
        html_input.focus();
        
    } else {
        html_result.textContent = "오답";
        html_input.focus();
    }
})


// while(true){
//     var num1 = Math.floor(Math.random() * 9 ) + 1;
//     var num2 = Math.floor(Math.random() * 9 ) + 1;
//     var result = num1 * num2;
//     var con = true;
//     while(con) {
//         var answer = prompt(String(num1) + ' x ' + String(num2) + '는?');
//         if(result === Number(answer)) {
//             alert('correct');
//             con = false;
//         } else {
//             alert('wrong');
//         }
//     }
// }

