async function promisifiedSum(...args) {
  // Your code
  return new Promise((resolve, reject) => {
    if (args.length === 0) {
      return Promise(reject(Error ("no arguments")));
    } else {
      let total = 0;
        for (let i = 0; i < args.length; i++) {
          total += args[i];
        }
      return Promise(resolve(total));
    }
  });
}

module.exports = promisifiedSum;
