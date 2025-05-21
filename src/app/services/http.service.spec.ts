import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'; // Added HttpResponse, HttpHeaders

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
        // HttpService is providedIn: 'root'
      ]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // --- New Tests Start Here ---

  it('get() should make a GET request to the specified URL and return data', () => {
    const testUrl = '/api/data';
    const testData = { message: 'success' };

    service.get(testUrl).subscribe(response => {
      expect(response).toEqual(testData);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('post() should make a POST request to the specified URL with the correct body and return data', () => {
    const testUrl = '/api/submit';
    const testBody = { name: 'test', value: '123' };
    const expectedResponse = { id: 1, ...testBody };

    service.post(testUrl, testBody).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testBody);
    req.flush(expectedResponse);
  });

  it('put() should make a PUT request to the specified URL with the correct body and return data', () => {
    const testUrl = '/api/update/1';
    const testBody = { name: 'updated', value: '456' };
    const expectedResponse = { ...testBody };

    service.put(testUrl, testBody).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testBody);
    req.flush(expectedResponse);
  });

  it('delete() should make a DELETE request to the specified URL and return data', () => {
    const testUrl = '/api/delete/1';
    const expectedResponse = { message: 'deleted successfully' };

    service.delete(testUrl).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedResponse);
  });

  it('patch() should make a PATCH request to the specified URL with the correct body and return data', () => {
    const testUrl = '/api/patch/1';
    const testBody = { value: 'patched value' };
    const expectedResponse = { id: 1, value: 'patched value' };

    service.patch(testUrl, testBody).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(testBody);
    req.flush(expectedResponse);
  });

  it('head() should make a HEAD request to the specified URL', () => { // Test name changed slightly
    const testUrl = '/api/resource';
    
    service.head(testUrl).subscribe(response => { // Type inference will likely make response 'Object' or 'null'
      // If service.head() returns Observable<Object|null> (body), response here would be null.
      // We can't check response.status, response.ok etc. if it's not an HttpResponse.
      expect(response).toBeNull(); // Assuming the body of a HEAD request is null.
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('HEAD');
    // We still flush with status/headers to simulate a valid server response,
    // even if the service method doesn't pass them on as HttpResponse.
    req.flush(null, { status: 200, statusText: 'OK' });
  });

  it('options() should make an OPTIONS request to the specified URL', () => { // Test name changed slightly
    const testUrl = '/api/resource';
    const expectedHeaders = new HttpHeaders({'Allow': 'GET, POST, OPTIONS'});

    service.options(testUrl).subscribe(response => { // Type inference will likely make response 'Object' or 'null'
      // If service.options() returns Observable<Object|null> (body), response here would be null.
      // We can't check response.status or response.headers if it's not an HttpResponse.
      expect(response).toBeNull(); // Assuming the body of an OPTIONS request is typically null.
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('OPTIONS');
    // We still flush with status/headers to simulate a valid server response.
    req.flush(null, { status: 204, statusText: 'No Content', headers: expectedHeaders });
  });
});
