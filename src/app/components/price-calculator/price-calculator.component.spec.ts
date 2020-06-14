import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceCalculatorComponent} from './price-calculator.component';

describe('PriceCalculatorComponent', () => {
    let component: PriceCalculatorComponent;
    let fixture: ComponentFixture<PriceCalculatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceCalculatorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
