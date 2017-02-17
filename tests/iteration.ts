let count = 0
let limit = 1

export function reset() {
  count = 0;
}

export function setLimit(i) {
  limit = i;
}

export function current() {
  return count;
}

export function next(fn, arg, done) {
  count++;
  if (count < limit) {
    fn(arg, done);
  }
  else {
    done();
  }
}
