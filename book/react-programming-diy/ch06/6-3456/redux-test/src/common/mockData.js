const friends = [
    { name: "엠비션", age: 1 },
    { name: "자동", age: 10 },
    { name: "똘삼", age: 15 },
    { name: "홍진호", age: 22 },
];

const timelines = [
    { desc: "나는 장풍을 했다", likes: 0 },
    { desc: "겨울배가 맛있단다", likes: 10 },
    { desc: "인게임중에는 반응할 수가 없단다", likes: 33 },
    { desc: "도망가지마! 맞서싸워!", likes: 644 },
];

function makeDataGenerator(items) {
    let itemIndex = 0;
    return function getNextData() {
        const item = items[itemIndex % items.length];
        itemIndex += 1;
        return {...item, id: itemIndex};
    }
}

export const getNextFriend = makeDataGenerator(friends);
export const getNextTimeline = makeDataGenerator(timelines);