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
function det(Matrix, N) {
    var T0;
    var T1;
    var T2;
    var Num;
    var Cha;
    var B = [];
    for (var i = 0; i <= N; i++) {
        var subItem = [];
        for (var j = 0; j <= N; j++) {
            subItem.push(0);
        }
        B.push(subItem);
    }
    if (N > 0) {
        Cha = 0;
        Num = 0;
        if (N == 1) {
            return Matrix[0][0] * Matrix[1][1] - Matrix[0][1] * Matrix[1][0];
        }
        for (T0 = 0; T0 <= N; T0++) //T0循环
         {
            for (T1 = 1; T1 <= N; T1++) //T1循环
             {
                for (T2 = 0; T2 <= N - 1; T2++) //T2循环
                 {
                    if (T2 == T0) {
                        Cha = 1;
                    }
                    B[T1 - 1][T2] = Matrix[T1][T2 + Cha];
                }
                //T2循环
                Cha = 0;
            }
            //T1循环
            Num = Num + Matrix[0][T0] * det(B, N - 1) * Math.pow((-1), T0);
        }
        //T0循环
        return Num;
    }
    else if (N == 0) {
        return Matrix[0][0];
    }
    return 0;
}
function inverseMatrix(Matrix, N) {
    var MatrixC = [];
    for (var i = 0; i <= N; i++) {
        var subItem = [];
        for (var j = 0; j <= N; j++) {
            subItem.push(0);
        }
        MatrixC.push(subItem);
    }
    var T0;
    var T1;
    var T2;
    var T3;
    var B;
    var Num = 0;
    var Chay = 0;
    var Chax = 0;
    B = [];
    for (var i = 0; i <= N; i++) {
        var subItem = [];
        for (var j = 0; j <= N; j++) {
            subItem.push(0);
        }
        B.push(subItem);
    }
    var add;
    add = 1 / det(Matrix, N);
    for (T0 = 0; T0 <= N; T0++) {
        for (T3 = 0; T3 <= N; T3++) {
            for (T1 = 0; T1 <= N - 1; T1++) {
                if (T1 < T0) {
                    Chax = 0;
                }
                else {
                    Chax = 1;
                }
                for (T2 = 0; T2 <= N - 1; T2++) {
                    if (T2 < T3) {
                        Chay = 0;
                    }
                    else {
                        Chay = 1;
                    }
                    B[T1][T2] = Matrix[T1 + Chax][T2 + Chay];
                }
                //T2循环
            } //T1循环
            det(B, N - 1);
            MatrixC[T3][T0] = det(B, N - 1) * add * (Math.pow(-1, T0 + T3));
        }
    }
    return MatrixC;
}
exports.inverseMatrix = inverseMatrix;
