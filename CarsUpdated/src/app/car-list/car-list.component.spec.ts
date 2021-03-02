import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CarListComponent } from './car-list.component';
import { Car } from '../models/car';
import { CarService } from '../cars/car.service';

const mockCars: Car[] = [{
    make: "Ferrari",
    model: "California T",
    year: 2017,
    doors: 2,
    price: 205000
}, {
    make: "Ford",
    model: "F-150",
    year: 2018,
    doors: 4,
    price: 30000
}];

describe('CarListComponent', () => {
    let component: CarListComponent;
    let fixture: ComponentFixture<CarListComponent>;

    beforeEach(async(() => {
        const carService = jasmine.createSpyObj('CarService', ['getCars']);
        carService.getCars.and.returnValue(of(mockCars));

        TestBed.configureTestingModule({
            declarations: [CarListComponent],
            providers: [
                { provide: CarService, useValue: carService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a table', async () => {
        await fixture.whenStable();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const table = compiled.querySelector('table');
        // console.log(table);
        expect(table.rows.length).toBe(3);
        expect(table.rows[0].cells[0].textContent).toBe('Make');
        expect(table.rows[1].cells[0].textContent).toBe('Ferrari');
        expect(table.rows[2].cells[0].textContent).toBe('Ford');
    });
});
