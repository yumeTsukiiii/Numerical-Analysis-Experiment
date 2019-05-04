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
    var inverseR = inverseMatrix(r.rectangleItems, r.column - 1);
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
function det(matrix, n) {
    var t0;
    var t1;
    var t2;
    var num;
    var cha;
    var b = [];
    for (var i = 0; i <= n; i++) {
        var subItem = [];
        for (var j = 0; j <= n; j++) {
            subItem.push(0);
        }
        b.push(subItem);
    }
    if (n > 0) {
        cha = 0;
        num = 0;
        if (n == 1) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        for (t0 = 0; t0 <= n; t0++) //T0循环
         {
            for (t1 = 1; t1 <= n; t1++) //T1循环
             {
                for (t2 = 0; t2 <= n - 1; t2++) //T2循环
                 {
                    if (t2 == t0) {
                        cha = 1;
                    }
                    b[t1 - 1][t2] = matrix[t1][t2 + cha];
                }
                //T2循环
                cha = 0;
            }
            //T1循环
            num = num + matrix[0][t0] * det(b, n - 1) * Math.pow((-1), t0);
        }
        //T0循环
        return num;
    }
    else if (n == 0) {
        return matrix[0][0];
    }
    return 0;
}
function inverseMatrix(matrix, n) {
    var matrixC = [];
    for (var i = 0; i <= n; i++) {
        var subItem = [];
        for (var j = 0; j <= n; j++) {
            subItem.push(0);
        }
        matrixC.push(subItem);
    }
    var t0;
    var t1;
    var t2;
    var t3;
    var b;
    var num = 0;
    var chay = 0;
    var chax = 0;
    b = [];
    for (var i = 0; i <= n; i++) {
        var subItem = [];
        for (var j = 0; j <= n; j++) {
            subItem.push(0);
        }
        b.push(subItem);
    }
    var add;
    add = 1 / det(matrix, n);
    for (t0 = 0; t0 <= n; t0++) {
        for (t3 = 0; t3 <= n; t3++) {
            for (t1 = 0; t1 <= n - 1; t1++) {
                if (t1 < t0) {
                    chax = 0;
                }
                else {
                    chax = 1;
                }
                for (t2 = 0; t2 <= n - 1; t2++) {
                    if (t2 < t3) {
                        chay = 0;
                    }
                    else {
                        chay = 1;
                    }
                    b[t1][t2] = matrix[t1 + chax][t2 + chay];
                }
                //T2循环
            } //T1循环
            det(b, n - 1);
            matrixC[t3][t0] = det(b, n - 1) * add * (Math.pow(-1, t0 + t3));
        }
    }
    return matrixC;
}
exports.inverseMatrix = inverseMatrix;
