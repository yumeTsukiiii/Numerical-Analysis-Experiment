"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var structure_1 = require("./structure");
var algorithm_1 = require("./algorithm");
function jacobi(h, numberB, initX, times) {
    if (times === void 0) { times = 6; }
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'jacobi');
    for (var i = 0; i < times; i++) {
        console.log("jacobi: k = " + i + " ->", e.next());
    }
    return e;
}
function guess(h, numberB, initX, times) {
    if (times === void 0) { times = 6; }
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'guess');
    for (var i = 0; i < times; i++) {
        console.log("guess: k = " + i + " ->", e.next());
    }
    return e;
}
function sor(h, numberB, initX, omega, times) {
    if (times === void 0) { times = 6; }
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'sor', omega);
    for (var i = 0; i < times; i++) {
        console.log("sor: k = " + i + " ->", e.next());
    }
    return e;
}
function equationSetReFix(e, times) {
    for (var i = 0; i < times; i++) {
        console.log("reFix: k = " + i + " ->", e.reFix());
    }
    return e;
}
function test() {
    var h = new structure_1.NumberRectangle(3, 3);
    h.addItem(0, 0, 4);
    h.addItem(0, 1, -2);
    h.addItem(0, 2, -4);
    h.addItem(1, 0, -2);
    h.addItem(1, 1, 17);
    h.addItem(1, 2, 10);
    h.addItem(2, 0, -4);
    h.addItem(2, 1, 10);
    h.addItem(2, 2, 9);
    var x = [2, 1, -1];
    var b = h.mutipColumnVector(x);
    var numberB = [];
    var initX = [];
    for (var i = 0; i < h.row; i++) {
        numberB.push(b.rectangleItems[i][0]);
        initX.push(0);
    }
    jacobi(h, numberB, initX);
    guess(h, numberB, initX);
    sor(h, numberB, initX, 1.46);
}
function init(dimen) {
    var h = util_1.H(dimen); //构造病态矩阵
    var x = []; //精确解向量
    for (var i = 0; i < dimen; i++) {
        x.push(1);
    }
    var b = h.mutipColumnVector(x);
    var numberB = [];
    var initX = [];
    for (var i = 0; i < h.row; i++) {
        numberB.push(b.rectangleItems[i][0]);
        initX.push(0);
    }
    // equationSetReFix(jacobi(h, numberB, initX, 10), 200)
    equationSetReFix(guess(h, numberB, initX, 3), 200);
    // equationSetReFix(sor(h, numberB, initX, 1.46, 3), 4)
}
init(8);
// test()
