import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChildComponent } from './demo-child.component';

describe('DemoChildComponent', () => {
  let component: DemoChildComponent;
  let fixture: ComponentFixture<DemoChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoChildComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
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

});
