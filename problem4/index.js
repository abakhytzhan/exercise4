function wait(ms) {
  // Your code
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

module.exports = wait;
