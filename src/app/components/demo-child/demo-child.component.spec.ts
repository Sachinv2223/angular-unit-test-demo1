import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChildComponent } from './demo-child.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('DemoChildComponent', () => {
  let component: DemoChildComponent;
  let fixture: ComponentFixture<DemoChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoChildComponent, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DemoChildComponent);
    component = fixture.componentInstance;
  });

  it('should create DemoChildComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a notification when notifyParent is called', () => {

    // spyOn is used to mock the method
    spyOn(component.notify, 'emit');
    // call the method
    component.notifyParent();
    // assert that the method was called
    expect(component.notify.emit).toHaveBeenCalledWith('Hello from child!');
  });

  it('should emit a notification only once when notifyParent is called once', () => {

    // spyOn is used to mock the method
    spyOn(component.notify, 'emit');
    // call the method
    component.notifyParent();
    // assert that the method was called
    expect(component.notify.emit).toHaveBeenCalledTimes(1);
  });

  it('should have a required input', () => {

    // for setting the required input for the component
    fixture.componentRef.setInput('value', 'test');

    // Check if the required input is set
    expect(component.value()).toBe('test');
  });

  it('should render the value in the template', () => {
    // for setting the required input for the component
    fixture.componentRef.setInput('value', 'test');

    // need to call detectChanges() when if your test interacts with the DOM, expects template updates, or relies on lifecycle hooks
    fixture.detectChanges();

    const valueElement = fixture.nativeElement.querySelector('[data-testid="child-value"]');
    expect(valueElement.textContent).toContain('Received from parent: test');
  });

  it('should call notifyParent when button is clicked', () => {
    // spyOn is used to mock the method
    // use callThrough to call the original method - so that the original method is called
    spyOn(component, 'notifyParent').and.callThrough();

    const button = fixture.nativeElement.querySelector('[data-testid="notify-parent-btn"]');
    button.click();

    expect(component.notifyParent).toHaveBeenCalled();
  });

  it('should initialize userName with the default value', () => {
    expect(component.userName()).toBe('John Doe from child');
  });

  it('should update userName value', () => {
    fixture.componentRef.setInput('userName', 'Jane Smith from parent');
    expect(component.userName()).toBe('Jane Smith from parent');
  });

  it('userName should be a signal (callable)', () => {
    expect(typeof component.userName).toBe('function');
    expect(component.userName()).toBeDefined();
  });

  it('should render the updated value of userName in the template', () => {
    fixture.componentRef.setInput('userName', 'Jane Smith from parent');
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();

    const userNameElement = fixture.nativeElement.querySelector('[data-testid="child-username-value"]');
    expect(userNameElement.textContent).toContain('Username: Jane Smith from parent');
  });

  it('should update username in p-tag when input value changes', async () => {
    // Arrange
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();
    await fixture.whenStable(); // Wait for all changes to complete

    const input = fixture.debugElement.query(By.css('[data-testid="username-input-field"]')).nativeElement;
    const testValue = 'testuser';

    // Act
    input.value = testValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Trigger change detection
    await fixture.whenStable(); // Wait for all changes to complete

    // Assert
    const pTag = fixture.debugElement.query(By.css('[data-testid="child-username-value"]')).nativeElement;
    expect(pTag.textContent).toContain(testValue);
  });


});
