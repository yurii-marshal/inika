import {TestBed, inject} from '@angular/core/testing';

import {SocialsService} from './socials.service';

describe('SocialsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SocialsService]
        });
    });

    it('should be created', inject([SocialsService], (service: SocialsService) => {
        expect(service).toBeTruthy();
    }));
});
