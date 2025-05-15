import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeAll(() => {
    console.log('calling beforeAll() in HomeService tests');
  });

  afterAll(() => {
    console.log('calling afterAll() in HomeService tests');
  });

  beforeEach(() => {
    console.log('calling beforeEach() in HomeService tests');
    // for simple, dependency-free services, we can use like this
    // service = new HomeService();

    // for services with dependencies, we can use the TestBed
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeService);
  });

  afterEach(() => {
    console.log('calling afterEach() in HomeService tests');
  });

  // Test to check if the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test to check if the addTwoNumbers method is working correctly
  it('should add two numbers and give the result', () => {
    expect(service.addTwoNumbers(2, 3)).toBe(5);
  });

  // Test to check if the subtractTwoNumbers method is working correctly
  it('should subtract two numbers and give the result', () => {
    expect(service.subtractTwoNumbers(5, 3)).toBe(2);
  });

  // Test to check if the multiplyTwoNumbers method is working correctly
  it('should multiply two numbers and give the result', () => {
    expect(service.multiplyTwoNumbers(2, 3)).toBe(6);
  });

  // Test to check if the divideTwoNumbers method is working correctly
  it('should divide two numbers and give the result', () => {
    expect(service.divideTwoNumbers(6, 3)).toBe(2);
  });

  // Test to check if the divideTwoNumbers method throws an error when dividing by zero
  it('should throw an error when dividing by zero', () => {
    expect(() => service.divideTwoNumbers(6, 0)).toThrowError('Cannot divide by zero');
  }); 

});
