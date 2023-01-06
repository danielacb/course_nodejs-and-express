// console.log(arguments);
// console.log(require("module").wrapper);

// (function(exports, require, module, __filename, __dirname) {
//    Module code...
// })

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 4));

// exports
// const calc2 = require("./test-module-2");
const { multiply, divide } = require("./test-module-2");
console.log(multiply(2, 5));
console.log(divide(15, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
