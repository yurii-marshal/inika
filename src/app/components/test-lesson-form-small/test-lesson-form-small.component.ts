import { Component, OnInit } from '@angular/core';
// import {TestLessonFormSmall} from './test-lesson-form-small';
// import {TestLessonService} from '../test-lesson/test-lesson.service';

@Component({
	selector: 'in-test-lesson-form-small',
	templateUrl: './test-lesson-form-small.component.html',
	styleUrls: [ './test-lesson-form-small.component.scss' ]
})
export class TestLessonFormSmallComponent implements OnInit {
	public submitted = false;
	// public data: TestLessonFormSmall = new TestLessonFormSmall('');
	public thankYouMessage = 'Ваша заявка принята!';

	// constructor(private testLessonService: TestLessonService) {
	// }

	ngOnInit() {}

	scrolltoTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// public sendForm(): void {
	// this.testLessonService.createTestLessonRequest(this.data)
	//     .subscribe((result: string) => {
	//         if (result === 'Success') {
	//             this.submitted = true;
	//             setTimeout(() => {
	//                 this.thankYouMessage = '';
	//             }, 5000);
	//         }
	//     });
	// }
}
