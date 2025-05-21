import { TestBed } from '@angular/core/testing'; // Keep ComponentFixture if used, but it's not in the final snippet
import { AppComponent } from './app.component';
import { provideRouter, RouterOutlet } from '@angular/router'; // Import RouterOutlet
import { By } from '@angular/platform-browser'; // Import By

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'demo-test1' as title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('demo-test1');
  });

  // New test case
  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Important for template rendering
    const debugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(debugElement).not.toBeNull();
  });
});

