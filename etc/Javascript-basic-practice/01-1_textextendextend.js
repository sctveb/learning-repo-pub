var html_body = document.body;

var html_word = document.createElement('div');
html_word.textContent = '테스트';
document.body.append(html_word);

var html_form = document.createElement('form');
document.body.append(html_form);

var html_input = document.createElement('input');
html_form.append(html_input);

var html_button = document.createElement('button');
html_button.textContent = '입력';
html_form.append(html_button);

var html_result = document.createElement('div');
document.body.append(html_result);

html_button.addEventListener('click', (html_event) => {
    html_event.preventDefault();
    if(html_word.textContent[html_word.textContent.length - 1] === html_input.value[0]){
        html_result.textContent = '정답';
        html_word.textContent = html_input.value;
        html_input.value = '';
        html_input.focus();
        
    } else {
        html_result.textContent = '잘못 입력 하셨습니다';
        html_input.focus();
    }
    
});

function jsSum(num1,num2) {
    console.log(num1 + num2);
}




// var word = '테스트';
// while(true) {
//     var answer = prompt(word);
//     if(word[word.length-1] === answer[0]){
//         alert('딩동댕');
//         word = answer;
//     }else{
//         alert('땡');
//     }
// }