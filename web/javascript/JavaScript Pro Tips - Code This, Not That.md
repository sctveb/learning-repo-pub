# JavaScript Pro Tips - Code This, Not That

#### by [Fireship](https://youtu.be/Mus_vwhTCq0)



### 1. 

```javascript
const foo = { name: 'foo', age: 30, nervous: false };
const bar = { name: 'bar', age: 25, nervous: true };
const baz = { name: 'baz', age: 11, nervous: false };

// Bad Code
console.log(foo);
console.log(bar);
console.log(baz);

// Good Code
console.log("%c User Info", 'color: orange; font-weight: bold;');
console.log({ foo, bar, baz });
console.tabe([ foo, bar, baz ]);
```



### 2.

```javascript
// Console.time
console.time('looper');

let i = 0;
while (i < 1000000) { i++ }

console.timeEnd('looper');

//  Console.trace

function foo() {
  function bar() {
    console.trace();
  }
  bar();
}

foo();
```



### 3.

```javascript
const turtle = {
    name: 'Bob',
    legs: 4,
    shell: true,
    type: 'amphibious',
    meal: 10,
    diet: 'berries'
}

// Bad Code
function feed1(animal) {
    return `Feed ${animal.name} ${animal.meal} kilos of ${animal.diet}`
}

// Good Code
function feed2({ name, meal, diet }) {
    return `Feed ${name} ${meal} kilos of ${diet}`
}

function feed3(animal) {
    const { name, meal, diet } = animal;
    return `Feed ${name} ${meal} kilos of ${diet}`
}
```



### 4.

```javascript
const horse = {
  name: 'Topher',
  size: 'large',
  skills: ['jousting', 'racing'],
  age: 7
};

function hourseAge(str, age) {
    const ageStr = age > 5 ? 'old' : 'young';
    return `${str[0]}${ageStr} at ${age} years`
}
```



### 5.

```javascript
const pikachu = { name: 'Pikachu' };
const stats = { hp: 40, attack: 60, defense: 45 };

// Bad Code
pikachu['hp'] = stats.hp;
pikachu['attack'] = stats.attack;
pikachu['defense'] = stats.defense;

const lv10 = Object.assign(pikachu, stats);
const lv11 = Object.assign(pikachu, { hp: 45 });

// Good Code
const lv10 = { ...pikachu, ...stats };
const lv11 = { ...pikachu, hp: 45 };
```



### 6.

```javascript
let pokemon = ['Arbok', 'Raichu', 'Sandshrew'];

// Bad Code
pokemon.push('Bulbasaur');
pokemon.push('Metapod');
pokemon.push('Weedle');

// Good Code : push
pokemon = [...pokemon, 'Bulbasaur', 'Metapod', 'Weedle' ]

// Good Code : unshift
pokemon = [ 'Bulbasaur', 'Metapod', 'Weedle', ...pokemon ]
```



### 7.

```javascript
const orders = [500, 30, 99, 15, 223];

// Bad Code
const total = 0;
const withTax = [];
const highValue = [];
for (i = 0; i < orders.length; i++) {
    // Reduce
    total += orders[i];
    
    // Map
    withTax.push(orders[i] * 1.1);
    
    // Filter
    if (orders[i] > 100) {
        highValue.push(orders[i])
    }
}

// Good Code

/// Reduce
const total = orders.reduce((acc, cur) => acc + cur);
/// Map
const withTax = orders.map(v => v * 1.1);
/// Filter
const highValue = orders.filter(v => v > 100);
```



### 8.

```javascript
const random = () => {
    return Promise.resolve(Math.random())
}

// Promise
const sumRandomAsyncNums = async() => {
    let first;
    let second;
    let third;
    return random()
    .then(v => {
        first = v;
        return random();
    })
    .then(v => {
        second = v;
        return random();
    })
    .then(v => {
        third = v;
        return first + second + third;
    })
    
}

// async/await
const sumRandomAsyncNums = async() => {
    const first = await random();
    const second = await random();
    const third = await random();
    
    console.log(`Result ${first + second + third}`);
}
```

