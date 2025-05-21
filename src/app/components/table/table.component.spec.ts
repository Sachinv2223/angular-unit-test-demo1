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
      imports: [TableComponent] // TableComponent is standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    // Important: Set the required input 'data' for the component
    fixture.componentRef.setInput('data', mockData); 
    fixture.detectChanges(); // Initial detection after setting input
  });

  it('should create TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchTerm()).toBe('');
    expect(component.currentPage()).toBe(1);
    expect(component.pageSize()).toBe(5); // Default pageSize (Adjusted from 10 to 5)
    // Check initial state of signals that depend on data
    expect(component.localData().length).toBe(mockData.length); 
  });
  
  describe('Component Methods', () => {
    it('onSearch should update searchTerm', () => {
      const testSearchTerm = 'test search';
      component.onSearch(testSearchTerm);
      expect(component.searchTerm()).toBe(testSearchTerm);
    });

    it('goToPage should update currentPage within valid range', () => {
      component.goToPage(2);
      // Assuming totalPages is dynamically calculated and might be > 1 with mockData and default pageSize
      // This test needs to be mindful of totalPages
      if (component.totalPages() >= 2) {
        expect(component.currentPage()).toBe(2);
      } else {
        expect(component.currentPage()).toBe(component.totalPages());
      }

      component.goToPage(0); // Should not go below 1
      expect(component.currentPage()).toBe(1);

      const highPageNumber = component.totalPages() + 1;
      component.goToPage(highPageNumber); // Should not exceed totalPages
      expect(component.currentPage()).toBe(component.totalPages());
    });

    it('copyRow should call navigator.clipboard.writeText with stringified row', async () => {
        const rowToCopy = { id: 1, name: 'Test Name', ACTION: 'copy' };
        const expectedString = JSON.stringify(rowToCopy, null, 2);
    
        // Mock navigator.clipboard.writeText
        const mockWriteText = jasmine.createSpy('writeText').and.resolveTo();
        spyOn(navigator.clipboard, 'writeText').and.callFake(mockWriteText);
    
        await component.copyRow(rowToCopy);
    
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedString);
      });
  });

  // --- NEW TESTS START HERE ---

  describe('Computed Signals', () => {
    // describe('localData signal', () => { // This describe block seems to be missing its closing part in the original provided snippet
    // For the filteredData fix, we target its specific beforeEach
    // The following is an assumption about where the localData tests are, to keep the diff minimal for the filteredData fix.
    // If localData tests are structured differently, the context for the next change might need adjustment.
    // For now, let's assume the structure allows targeting filteredData's beforeEach directly.

    describe('localData signal', () => { // Assuming this is the correct structure from the full file
      it("should add ACTION: 'copy' to each data row", () => {
        const input = [{ id: 1, name: 'Test' }];
        fixture.componentRef.setInput('data', input);
        const expectedOutput = [{ id: 1, name: 'Test', ACTION: 'copy' }];
        expect(component.localData()).toEqual(expectedOutput);
      });

      it('should be empty if input data is empty', () => {
        fixture.componentRef.setInput('data', []);
        expect(component.localData()).toEqual([]);
      });
    });

    describe('columns signal', () => {
      it('should derive column names from localData, including ACTION', () => {
        fixture.componentRef.setInput('data', [{ id: 1, name: 'Test', value: 'Sample' }]);
        expect(component.columns()).toEqual(['id', 'name', 'value', 'ACTION']);
      });

      it('should be empty if data (and thus localData) is empty', () => {
        fixture.componentRef.setInput('data', []);
        expect(component.columns()).toEqual([]);
      });
    });

    describe('filteredData signal', () => {
      beforeEach(() => {
        // Reset data to mockData for each filteredData test
        fixture.componentRef.setInput('data', mockData); // Reverted to simpler setInput
        // fixture.detectChanges(); // Ensure data is processed - commented out as per target
      });

      it('should find relevant items case-insensitively', () => { // Renamed for clarity
        component.searchTerm.set('john'); 
        // fixture.detectChanges(); // Optional: run if template bindings depend directly on filteredData or searchTerm for immediate reflection
        const filtered = component.filteredData();
        expect(filtered.length).toBe(2);
        // Check that both expected items are present, regardless of order
        expect(filtered.some(item => item.name === 'John Doe')).toBeTrue();
        expect(filtered.some(item => item.name === 'Alice Johnson')).toBeTrue();
      });

      it('should return all localData if search term is empty', () => {
        component.searchTerm.set('');
        expect(component.filteredData()).toEqual(component.localData());
      });

      it('should return empty array if no match found', () => {
        component.searchTerm.set('NonExistentNameXYZ');
        expect(component.filteredData()).toEqual([]);
      });

      it('should search across all stringified column values (e.g., age)', () => {
        component.searchTerm.set('30'); 
        expect(component.filteredData().length).toBe(1);
        const foundItem = component.filteredData().find(item => item.id === 1);
        expect(foundItem).toBeTruthy();
        expect(foundItem.name).toBe('John Doe');
      });
    });

    describe('totalPages signal', () => {
       beforeEach(() => {
        fixture.componentRef.setInput('data', mockData);
      });

      it('should be 1 if no data', () => {
        fixture.componentRef.setInput('data', []);
        expect(component.totalPages()).toBe(1);
      });

      it('should be 1 if data length is less than or equal to pageSize', () => {
        component.pageSize.set(5); 
        expect(component.totalPages()).toBe(1);
        
        component.pageSize.set(3); 
        expect(component.totalPages()).toBe(1);
      });

      it('should calculate correctly when data length exceeds pageSize', () => {
        component.pageSize.set(2); 
        expect(component.totalPages()).toBe(2); 
      });

      it('should calculate correctly when data length is a multiple of pageSize', () => {
        const sixItems = [ ...mockData, ...mockData.map(item => ({...item, id: item.id + mockData.length})) ]; 
        fixture.componentRef.setInput('data', sixItems);
        component.pageSize.set(2);
        expect(component.totalPages()).toBe(3);
        component.pageSize.set(3);
        expect(component.totalPages()).toBe(2);
      });
    });
    
    describe('pagedData signal', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('data', mockData); 
      });

      it('should handle last page correctly (even if not full)', () => {
        component.pageSize.set(2); 
        component.currentPage.set(2); 
        expect(component.pagedData().length).toBe(1);
        expect(component.pagedData()[0].id).toBe(mockData[2].id);
      });

      it('should return empty array if filteredData is empty', () => {
        fixture.componentRef.setInput('data', []); 
        expect(component.pagedData()).toEqual([]);
      });

      it('should return all items if pageSize covers all items', () => {
        component.pageSize.set(5); 
        component.currentPage.set(1);
        expect(component.pagedData().length).toBe(3);
        expect(component.pagedData()).toEqual(component.localData());
      });
    });
  });

  describe('Template Interaction Details', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges(); 
    });

    it('should have a search input field', () => {
        const searchInput = fixture.debugElement.query(By.css('[data-testid="search-input"]'));
        expect(searchInput).toBeTruthy();
    });
    
    it('search input should filter the table when typed into', () => {
        const searchInputEl = fixture.debugElement.query(By.css('[data-testid="search-input"]')).nativeElement;
        searchInputEl.value = 'Alice';
        // For [ngModel] and (ngModelChange), dispatching 'input' is standard.
        // If it were a reactive form, you might use control.setValue().
        searchInputEl.dispatchEvent(new Event('input')); 
        fixture.detectChanges(); // Reflect changes in the DOM
        
        const rows = fixture.nativeElement.querySelectorAll('tbody tr');
        expect(rows.length).toBe(1);
        expect(rows[0].textContent).toContain('Alice Johnson');
    });

    it('pagination controls should correctly display current page and total pages', () => {
      component.pageSize.set(1); 
      component.currentPage.set(2);
      fixture.detectChanges();
      const paginationElement = fixture.nativeElement.querySelector('div[style*="float: right;"] span');
      expect(paginationElement).toBeTruthy();
      expect(paginationElement.textContent).toContain('Page 2 of 3'); // mockData has 3 items
    });

    it("'Previous' button should be disabled on first page and enabled otherwise", () => {
      component.pageSize.set(1); 
      component.currentPage.set(1);
      fixture.detectChanges();
      const prevButton = fixture.debugElement.query(By.css('[data-testid="prev-page-btn"]')).nativeElement;
      expect(prevButton.disabled).toBeTrue();

      component.currentPage.set(2);
      fixture.detectChanges();
      expect(prevButton.disabled).toBeFalse();
    });

    it("'Next' button should be disabled on last page and enabled otherwise", () => {
      component.pageSize.set(1); 
      component.currentPage.set(3); // mockData has 3 items, so page 3 is the last page
      fixture.detectChanges();
      const nextButton = fixture.debugElement.query(By.css('[data-testid="next-page-btn"]')).nativeElement;
      expect(nextButton.disabled).toBeTrue();

      component.currentPage.set(2);
      fixture.detectChanges();
      expect(nextButton.disabled).toBeFalse();
    });
  });
});
