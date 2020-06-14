import { TestBed, inject } from '@angular/core/testing';

import { TestLessonService } from './test-lesson.service';

describe('TestLessonService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ TestLessonService ]
		});
	});

	it(
		'should be created',
		inject([ TestLessonService ], (service: TestLessonService) => {
			expect(service).toBeTruthy();
		})
	);
});
