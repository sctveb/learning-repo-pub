while(true){
    var num1 = Math.floor(Math.random() * 9 ) + 1;
    var num2 = Math.floor(Math.random() * 9 ) + 1;
    var result = num1 * num2;
    var con = true;
    while(con) {
        var answer = prompt(String(num1) + ' x ' + String(num2) + '는?');
        if(result === Number(answer)) {
            alert('correct');
            con = false;
        } else {
            alert('wrong');
        }
    }
}

