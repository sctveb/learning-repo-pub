const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();

expect(sayHello1('홍길동')).toBe(
    `홍길동님 안녕하세요. 지금은 ${hour}시 ${minute}분입니다.`,
);

expect(sayHello2('홍길동', '11:30')).toBe(
    '홍길동님 안녕하세요. 지금은 11시 30분입니다.'
)