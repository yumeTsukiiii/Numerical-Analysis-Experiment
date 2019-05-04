import { NumberRectangle } from "./structure";

/**
 * 构建Hilbert矩阵
 * @param n 维数
 */
export function H(n: number): NumberRectangle {
    return buildNumberDeterminant(n, h)
}

/**
 * 基于下标构建项(参数从0开始)
 * @param i row位置
 * @param j column位置
 */
export function h(i: number, j: number) {
    return 1 / (i + 1 + j + 1 - 1);
}

/**
 * 通过一个矩阵(行列式)提取它的对角矩阵
 * @param r 原矩阵
 */
export function D(r: NumberRectangle): NumberRectangle {
    if (r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for (let i = 0; i < r.row; i++) {
        newR.addItem(i, i, r.rectangleItems[i][i])
    }
    return newR
}

/**
 * 通过一个矩阵(行列式)提取它的严格下三角
 * @param r 原矩阵
 */
export function L(r: NumberRectangle): NumberRectangle {
    if (r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for (let i = 0; i < r.row; i++) {
        for (let j = 0; j < r.column; j++) {
            if (j < i) {
                newR.addItem(i, j, -r.rectangleItems[i][j])
            }
        }
    }
    return newR
}

/**
 * 通过一个矩阵(行列式)提取它的严格上三角
 * @param r 原矩阵
 */
export function U(r: NumberRectangle): NumberRectangle {
    if (r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for (let i = 0; i < r.row; i++) {
        for (let j = 0; j < r.column; j++) {
            if (j > i) {
                newR.addItem(i, j, -r.rectangleItems[i][j])
            }
        }
    }
    return newR
}


export function inverse(r: NumberRectangle): NumberRectangle {
    let newR = new NumberRectangle(r.row, r.column)
    let inverseR = inverseMatrix(r.rectangleItems, r.column - 1)
    for (let i = 0; i < r.row; i++) {
        for (let j = 0; j < r.column; j++) {
            newR.addItem(i, j, inverseR[i][j])
        }
    }
    return newR
}

export function buildNumberDeterminant(n: number, buildFunc: (i: number, j: number) => number) {
    return buildNumberRectangle(n, n, buildFunc)
}

export function buildNumberRectangle(row: number, column: number, buildFunc: (i: number, j: number) => number): NumberRectangle {
    let r = new NumberRectangle(row, column)
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            r.addItem(i, j, buildFunc(i, j))
        }
    }
    return r
}

function det(matrix: number[][], n: number)//计算n阶行列式（N=n-1）
{
    let t0;
    let t1;
    let t2;
    let num;
    let cha;
    let b: number[][] = [];
    for (let i = 0; i <= n; i++) {
        let subItem = []
        for (let j = 0; j <= n; j++) {
            subItem.push(0)
        }
        b.push(subItem)
    }
    if (n > 0) {
        cha = 0;
        num = 0;
        if (n == 1) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        for (t0 = 0; t0 <= n; t0++)//T0循环
        {
            for (t1 = 1; t1 <= n; t1++)//T1循环
            {
                for (t2 = 0; t2 <= n - 1; t2++)//T2循环
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
    } else if (n == 0) {
        return matrix[0][0];
    }
    return 0;
}

export function inverseMatrix(matrix: number[][], n: number) {
    let matrixC: number[][] = []

    for (let i = 0; i <= n; i++) {
        let subItem = []
        for (let j = 0; j <= n; j++) {
            subItem.push(0)
        }
        matrixC.push(subItem)
    }

    let t0;
    let t1;
    let t2;
    let t3;
    let b: number[][];
    let num = 0;
    let chay = 0;
    let chax = 0;
    b = [];
    for (let i = 0; i <= n; i++) {
        let subItem = []
        for (let j = 0; j <= n; j++) {
            subItem.push(0)
        }
        b.push(subItem)
    }
    let add;
    add = 1 / det(matrix, n);
    for (t0 = 0; t0 <= n; t0++) {
        for (t3 = 0; t3 <= n; t3++) {
            for (t1 = 0; t1 <= n - 1; t1++) {
                if (t1 < t0) {
                    chax = 0;
                } else {
                    chax = 1;
                }
                for (t2 = 0; t2 <= n - 1; t2++) {
                    if (t2 < t3) {
                        chay = 0;
                    } else {
                        chay = 1;
                    }
                    b[t1][t2] = matrix[t1 + chax][t2 + chay];
                }
                //T2循环
            }//T1循环
            det(b, n - 1);
            matrixC[t3][t0] = det(b, n - 1) * add * (Math.pow(-1, t0 + t3));
        }
    }
    return matrixC;
}