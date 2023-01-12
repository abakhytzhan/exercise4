function callFuncInInterval(cb) {
  // Your code
  let num = 1;
  const interval = setInterval(function func() { 
    cb(num);
    if (num === 10) {
      clearInterval(interval);
    }
    num++;
  }, 1000, num);
}

module.exports = callFuncInInterval;
