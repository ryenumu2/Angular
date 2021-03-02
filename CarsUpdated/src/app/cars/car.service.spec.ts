import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CarService } from './car.service';
import { Car } from '../models/car';


const mockCars: Car[] = [{
    make: "Ferrari",
    model: "612 Scaglietti",
    year: 2008,
    doors: 2,
    price: 139900
}, {
    make: "Ford",
    model: "Fusion SE",
    year: 2016,
    doors: 4,
    price: 10495
}];

describe('CarService', () => {

    let httpTestingController: HttpTestingController;
    let serviceUrl = 'http://localhost:8080/CarService/jaxrs/cars';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        const service: CarService = TestBed.get(CarService);
        expect(service).toBeTruthy();
    });

    it('should return cars', inject([CarService], fakeAsync((service: CarService) => {
        let cars: Car[];
        service.getCars()
            .subscribe(data => cars = data);
        const req = httpTestingController.expectOne(serviceUrl);
        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        // Respond with mock data, causing Observable to resolve.
        req.flush(mockCars);
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
        // Cause all Observables to complete and check the results
        tick();
        expect(cars).toBeTruthy();
        expect(cars[0].make).toBe('Ferrari');
    })));

    it('should return filtered cars', inject([CarService], fakeAsync((service: CarService) => {
        let cars: Car[];
        service.getCarsByPrice()
            .subscribe(data => cars = data);
        const req = httpTestingController.expectOne(serviceUrl + '?filter=price');
        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        // Respond with mock data, causing Observable to resolve.
        // Return something different. This turns a single Car into Car[].
        req.flush([mockCars[1]]);
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
        // Cause all Observables to complete and check the results
        tick();
        expect(cars).toBeTruthy();
        expect(cars[0].make).toBe('Ford');
    })));

    it('should handle a 404 error', inject([CarService], fakeAsync((service: CarService) => {
        let errorResp: HttpErrorResponse;
        let errorReply: string;
        const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
        service.getCars()
            .subscribe(() => fail('Should not succeed'),
                error => errorReply = error);
        const req = httpTestingController.expectOne(serviceUrl);
        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        // Respond with error
        req.flush('Forced 404', {
            status: 404,
            statusText: 'Not Found'
        });
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
        // Cause all Observables to complete and check the results
        tick();
        expect(errorReply).toBe('Unable to contact service; please try again later.');
        expect(errorHandlerSpy).toHaveBeenCalled();
        errorResp = errorHandlerSpy.calls.argsFor(0)[0];
        expect(errorResp.status).toBe(404);
    })));

    it('should handle network error', inject([CarService], fakeAsync((service: CarService) => {
        let errorResp: HttpErrorResponse;
        let errorReply: string;
        const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
        service.getCars()
            .subscribe(() => fail('Should not succeed'),
                error => errorReply = error);
        const req = httpTestingController.expectOne(serviceUrl);
        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        // Create mock ErrorEvent, raised when something goes wrong at the network level.
        // Connection timeout, DNS error, offline, etc
        const mockError = new ErrorEvent('Network error', {
            message: 'simulated network error',
        });
        // Respond with mock error
        req.error(mockError);
        // Respond with error
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
        // Cause all Observables to complete and check the results
        tick();
        expect(errorReply).toBe('Unable to contact service; please try again later.');
        expect(errorHandlerSpy).toHaveBeenCalled();
        errorResp = errorHandlerSpy.calls.argsFor(0)[0];
        expect(errorResp.error.message).toBe('simulated network error');
    })));
});
