import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Alice Johnson', age: 28 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
  });

  // tests if the component is created successfully
  it('should create TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of rows', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should render the correct columns including ACTION', () => {
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    const headerTexts = Array.from(headers).map((th: any) => th.textContent.trim());
    expect(headerTexts).toEqual(['ID', 'NAME', 'AGE', 'ACTION']);
  });

  it('should filter data based on search term', () => {
    component.onSearch('Jane');
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Jane Smith');
  });

  it('should reset to first page on search', () => {
    component.currentPage.update(() => 2);
    component.onSearch('Jane');
    expect(component.currentPage()).toBe(1);
  });

  it('should paginate data', () => {
    component.pageSize.update(() => 2);
    component.currentPage.update(() => 2);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Alice Johnson');
  });

  it('should not go to invalid page', () => {
    component.goToPage(0);
    expect(component.currentPage()).toBe(1);
    component.goToPage(100);
    expect(component.currentPage()).toBe(1);
  });

  it('should copy row data to clipboard when ACTION button is clicked', async () => {
    // Mock clipboard
    const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    fixture.detectChanges();
    const actionButtons = fixture.debugElement.queryAll(By.css('button'));
    actionButtons[0].nativeElement.click();
    fixture.detectChanges();
    expect(writeTextSpy).toHaveBeenCalledWith(JSON.stringify({ ...mockData[0], ACTION: 'copy' }, null, 2));
  });

  it('should show "No data available." if data is empty', () => {
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();
    const noDataText = fixture.nativeElement.querySelector('p');
    expect(noDataText.textContent).toContain('No data available.');
  });

  it('should display pagination controls only if totalPages > 1', () => {
    component.pageSize.update(() => 5);
    fixture.detectChanges();
    let pagination = fixture.nativeElement.querySelector('div[style*="float: right;"] span');
    expect(pagination).toBeNull();

    component.pageSize.update(() => 1);
    fixture.detectChanges();
    pagination = fixture.nativeElement.querySelector('div[style*="float: right;"] span');
    expect(pagination).not.toBeNull();
    expect(pagination.textContent).toContain('Page 1 of 3');
  });
});
