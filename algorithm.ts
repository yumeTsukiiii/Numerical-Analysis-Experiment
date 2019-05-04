import { NumberRectangle } from "./structure";
import { D, L, U, inverse } from "./util";

export interface EquationSet {
    readonly results: number[][]
    readonly A: NumberRectangle
    readonly b: number[]
    readonly init: number[]
    next(): number[]
}

export class JacobiEquationSet implements EquationSet {

    readonly results: number[][] = []

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[]) {
        this.results.push(init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        console.log(inverseD)
        let result = inverseD.mutip(l.plus(u))
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseD.mutipColumnVector(this.b)).rectangleItems[0]
        this.results.push(result)
        return result
    }

}

export class GuessEquationSet implements EquationSet {

    readonly results: number[][] = []

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[]) {
        this.results.push(init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        let inverseDL: NumberRectangle = inverse(d.sub(l))
        let result = inverseDL.mutip(u)
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDL.mutipColumnVector(this.b)).rectangleItems[0]
        this.results.push(result)
        return result
    }

}

export class SorEquationSet implements EquationSet {

    readonly results: number[][] = []

    constructor(readonly A: NumberRectangle, readonly b: number[], readonly init: number[], readonly omega: number) {
        this.results.push(init)
    }

    next(): number[] {
        let d = D(this.A)
        let l = L(this.A)
        let u = U(this.A)
        let inverseD: NumberRectangle = inverse(d)
        let inverseDOL: NumberRectangle = inverse(d.sub(l))
        let result = inverseDOL.mutip(u)
            .mutipColumnVector(this.results[this.results.length - 1])
            .plus(inverseDOL.mutipColumnVector(this.b)).rectangleItems[0]
        this.results.push(result)
        return result
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