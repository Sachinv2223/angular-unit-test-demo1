import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

// Add these imports:
import { By } from '@angular/platform-browser';
import { DemoParentComponent } from '../components/demo-parent/demo-parent.component';
import { TableComponent } from '../components/table/table.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // HomeComponent is standalone and imports DemoParentComponent and TableComponent.
      // So, they are available to be queried by directive.
      imports: [HomeComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // Moved from here
  });

  it('should create', () => {
    fixture.detectChanges(); // Call here for this specific test if it relies on rendered content or lifecycle hooks
    expect(component).toBeTruthy();
  });

  it('should have title as "Home"', () => {
    // No detectChanges needed as it's a direct property check
    expect(component.title).toBe('Home');
  });

  it('should render "Title: Home"', () => {
    fixture.detectChanges(); // Needed for DOM query
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Title: Home');
  });
  
  // --- New Tests Start Here ---
  describe('Child Component Integration and Data Binding', () => {
    beforeEach(() => {
      fixture.detectChanges(); // Ensure child components are rendered and inputs are set for this group of tests
    });

    it('should render app-demo-parent component', () => {
      const demoParentEl = fixture.debugElement.query(By.directive(DemoParentComponent));
      expect(demoParentEl).toBeTruthy();
    });

    it('should render app-table component', () => {
      const tableEl = fixture.debugElement.query(By.directive(TableComponent));
      expect(tableEl).toBeTruthy();
    });

    it("should pass myData to TableComponent's data input", () => {
      const tableComponentDebugElement = fixture.debugElement.query(By.directive(TableComponent));
      expect(tableComponentDebugElement).toBeTruthy('TableComponent not found');
      
      const tableComponentInstance = tableComponentDebugElement.componentInstance as TableComponent;
      expect(component.myData).toBeDefined(); 
      expect(tableComponentInstance.data()).toEqual(component.myData);
    });
  });
});
