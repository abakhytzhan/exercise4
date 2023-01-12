# Problem 8

Make sum promise. Reject with error __no arguments__ if no values supplied.

```js
// any number of arguments
promisfiedSum(1, 2, 3, 4).then((total) => console.log(total)) // 10

promisfiedSum().catch((err) => console.log(err)) // Error: no arguments
```