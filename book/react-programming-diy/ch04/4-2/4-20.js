const counter = {
    value: 0,
    increase: function() {
        this.value++;
    },
};
counter.increase();
console.log(counter.value) // 1
const incFunc1 = counter.increase;
incFunc1();
console.log(counter.value) // 1
// 함수를 외부로 전달해서 호출하면 increase 함수의 this 객체가 counter 객체라고 보장할 수 없음
const incFunc2 = counter.increase.bind(counter); // increase 함수의 this 객체를 counter 객체로 고정
incFunc2();
console.log(counter.value) // 2