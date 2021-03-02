import { Component, OnInit } from '@angular/core';

import { Car } from '../models/car';
import { CarService } from '../cars/car.service';

@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.getCars();
    }

    getCars() {
        this.carService.getCars()
            .subscribe(data => this.cars = data);
    }

    getCarsByPrice() {
        this.carService.getCarsByPrice()
            .subscribe(data => this.cars = data);
    }
}
