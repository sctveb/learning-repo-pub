const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const go = (...args) => {
  return reduce((a, f) => f(a), args);
};

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const isIterable = a => a && a[Symbol.iterator];

const L = {};

L.range = function*(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = function*(f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
};

L.filter = function*(f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) yield a;
  }
};

L.filter = function*(f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
};

L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      } 
    } else {
      yield a;
    }
  }
};

L.deepflat = function *f(iter) {
  for (const a of iter) {
      if (isIterable(a)) {
          yield *f(a)
      } else {
          yield a;
      }
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));

// const map = curry((f, iter) => {
//   let res = [];
//   iter = iter[Symbol.iterator]();
//   let cur;
//   while (!(cur = iter.next()).done) {
//     const a = cur.value;
//     res.push(f(a));
//   }
//   return res;
// });

const map = curry(pipe(
  L.map,
  take(Infinity)
));

// const filter = curry((f, iter) => {
//   let res = [];
//   for (const a of iter) {
//     if (f(a)) res.push(a);
//   }
//   return res;
// });

const filter = curry(pipe(
  L.filter,
  take(Infinity)
));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }  
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

const take = (l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
};

const flatten = pipe(L.flatten, take(Infinity));

const flatMap = pipe(L.flatMap, flatten);

// const queryStr = obj => pipe(
//     Object.entries,
//     map(([k, v]) => `${k}=${v}`),
//     reduce((a,b) => `${a}&${b}`)
// );

const join = curry((sep = ',', iter) =>
                reduce((a,b) => `${a}${sep}${b}`, iter));

const queryStr = pipe(
  L.entries,
  L.map(([k,v]) => `${k}=${v}`),
  join('&')
);