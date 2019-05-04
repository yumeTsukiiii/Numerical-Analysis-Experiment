import { H, inverse, inverseMatrix } from "./util";
import { NumberRectangle } from "./structure";
import { EquationSetFactory } from "./algorithm";

function jacobi(h: NumberRectangle, numberB: number[], initX: number[]) {
    let e = EquationSetFactory.create(h, numberB , initX ,'jacobi')
    for(let i = 0; i < 6; i++) {
        console.log(`jacobi: k = ${i} ->`, e.next())
    }
}

function guess(h: NumberRectangle, numberB: number[], initX: number[]) {
    let e = EquationSetFactory.create(h, numberB , initX ,'guess')
    for(let i = 0; i < 6; i++) {
        console.log(`guess: k = ${i} ->`, e.next())
    }
}

function sor(h: NumberRectangle, numberB: number[], initX: number[], omega: number) {
    let e = EquationSetFactory.create(h, numberB , initX ,'sor', omega)
    for(let i = 0; i < 6; i++) {
        console.log(`sor: k = ${i} ->`, e.next())
    }
}

function test() {
    let h = new NumberRectangle(3, 3)
    h.addItem(0, 0, 4)
    h.addItem(0, 1, -2)
    h.addItem(0, 2, -4)
    h.addItem(1, 0, -2)
    h.addItem(1, 1, 17)
    h.addItem(1, 2, 10)
    h.addItem(2, 0, -4)
    h.addItem(2, 1, 10)
    h.addItem(2, 2, 9)
    let x = [2,1,-1]
    let b = h.mutipColumnVector(x)
    let numberB = []
    let initX = []
    for(let i = 0; i < h.row; i++) {
        numberB.push(b.rectangleItems[i][0])
        initX.push(0)
    }
    
    sor(h, numberB, initX, 1.46)
}

function init() {
    let h = H(6)
    let x = [1,1,1,1,1,1]
    let b = h.mutipColumnVector(x)

    let numberB = []
    let initX = []
    for(let i = 0; i < h.row; i++) {
        numberB.push(b.rectangleItems[i][0])
        initX.push(0)
    }

    jacobi(h, numberB, initX)
    guess(h, numberB, initX)
    sor(h, numberB, initX, 1.5)
}

// init()
test()