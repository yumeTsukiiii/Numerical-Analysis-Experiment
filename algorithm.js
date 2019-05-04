"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var structure_1 = require("./structure");
var util_1 = require("./util");
var EquationSet = /** @class */ (function () {
    function EquationSet(A, b, init) {
        this.A = A;
        this.b = b;
        this.init = init;
        this.results = [];
        this.reFixResults = [];
        this.results.push(init);
    }
    EquationSet.prototype.reFix = function () {
        var previous;
        if (this.reFixResults.length === 0) {
            previous = this.results[this.results.length - 1];
        }
        else {
            previous = this.reFixResults[this.reFixResults.length - 1];
        }
        var bRectangle = new structure_1.NumberRectangle(this.b.length, 1);
        var previousRectangle = new structure_1.NumberRectangle(this.b.length, 1);
        for (var i = 0; i < this.b.length; i++) {
            bRectangle.addItem(i, 0, this.b[i]);
            previousRectangle.addItem(i, 0, previous[i]);
        }
        var r = bRectangle.sub(this.A.mutipColumnVector(previous));
        var next = util_1.inverse(this.A).mutip(r).plus(previousRectangle);
        var reFixResult = [];
        for (var i = 0; i < this.b.length; i++) {
            reFixResult.push(next.rectangleItems[i][0]);
        }
        this.reFixResults.push(reFixResult);
        return reFixResult;
    };
    return EquationSet;
}());
exports.EquationSet = EquationSet;
var JacobiEquationSet = /** @class */ (function (_super) {
    __extends(JacobiEquationSet, _super);
    function JacobiEquationSet(A, b, init) {
        var _this = _super.call(this, A, b, init) || this;
        _this.A = A;
        _this.b = b;
        _this.init = init;
        return _this;
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
}(EquationSet));
exports.JacobiEquationSet = JacobiEquationSet;
var GuessEquationSet = /** @class */ (function (_super) {
    __extends(GuessEquationSet, _super);
    function GuessEquationSet(A, b, init) {
        var _this = _super.call(this, A, b, init) || this;
        _this.A = A;
        _this.b = b;
        _this.init = init;
        return _this;
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
}(EquationSet));
exports.GuessEquationSet = GuessEquationSet;
var SorEquationSet = /** @class */ (function (_super) {
    __extends(SorEquationSet, _super);
    function SorEquationSet(A, b, init, omega) {
        var _this = _super.call(this, A, b, init) || this;
        _this.A = A;
        _this.b = b;
        _this.init = init;
        _this.omega = omega;
        return _this;
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
}(EquationSet));
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
