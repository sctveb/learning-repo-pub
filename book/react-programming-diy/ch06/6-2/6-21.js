import produce from 'immer';

const person = { name: 'mike', age: 22 };
const newPerson = produce(person, draft => {
    draft.age = 32;
})