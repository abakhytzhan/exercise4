# Problem 4

Make setTimeout async, which accepts ms.

```js
async function logAsync() {
  await wait(1000);
  console.log("Passed 1 sec");
  await wait(2000);
  console.log("Passed 2 sec");
}

logAsync()
// after 1 sec - Passed 1 sec
// after 2 sec - Passed 2 sec
```