import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoParentComponent } from './demo-parent.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
