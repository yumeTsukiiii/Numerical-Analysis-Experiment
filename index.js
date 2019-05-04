"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var structure_1 = require("./structure");
var algorithm_1 = require("./algorithm");
function jacobi(h, numberB, initX) {
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'jacobi');
    for (var i = 0; i < 6; i++) {
        console.log("jacobi: k = " + i + " ->", e.next());
    }
}
function guess(h, numberB, initX) {
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'guess');
    for (var i = 0; i < 6; i++) {
        console.log("guess: k = " + i + " ->", e.next());
    }
}
function sor(h, numberB, initX, omega) {
    var e = algorithm_1.EquationSetFactory.create(h, numberB, initX, 'sor', omega);
    for (var i = 0; i < 6; i++) {
        console.log("sor: k = " + i + " ->", e.next());
    }
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
function init() {
    var h = util_1.H(6);
    var x = [1, 1, 1, 1, 1, 1];
    var b = h.mutipColumnVector(x);
    var numberB = [];
    var initX = [];
    for (var i = 0; i < h.row; i++) {
        numberB.push(b.rectangleItems[i][0]);
        initX.push(0);
    }
    jacobi(h, numberB, initX);
    guess(h, numberB, initX);
    sor(h, numberB, initX, 1.5);
}
// init()
test();
