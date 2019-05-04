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
/**
 * 定义矩阵的结构以及需要支持的方法
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(row, column) {
        this.row = row;
        this.column = column;
        this.rectangleItems = [];
        for (var i = 0; i < this.row; i++) {
            var subItem = [];
            for (var j = 0; j < this.column; j++) {
                subItem.push(null);
            }
            this.rectangleItems.push(subItem);
        }
    }
    Rectangle.prototype.addItem = function (i, j, value) {
        if (!this.checkIndex(i, j))
            throw Error('IndexOutOfBound');
        this.rectangleItems[i][j] = value;
        return true;
    };
    Rectangle.prototype.deleteItem = function (i, j) {
        if (!this.checkIndex(i, j))
            throw Error('IndexOutOfBound');
        this.rectangleItems[i].splice(j, 1);
        return true;
    };
    Rectangle.prototype.updateItem = function (i, j, value) {
        if (!this.checkIndex(i, j))
            throw Error('IndexOutOfBound');
        var oldValue = this.rectangleItems[i][j];
        this.rectangleItems[i][j] = value;
        return oldValue;
    };
    Rectangle.prototype.getItem = function (i, j) {
        if (!this.checkIndex(i, j))
            throw Error('IndexOutOfBound');
        var item = this.rectangleItems[i][j];
        if (item !== undefined)
            return item;
        return null;
    };
    Rectangle.prototype.forEach = function (block) {
        this.rectangleItems.forEach(function (column, i) {
            column.forEach(function (item, j) {
                block(i, j, item);
            });
        });
    };
    Rectangle.prototype.forEachWithEmpty = function (block) {
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                block(i, j, this.getItem(i, j) || null);
            }
        }
    };
    Rectangle.prototype.getRow = function (i) {
        var row = [];
        for (var j = 0; j < this.column; j++) {
            var item = this.getItem(i, j);
            row.push(item);
        }
        return row;
    };
    Rectangle.prototype.getColumn = function (j) {
        var column = [];
        for (var i = 0; i < this.row; i++) {
            var item = this.getItem(i, j);
            column.push(item);
        }
        return column;
    };
    Rectangle.prototype.checkIndex = function (i, j) {
        return i < this.row && j < this.column;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
/**
 * 定义行列式，需要限制行和列
 */
var Determinant = /** @class */ (function (_super) {
    __extends(Determinant, _super);
    function Determinant(n) {
        var _this = _super.call(this, n, n) || this;
        _this.n = n;
        return _this;
    }
    return Determinant;
}(Rectangle));
exports.Determinant = Determinant;
/**
 * 定义以number为值的矩阵
 */
var NumberRectangle = /** @class */ (function (_super) {
    __extends(NumberRectangle, _super);
    function NumberRectangle(row, column) {
        var _this = _super.call(this, row, column) || this;
        for (var i = 0; i < _this.row; i++) {
            for (var j = 0; j < _this.column; j++) {
                _this.rectangleItems[i][j] = 0;
            }
        }
        return _this;
    }
    NumberRectangle.prototype.getItem = function (i, j) {
        if (!this.checkIndex(i, j))
            throw Error('IndexOutOfBound');
        try {
            return this.rectangleItems[i][j];
        }
        catch (e) {
            return 0;
        }
    };
    NumberRectangle.prototype.mutip = function (r) {
        if (this.column != r.row)
            return null;
        var rectangle = new NumberRectangle(this.row, r.column);
        for (var i = 0; i < this.row; i++) {
            var row = this.getRow(i);
            for (var j = 0; j < r.column; j++) {
                var column = r.getColumn(j);
                var sum = 0;
                for (var k = 0; k < this.column; k++) {
                    sum += row[k] * column[k];
                }
                rectangle.addItem(i, j, sum);
            }
        }
        return rectangle;
    };
    NumberRectangle.prototype.mutipColumnVector = function (x) {
        var r = new NumberRectangle(x.length, 1);
        for (var j = 0; j < x.length; j++) {
            r.addItem(j, 0, x[j]);
        }
        return this.mutip(r);
    };
    NumberRectangle.prototype.mutipRowVector = function (x) {
        var r = new NumberRectangle(x.length, 1);
        for (var j = 0; j < x.length; j++) {
            r.addItem(0, j, x[j]);
        }
        return this.mutip(r);
    };
    NumberRectangle.prototype.plus = function (r) {
        if (this.row != r.row || this.column != r.column)
            return null;
        var rectangle = new NumberRectangle(this.row, this.column);
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                rectangle.addItem(i, j, this.getItem(i, j) + r.getItem(i, j));
            }
        }
        return rectangle;
    };
    NumberRectangle.prototype.sub = function (r) {
        if (this.row != r.row || this.column != r.column)
            return null;
        var rectangle = new NumberRectangle(this.row, this.column);
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                rectangle.addItem(i, j, this.getItem(i, j) - r.getItem(i, j));
            }
        }
        return rectangle;
    };
    NumberRectangle.prototype.multipNumber = function (n) {
        var rectangle = new NumberRectangle(this.row, this.column);
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                rectangle.addItem(i, j, this.rectangleItems[i][j] * n);
            }
        }
        return rectangle;
    };
    return NumberRectangle;
}(Rectangle));
exports.NumberRectangle = NumberRectangle;
