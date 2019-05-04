"use strict";
exports.__esModule = true;
var structure_1 = require("./structure");
/**
 * 构建Hilbert矩阵
 * @param n 维数
 */
function H(n) {
    return buildNumberDeterminant(n, h);
}
exports.H = H;
/**
 * 基于下标构建项(参数从0开始)
 * @param i row位置
 * @param j column位置
 */
function h(i, j) {
    return 1 / (i + 1 + j + 1 - 1);
}
exports.h = h;
/**
 * 通过一个矩阵(行列式)提取它的对角矩阵
 * @param r 原矩阵
 */
function D(r) {
    if (r.row != r.column)
        throw Error('row length is not equals column length');
    var array = [];
    var newR = new structure_1.NumberRectangle(r.row, r.column);
    for (var i = 0; i < r.row; i++) {
        newR.addItem(i, i, r.rectangleItems[i][i]);
    }
    return newR;
}
exports.D = D;
/**
 * 通过一个矩阵(行列式)提取它的严格下三角
 * @param r 原矩阵
 */
function L(r) {
    if (r.row != r.column)
        throw Error('row length is not equals column length');
    var array = [];
    var newR = new structure_1.NumberRectangle(r.row, r.column);
    for (var i = 0; i < r.row; i++) {
        for (var j = 0; j < r.column; j++) {
            if (j < i) {
                newR.addItem(i, j, -r.rectangleItems[i][j]);
            }
        }
    }
    return newR;
}
exports.L = L;
/**
 * 通过一个矩阵(行列式)提取它的严格上三角
 * @param r 原矩阵
 */
function U(r) {
    if (r.row != r.column)
        throw Error('row length is not equals column length');
    var array = [];
    var newR = new structure_1.NumberRectangle(r.row, r.column);
    for (var i = 0; i < r.row; i++) {
        for (var j = 0; j < r.column; j++) {
            if (j > i) {
                newR.addItem(i, j, -r.rectangleItems[i][j]);
            }
        }
    }
    return newR;
}
exports.U = U;
function inverse(r) {
    var newR = new structure_1.NumberRectangle(r.row, r.column);
    var inverseR = inverseMatrix(r.rectangleItems);
    console.log(r);
    for (var i = 0; i < r.row; i++) {
        for (var j = 0; j < r.column; j++) {
            newR.addItem(i, j, inverseR[i][j]);
        }
    }
    return newR;
}
exports.inverse = inverse;
function buildNumberDeterminant(n, buildFunc) {
    return buildNumberRectangle(n, n, buildFunc);
}
exports.buildNumberDeterminant = buildNumberDeterminant;
function buildNumberRectangle(row, column, buildFunc) {
    var r = new structure_1.NumberRectangle(row, column);
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            r.addItem(i, j, buildFunc(i, j));
        }
    }
    return r;
}
exports.buildNumberRectangle = buildNumberRectangle;
/**
 * 求逆矩阵
 * @param matrix 二维数组表示的逆矩阵
 */
function inverseMatrix(matrix) {
    var m = JSON.parse(JSON.stringify(matrix));
    var len = m.length;
    var i = 0;
    var j = 0;
    var k = 0;
    var res = [];
    if (len !== m[0].length)
        throw new Error("matrix is not a square matrix");
    for (j = 0; j < len; j++) {
        res[j] = [];
        for (i = 0; i < len; i++) {
            if (j === i)
                res[j][i] = 1;
            else
                res[j][i] = 0;
        }
    }
    for (i = 0; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (m[j][i] !== 0) {
                if (j !== 0)
                    swap(m, res, 0, j);
                break;
            }
        }
        for (j = 0; j < len; j++) {
            if (j === 0) {
                for (k = len - 1; k >= 0; k--) {
                    res[j][k] = res[j][k] / m[j][i];
                }
                for (k = len - 1; k >= i; k--)
                    m[j][k] /= m[j][i];
            }
            else {
                for (k = len - 1; k >= 0; k--)
                    res[j][k] = res[j][k] - m[j][i] / m[0][i] * res[0][k];
                for (k = len - 1; k >= i; k--)
                    m[j][k] = m[j][k] - m[j][i] / m[0][i] * m[0][k];
            }
        }
        swap(m, res, 0, (i + 1) % len);
    }
    swap(m, res, 0, len - 1);
    function swap(input, output, target, source) {
        if (target === source)
            return void 0;
        var a = input[target], b = output[target];
        input[target] = input[source];
        input[source] = a;
        output[target] = output[source];
        output[source] = b;
    }
    return res;
}
exports.inverseMatrix = inverseMatrix;
