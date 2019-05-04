/**
 * 定义矩阵的结构以及需要支持的方法
 */
export class Rectangle<T> {

    readonly rectangleItems: T[][] = []

    constructor(readonly row: number, readonly column: number) {
        for(let i = 0; i < this.row; i++) {
            let subItem = []
            for(let j = 0; j < this.column; j++) {
                subItem.push(null)
            }
            this.rectangleItems.push(subItem)
        }
    }

    addItem(i: number, j: number, value: T | null): boolean {
        if(!this.checkIndex(i, j)) throw Error('IndexOutOfBound')
        this.rectangleItems[i][j] = value;
        return true;
    }

    deleteItem(i: number, j: number): boolean {
        if(!this.checkIndex(i, j)) throw Error('IndexOutOfBound')
        this.rectangleItems[i].splice(j, 1)
        return true  
    }

    updateItem(i: number, j: number, value: T): T | null{
        if(!this.checkIndex(i, j)) throw Error('IndexOutOfBound')
        let oldValue = this.rectangleItems[i][j]
        this.rectangleItems[i][j] = value
        return oldValue;
    }

    getItem(i: number, j: number): T | null {
        if(!this.checkIndex(i, j)) throw Error('IndexOutOfBound')
        let item = this.rectangleItems[i][j]
        if(item !== undefined) return item;
        return null
    }

    forEach(block: ((i: number, j: number, item: T | null) => void)): void {
        this.rectangleItems.forEach((column, i) => {
            column.forEach((item, j) => {
                block(i, j, item)
            })
        })
    }

    forEachWithEmpty(block: ((i: number, j: number, item: T | null) => void)): void {
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                block(i, j, this.getItem(i, j) || null)
            }
        }
    }

    getRow(i: number): Array<T> {
        let row = []
        for(let j = 0; j < this.column; j++) {
            let item = this.getItem(i, j)
            row.push(item)
        }
        return row
    }

    getColumn(j: number): Array<T> {
        let column = []
        for(let i = 0; i < this.row; i++) {
            let item = this.getItem(i, j)
            column.push(item)
        }
        return column
    }  

    protected checkIndex(i: number, j: number) {
        return i < this.row && j < this.column;
    }
}

/**
 * 定义行列式，需要限制行和列
 */
export class Determinant<T> extends Rectangle<T> {

    constructor(readonly n: number) {
        super(n, n)
    } 

}

/**
 * 定义以number为值的矩阵
 */
export class NumberRectangle extends Rectangle<number> {

    constructor(row: number, column: number) {
        super(row, column)
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                this.rectangleItems[i][j] = 0
            }
        }
    }

    getItem(i: number, j: number): number {
        if(!this.checkIndex(i, j)) throw Error('IndexOutOfBound')
        try {
            return this.rectangleItems[i][j];
        } catch(e) {
            return 0
        }
        
    }

    mutip(r: NumberRectangle): NumberRectangle | null{
        if(this.column != r.row) return null
        let rectangle = new NumberRectangle(this.row, r.column)
        for(let i = 0; i < this.row; i++) {
            let row = this.getRow(i)
            for(let j = 0; j < r.column; j++) {
                let column = r.getColumn(j)
                let sum = 0;
                for(let k = 0; k < this.column; k++) {
                    sum += row[k] * column[k]
                }
                rectangle.addItem(i, j, sum)
            }
        }
        return rectangle
    }

    mutipColumnVector(x: number[]): NumberRectangle | null {
        let r = new NumberRectangle(x.length, 1)
        for(let j = 0; j < x.length; j++) {
            r.addItem(j, 0, x[j])
        }
        return this.mutip(r)
    }

    mutipRowVector(x: number[]): NumberRectangle | null {
        let r = new NumberRectangle(x.length, 1)
        for(let j = 0; j < x.length; j++) {
            r.addItem(0, j, x[j])
        }
        return this.mutip(r)
    }
 
    plus(r: NumberRectangle): NumberRectangle | null {
        if(this.row != r.row || this.column != r.column) return null
        let rectangle = new NumberRectangle(this.row, this.column)
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                rectangle.addItem(i, j, this.getItem(i, j) + r.getItem(i, j))
            }
        }
        return rectangle
    }

    sub(r: NumberRectangle): NumberRectangle | null {
        if(this.row != r.row || this.column != r.column) return null
        let rectangle = new NumberRectangle(this.row, this.column)
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                rectangle.addItem(i, j, this.getItem(i, j) - r.getItem(i, j))
            }
        }
        return rectangle
    }
}
