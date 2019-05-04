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
    if(r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for(let i = 0; i < r.row; i++) {
        newR.addItem(i, i, r.rectangleItems[i][i])
    }
    return newR
}

/**
 * 通过一个矩阵(行列式)提取它的严格下三角
 * @param r 原矩阵
 */
export function L(r: NumberRectangle): NumberRectangle {
    if(r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for(let i = 0; i < r.row; i++) {
        for(let j = 0; j < r.column; j++) {
            if(j < i) {
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
    if(r.row != r.column) throw Error('row length is not equals column length')
    let array = []
    let newR = new NumberRectangle(r.row, r.column)
    for(let i = 0; i < r.row; i++) {
        for(let j = 0; j < r.column; j++) {
            if(j > i) {
                newR.addItem(i, j, -r.rectangleItems[i][j])
            }
        }
    }
    return newR
}


export function inverse(r: NumberRectangle): NumberRectangle {
    let newR = new NumberRectangle(r.row, r.column)
    let inverseR = inverseMatrix(r.rectangleItems)
    console.log(r)
    for(let i = 0; i < r.row; i++) {
        for(let j = 0; j < r.column; j++) {
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
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            r.addItem(i, j, buildFunc(i, j))
        }
    }
    return r
}


/**
 * 求逆矩阵
 * @param matrix 二维数组表示的逆矩阵
 */
export function inverseMatrix (matrix: number[][]): number[][] {
    let m = JSON.parse(JSON.stringify(matrix)); 
    let len = m.length
    let i: number = 0 
    let j: number = 0
    let k: number = 0
    let res: number[][] = [];

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
            } else {

                for (k = len - 1; k >= 0; k--)
                    res[j][k] = res[j][k] - m[j][i] / m[0][i] * res[0][k];
                for (k = len - 1; k >= i; k--)
                m[j][k] = m[j][k] - m[j][i] / m[0][i] * m[0][k];
            }
        }
        swap(m, res, 0, (i + 1) % len);  
    }
    swap(m, res, 0, len - 1); 

    function swap (input: number[][], output: number[][], target: number, source: number) {
        if (target === source)
            return void 0;
        var a = input[target],
         b = output[target];
        input[target] = input[source];
        input[source] = a;
        output[target] = output[source];
        output[source] = b;
    }

    return res;
}
