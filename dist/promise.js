"use strict";

// const workPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([12, 23])
//         reject('Things ')
//     }, 2000)
// })
// workPromise.then((result) => {
//     console.log('success', result);
// }).catch((error) => {
//     console.log('Error', error);
// })
var sum = function sum(a, b) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(a + b);
    }, 2000);
  });
}; // sum(3, 5).then((result) => {
//     console.log(result);
//     sum(result, 10).then((result2) => {
//         console.log('--->', result2);
//     }).catch((e) => {
//         console.log(e);
//     })
// }).catch((error) => {
//     console.log(error);
// })

/* Promise chaining*/


sum(1, 2).then(function (result) {
  console.log(result);
  return sum(result, 10);
}).then(function (result2) {
  console.log(result2);
  return sum(result2, 10);
}).then(function (result3) {
  console.log(result3);
})["catch"](function (e) {
  console.log(e);
});
//# sourceMappingURL=promise.js.map