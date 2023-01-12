function callFuncInInterval(cb) {
  // Your code
  let delay = 0;
  for (let i = 1; i <= 10; i++) {
    delay = delay + i;
    function func(i) {
      setTimeout(() => cb(i), delay * 1000);
    };
    func(i); 
  }
}

module.exports = callFuncInInterval;