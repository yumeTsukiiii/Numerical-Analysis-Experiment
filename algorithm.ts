import { NumberRectangle } from "./structure";
import { D, L, U, inverse } from "./util";

export abstract class EquationSet {

    readonly results: number[][] = []
    readonly reFixResults: number[][] = []

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[]) {
        this.results.push(init)
    }

    abstract next(): number[]

    reFix() {
        let previous: number[]
        if(this.reFixResults.length === 0) {
            previous = this.results[this.results.length - 1]
        } else {
            previous = this.reFixResults[this.reFixResults.length - 1]
        }
        let bRectangle = new NumberRectangle(this.b.length, 1)
        let previousRectangle = new NumberRectangle(this.b.length, 1)
        for(let i = 0; i < this.b.length; i++) {
            bRectangle.addItem(i, 0, this.b[i])
            previousRectangle.addItem(i, 0, previous[i])
        }
        let r = bRectangle.sub(this.A.mutipColumnVector(previous))
        let next = inverse(this.A).mutip(r).plus(previousRectangle)
        let reFixResult: number[] = []
        for(let i = 0; i < this.b.length; i++) {
            reFixResult.push(next.rectangleItems[i][0])
        }
        this.reFixResults.push(reFixResult)
        return reFixResult
    }
}

export class JacobiEquationSet extends EquationSet {

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[]) {
        super(A, b, init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        let result = inverseD.mutip(l.plus(u))
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseD.mutipColumnVector(this.b))
        let arrayResult = []
        for(let i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0])
        }
        this.results.push(arrayResult)
        return arrayResult
    }

}

export class GuessEquationSet extends EquationSet {

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[]) {
        super(A, b, init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        let inverseDL: NumberRectangle = inverse(d.sub(l))
        let result = inverseDL.mutip(u)
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDL.mutipColumnVector(this.b))
        let arrayResult = []
        for(let i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0])
        }
        this.results.push(arrayResult)
        return arrayResult
    }

}

export class SorEquationSet extends EquationSet {

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[], readonly omega: number) {
        super(A, b, init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        let inverseDOL: NumberRectangle = inverse(d.sub(l.multipNumber(this.omega)))
        let result = inverseDOL.mutip(d.multipNumber(1 - this.omega).plus(u.multipNumber(this.omega)))
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDOL.multipNumber(this.omega).mutipColumnVector(this.b))
        let arrayResult = []
        for(let i = 0; i < this.b.length; i++) {
            arrayResult.push(result.rectangleItems[i][0])
        }
        this.results.push(arrayResult)
        return arrayResult
    }

}

export class EquationSetFactory {

    private constructor(readonly A: NumberRectangle,readonly b: number[]) {}

    static create(A: NumberRectangle, b: number[], init: number[], type: string, omega?: number): EquationSet {
        if(type === "jacobi") {
            return new JacobiEquationSet(A, b, init)
        } else if(type === "guess") {
            return new GuessEquationSet(A, b, init)
        } else if(type === "sor"){
            return new SorEquationSet(A, b, init, omega)
        } else {
            throw Error("no equation set")
        }
    }
}