import { H, inverse, inverseMatrix } from "./util";
import { NumberRectangle } from "./structure";
import { EquationSetFactory } from "./algorithm";

function jacobi() {
    
}

function guess() {

}

function sor() {

}

function init() {
    // let h = H(6)
    // let x = [1,1,1,1,1,1]
    // let b = h.mutipVector(x)
    // let h = new NumberRectangle(3, 3)
    // h.addItem(0, 0, 10)
    // h.addItem(0, 1, 3)
    // h.addItem(0, 2, 1)
    // h.addItem(1, 0, 2)
    // h.addItem(1, 1, -10)
    // h.addItem(1, 2, 3)
    // h.addItem(2, 0, 1)
    // h.addItem(2, 1, 3)
    // h.addItem(2, 2, 10)
    // let x = [1,1,1]
    // let b = h.mutipColumnVector(x)
    // let e = EquationSetFactory.create(h,[b[0], b[1],b[2]] , [0,0,0], 'jacobi')
    // e.next()
    // console.log(e.results)
    let a = [ 
        [ 10, 0, 0, 0, 0, 0 ], 
        [ 0, -10, 0, 0, 0, 0], 
        [ 0, 0, 10, 0, 0, 0 ], 
        [ 0, 0, 0, -10, 0, 0 ], 
        [ 0, 0, 0, 0, 10, 0 ],
        [ 0, 0, 0, 0, 0, -10 ]
    ]
    console.log(inverseMatrix(a))
}

init()