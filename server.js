function callback() {
  console.log("Server file is running ");
}

const add = function add(a, b, call) {
  callback();
  return a + b;
};

const res = add(2, 3, callback);
console.log(res);
