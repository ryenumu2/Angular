import { by, element } from 'protractor';

export class CarPage {

    getPriceButton() {
        return element(by.buttonText('Top 3 cars by price'));
    }

    getCarTableRow(row: number) {
        return element(by.css(`tbody tr:nth-child(${row})`)).getText();
    }

    getCarTableLastRow() {
        return element(by.css('tbody tr:last-child')).getText();
    }

    getCarTableRowCount() {
        return element.all(by.css('tbody tr')).count();
    }

    getCarTableText() {
        return element.all(by.css('tbody tr')).getText();
    }
}
