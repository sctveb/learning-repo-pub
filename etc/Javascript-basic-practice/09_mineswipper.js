var tbody = document.querySelector('#table tbody');
var dataset = [];
var stopflag = false;
var opened = 0;
var code = {
    o: -1,
    q: -2,
    f: -3,
    fm: -4,
    qm: -5,
    m: 1,
    n: 0
};
document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    dataset = [];
    document.querySelector('#result').textContent = '';
    stopflag = false;
    opened = 0;    
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    
    // 폭탄 랜덤 값 생성
    var candidate = Array(hor * ver).fill().map((content,index) => {
        return index;
    });
    var shaffle = [];
    while(candidate.length > hor * ver - mine) {
        var move = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shaffle.push(move);
    }
    // console.log(shaffle);

    // 테이블 만들기
    for (var i = 0; i < ver; i += 1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j += 1) {
            arr.push(code.n);
            var td = document.createElement('td');
            // 오른쪽 클릭 작업
            td.addEventListener('contextmenu', (e) => {
                if (stopflag) {
                    return;
                }
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode;
                var parentBody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentBody.children, parentTr);
                var row = Array.prototype.indexOf.call(parentTr.children,e.currentTarget);              
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.classList.add('flag');
                    e.currentTarget.textContent = "!";
                    if (dataset[col][row] === code.m) {
                        dataset[col][row] = code.fm;
                    } else {
                        dataset[col][row] = code.f;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    e.currentTarget.textContent = "?";
                    if (dataset[col][row] === code.fm) {
                        dataset[col][row] = code.qm;
                    } else {
                        dataset[col][row] = code.q;
                    }            
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if(dataset[col][row] === code.qm){
                        e.currentTarget.textContent = 'X';
                        dataset[col][row] = code.m;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[col][row] = code.n;
                    }
                }
                console.log(dataset[col][row]);               
            });
            // 왼쪽 클릭시 폭발 유무
            td.addEventListener('click', (e) => {
                if (stopflag) {
                    return;
                }
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode;
                var parentBody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentBody.children, parentTr);
                var row = Array.prototype.indexOf.call(parentTr.children,e.currentTarget);
                if(dataset[col][row] === code.o) {
                    return;
                }
                //클릭시
                e.currentTarget.classList.add('opened');
                opened++;                
                if (e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = "펑"; 
                    document.querySelector('#result').textContent = '실패';
                    stopflag = true;          
                } else {
                    // 폭발하지 않으면 주변 지뢰 개수 표시
                    dataset[col][row] = code.o;
                    var around = [dataset[col][row-1],dataset[col][row+1]];
                    if (dataset[col-1]) {
                        around = around.concat([dataset[col-1][row-1],dataset[col-1][row],dataset[col-1][row+1]]);
                    }
                    if (dataset[col+1]) {
                        around = around.concat([dataset[col+1][row-1],dataset[col+1][row],dataset[col+1][row+1]]);
                    }
                    var nearBomb = around.filter((v) => {
                            return [code.m,code.qm,code.fm].includes(v);
                        }).length;
                    e.currentTarget.textContent = nearBomb || '';
                    if (nearBomb === 0) {
                        // 주변 8칸 동시 open(재귀 함수)
                        console.log('주변을 연다');
                        var nearSide = [];
                        if (tbody.children[col-1]) {
                            nearSide = nearSide.concat([tbody.children[col-1].children[row-1],
                                tbody.children[col-1].children[row],
                                tbody.children[col-1].children[row+1]]);
                        };
                        nearSide = nearSide.concat([tbody.children[col].children[row-1],
                            tbody.children[col].children[row+1]]);
                        if (tbody.children[col+1]) {
                            nearSide = nearSide.concat([tbody.children[col+1].children[row-1],
                                tbody.children[col+1].children[row],
                                tbody.children[col+1].children[row+1]]);
                        };
                        // console.log(nearSide);
                        nearSide.filter((v) => {
                            return !!v;
                        }).forEach((side) => {
                            var parentTr = side.parentNode;
                            var parentBody = side.parentNode.parentNode;
                            var sideCol = Array.prototype.indexOf.call(parentBody.children, parentTr);
                            var sideRow = Array.prototype.indexOf.call(parentTr.children, side); 
                            if (dataset[sideCol][sideRow] !== code.o) {
                                side.click();
                            }                           
                        });
                    }
                }
                console.log(opened,"+", hor * ver - mine);
                if(opened === hor * ver - mine){
                    stopflag = true;
                    document.querySelector('#result').textContent = '승리';
                }              
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //지뢰 심기
    for (var k = 0; k < shaffle.length; k++) {
        var vertial = Math.floor(shaffle[k]/ ver);
        var horizon = shaffle[k] % ver;
        console.log(vertial, horizon);
        tbody.children[vertial].children[horizon].textContent = 'X';
        dataset[vertial][horizon] = code.m;
    }
    
    // console.log(dataset);
});

//currentTarget : event listener가 달린 부분
//target : event가 실제로 발생하는 부분