var html_body = document.body;
var html_result = document.createElement('div');
var html_table = document.createElement('table');
var html_column = [];
var html_row = [];
var turn = 'X';
// var column_check, row_check;

// var full;

function full_check(column_check, row_check) {
    // 3칸 찼나?
    var full = false;
    // 가로줄
    if (html_row[column_check][0].textContent === turn && html_row[column_check][1].textContent === turn && html_row[column_check][2].textContent === turn) {
        full = true;
    }
    // 세로줄
    if (html_row[0][row_check].textContent === turn && html_row[1][row_check].textContent === turn && html_row[2][row_check].textContent === turn) {
        full = true;
    }
    // 대각선        
    if (html_row[1][1].textContent === turn && ((html_row[0][0].textContent === turn && html_row[2][2].textContent === turn) || (html_row[0][2].textContent === turn && html_row[2][0].textContent === turn))) {
        full = true;
    }
    return full;
}

function reset_game(draw) {
    if (draw) {
        html_result.textContent = '무승부';
    } else {
    html_result.textContent = turn + '의 승리';
    setTimeout(() => {
        html_row.forEach((a) => {
            a.forEach((b) => {
                b.textContent = '';
            });
        });
    }, 1000);
    turn = 'X';
    }
}

var html_callback = function (e) {
    if (turn === 'O'){
        return;
    }
    var column_check = html_column.indexOf(e.target.parentNode);
    var row_check = html_row[column_check].indexOf(e.target);
    if (html_row[column_check][row_check].textContent !== '') {
        console.log('빈칸아님');
    } else {
        console.log('빈칸');
        html_row[column_check][row_check].textContent = turn;
        var full = full_check(column_check, row_check);
        var candiate_com = [];
                html_row.forEach((col) => {
                    col.forEach((row) => {
                        candiate_com.push(row);
                    });
                });
        candiate_com = candiate_com.filter((row) => { return !row.textContent });
        // full_check();       
        console.log(full);
        if (full) {
            reset_game(false);
        } else if (candiate_com.length === 0) {
            reset_game(true);
        } else {
            if (turn === 'X') {
                turn = 'O';
                html_result.textContent = turn + '의 차례입니다';
            }
            // 컴퓨터 턴
            setTimeout(() => {
                // 빈 칸 중 하나를 고른다                
                
                var choice_com = candiate_com[Math.floor(Math.random() * candiate_com.length)];
                choice_com.textContent = turn;
                // 컴퓨터 승리 확인
                var column_check = html_column.indexOf(choice_com.parentNode);
                var row_check = html_row[column_check].indexOf(choice_com);
                var full = full_check(column_check, row_check);
                // full_check();
                if (full) {
                    reset_game();
                } else {
                    // 턴을 나에게 넘긴다
                    turn = 'X';
                    html_result.textContent = turn + '의 차례입니다';
                }                
            }, 1000);
        }
    }
};

for (var i = 0; i < 3; i += 1) {
    var html_tr = document.createElement('tr');
    html_column.push(html_tr);
    html_row.push([]);
    for (var j = 0; j < 3; j += 1) {
        var html_td = document.createElement('td');
        html_td.addEventListener('click', html_callback);
        html_tr.appendChild(html_td);
        html_row[i].push(html_td);
    }
    html_table.appendChild(html_tr);
}
html_body.appendChild(html_table);
html_result.textContent = turn + '의 차례입니다';
html_body.append(html_result);
console.log(html_column, html_row);

