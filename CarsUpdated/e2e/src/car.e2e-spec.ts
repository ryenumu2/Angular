import { browser, logging } from 'protractor';

import { AppPage } from './app.po';
import { CarPage } from './car.po';

describe('Car Page', () => {
    let appPage: AppPage;
    let carPage: CarPage;

    beforeEach(() => {
        appPage = new AppPage();
        carPage = new CarPage();
    });

    // This is one way to do it: there are more complete tests, but this is simple enough to demonstrate the idea
    it('should display cars filtered by price (1)', () => {
        appPage.navigateTo();
        carPage.getPriceButton().click();
        /*
         * In a different situation, we might be tempted to write a single method to get the table from the page
         * and then work with that through successive expects. This would be more efficient and also allow us to
         * check properties of the table that are not exposed directly by Protractor.
         * 
         * That isn't really the Protractor way: it is easier to use separate PageObject accessor methods for 
         * each "thing" we want to check.
         */
        expect(carPage.getCarTableRowCount()).toBe(3);
        expect(carPage.getCarTableRow(1)).toContain('Ferrari F40 2017');
        expect(carPage.getCarTableRow(2)).toContain('Tesla Roadster 2017');
        expect(carPage.getCarTableRow(3)).toContain('Chrysler Pacifica Hybrid 2018');
        // We could also do something like this:
        expect(carPage.getCarTableLastRow()).toContain('Chrysler Pacifica Hybrid 2018');
    });

    // Here is another way: this is only suitable for short tables like this one, but it does provide a simple way
    // to check the entire contents of the table.
    it('should display cars filtered by price (2)', () => {
        appPage.navigateTo();
        carPage.getPriceButton().click();
        expect(carPage.getCarTableText()).toEqual([
            'Ferrari F40 2017 2 $500,000.00',
            'Tesla Roadster 2017 2 $120,000.00',
            'Chrysler Pacifica Hybrid 2018 5 $40,000.00'
        ]);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
