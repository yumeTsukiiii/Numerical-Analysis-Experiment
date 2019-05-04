"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var JacobiEquationSet = /** @class */ (function () {
    function JacobiEquationSet(A, b, init) {
        this.A = A;
        this.b = b;
        this.init = init;
        this.results = [];
        this.results.push(init);
    }
    JacobiEquationSet.prototype.next = function () {
        var d = util_1.D(this.A);
        var l = util_1.L(this.A);
        var u = util_1.U(this.A);
        var inverseD = util_1.inverse(d);
        var result = inverseD.mutip(l.plus(u))
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseD.mutipColumnVector(this.b));
        var arrayResult = [];
        for (var i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0]);
        }
        this.results.push(arrayResult);
        return arrayResult;
    };
    return JacobiEquationSet;
}());
exports.JacobiEquationSet = JacobiEquationSet;
var GuessEquationSet = /** @class */ (function () {
    function GuessEquationSet(A, b, init) {
        this.A = A;
        this.b = b;
        this.init = init;
        this.results = [];
        this.results.push(init);
    }
    GuessEquationSet.prototype.next = function () {
        var d = util_1.D(this.A);
        var l = util_1.L(this.A);
        var u = util_1.U(this.A);
        var inverseD = util_1.inverse(d);
        var inverseDL = util_1.inverse(d.sub(l));
        var result = inverseDL.mutip(u)
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDL.mutipColumnVector(this.b));
        var arrayResult = [];
        for (var i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0]);
        }
        this.results.push(arrayResult);
        return arrayResult;
    };
    return GuessEquationSet;
}());
exports.GuessEquationSet = GuessEquationSet;
var SorEquationSet = /** @class */ (function () {
    function SorEquationSet(A, b, init, omega) {
        this.A = A;
        this.b = b;
        this.init = init;
        this.omega = omega;
        this.results = [];
        this.results.push(init);
    }
    SorEquationSet.prototype.next = function () {
        var d = util_1.D(this.A);
        var l = util_1.L(this.A);
        var u = util_1.U(this.A);
        var inverseD = util_1.inverse(d);
        var inverseDOL = util_1.inverse(d.sub(l.multipNumber(this.omega)));
        var result = inverseDOL.mutip(d.multipNumber(1 - this.omega).plus(u.multipNumber(this.omega)))
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDOL.multipNumber(this.omega).mutipColumnVector(this.b));
        var arrayResult = [];
        for (var i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0]);
        }
        this.results.push(arrayResult);
        return arrayResult;
    };
    return SorEquationSet;
}());
exports.SorEquationSet = SorEquationSet;
var EquationSetFactory = /** @class */ (function () {
    function EquationSetFactory(A, b) {
        this.A = A;
        this.b = b;
    }
    EquationSetFactory.create = function (A, b, init, type, omega) {
        if (type === "jacobi") {
            return new JacobiEquationSet(A, b, init);
        }
        else if (type === "guess") {
            return new GuessEquationSet(A, b, init);
        }
        else if (type === "sor") {
            return new SorEquationSet(A, b, init, omega);
        }
        else {
            throw Error("no equation set");
        }
    };
    return EquationSetFactory;
}());
exports.EquationSetFactory = EquationSetFactory;
