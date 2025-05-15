import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  addTwoNumbers(a: number, b: number): number {
    return a + b;
  }

  subtractTwoNumbers(a: number, b: number): number {
    return a - b;
  }

  multiplyTwoNumbers(a: number, b: number): number {
    return a * b;
  }

  divideTwoNumbers(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}
