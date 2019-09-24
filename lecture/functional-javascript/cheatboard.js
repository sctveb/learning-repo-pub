const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

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

const go = (...args) => {
  return reduce((a, f) => f(a), args);
};

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

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

const queryStr = obj => pipe(
    Object.entries,
    map(([k, v]) => `${k}=${v}`),
    reduce((a,b) => `${a}&${b}`)
);