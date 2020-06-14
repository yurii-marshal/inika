import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoursesPageComponent} from './courses-page.component';

describe('CoursesComponent', () => {
    let component: CoursesPageComponent;
    let fixture: ComponentFixture<CoursesPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoursesPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
