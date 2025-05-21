import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoParentComponent } from './demo-parent.component';
import { DemoChildComponent } from '../demo-child/demo-child.component'; // Needed for By.directive and instance checks
import { By } from '@angular/platform-browser';

describe('DemoParentComponent', () => {
  let component: DemoParentComponent;
  let fixture: ComponentFixture<DemoParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoParentComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoParentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges(); 
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      expect(component.parentValue).toBe('Hello from parent!');
      expect(component.messageFromChild()).toBe('No message from child yet');
      expect(component.userName()).toBe('John Doe from parent');
    });
  });

  describe('Method Logic', () => {
    it('should update messageFromChild when onChildNotify is called', () => {
      const testMessage = 'Test message from child';
      component.onChildNotify(testMessage);
      expect(component.messageFromChild()).toBe(testMessage);
    });
  });

  describe('Child Component Interaction', () => {
    let childComponentInstance: DemoChildComponent;

    beforeEach(() => {
      fixture.detectChanges(); 
      const childComponentDebugElement = fixture.debugElement.query(By.directive(DemoChildComponent));
      if (!childComponentDebugElement) {
        throw new Error('Could not find DemoChildComponent. Ensure it is correctly imported and rendered by DemoParentComponent.');
      }
      childComponentInstance = childComponentDebugElement.componentInstance;
    });

    it('should pass parentValue to DemoChildComponent value input', () => {
      expect(childComponentInstance.value()).toBe(component.parentValue);
    });

    it('should update messageFromChild when DemoChildComponent emits notify event', () => {
      const testMessage = 'Event from child';
      childComponentInstance.notify.emit(testMessage); 
      expect(component.messageFromChild()).toBe(testMessage);
    });

    it("should update parent's userName when DemoChildComponent's userName model changes (two-way binding)", () => {
      const newChildUserName = 'Child Updated Name';
      childComponentInstance.userName.set(newChildUserName);
      fixture.detectChanges(); 
      expect(component.userName()).toBe(newChildUserName);
    });
    
    it("should update DemoChildComponent's userName when parent's userName signal changes (two-way binding)", () => {
      const newParentUserName = 'Parent Updated Name';
      component.userName.set(newParentUserName);
      fixture.detectChanges(); 
      expect(childComponentInstance.userName()).toBe(newParentUserName);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
        fixture.detectChanges(); 
    });

    it('should render the initial child message', () => {
        const messageElement = fixture.debugElement.query(By.css('[data-testid="child-message-display"]'));
        expect(messageElement).toBeTruthy();
        expect(messageElement.nativeElement.textContent).toContain('No message from child yet');
    });

    it('should render the updated child message after event', () => {
        const testMessage = 'Updated message for template';
        component.onChildNotify(testMessage);
        fixture.detectChanges(); 
        const messageElement = fixture.debugElement.query(By.css('[data-testid="child-message-display"]'));
        expect(messageElement.nativeElement.textContent).toContain(testMessage);
    });

    it("should render the parent's initial userName", () => {
        const userNameElement = fixture.debugElement.query(By.css('[data-testid="parent-username-display"]'));
        expect(userNameElement).toBeTruthy();
        expect(userNameElement.nativeElement.textContent).toContain('John Doe from parent');
    });

    it("should render the parent's updated userName", () => {
        const testUsername = 'Test Parent User Display';
        component.userName.set(testUsername);
        fixture.detectChanges(); 
        const userNameElement = fixture.debugElement.query(By.css('[data-testid="parent-username-display"]'));
        expect(userNameElement.nativeElement.textContent).toContain(testUsername);
    });

    it('should include app-demo-child component identified by data-testid', () => {
      const childComponentDebugElement = fixture.debugElement.query(By.css('[data-testid="demo-child-component"]'));
      expect(childComponentDebugElement).toBeTruthy();
      expect(childComponentDebugElement.componentInstance instanceof DemoChildComponent).toBeTrue();
    });
  });
});
