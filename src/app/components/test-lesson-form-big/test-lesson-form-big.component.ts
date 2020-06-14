import {Component, OnInit} from '@angular/core';
import {TestLessonFormBig} from './test-lesson-form-big';
import {TestLessonService} from '../test-lesson/test-lesson.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'in-test-lesson-form-big',
  templateUrl: './test-lesson-form-big.component.html',
  styleUrls: ['./test-lesson-form-big.component.scss']
})
export class TestLessonFormBigComponent implements OnInit {
  public submitted = false;
  public data: TestLessonFormBig = new TestLessonFormBig('', '', '', '');
  public thankYouMessage = 'Ваша заявка принята!';

  public phoneMask: Array<string | RegExp>;

  constructor(private testLessonService: TestLessonService,
              private toastr: ToastrService) {
    this.phoneMask = [
      '+',
      /[1-9]/,
      /[1-9]/,
      ' ',
      '(',
      /[0-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/
    ];
  }

  public sendForm(form): void {
    if (this.data.phone.length > 0) {
      this.data.phone = '+' + this.data.phone.replace(/\D+/g, '');
    } else {
      delete this.data.phone;
    }
    // console.log(this.data);
    this.testLessonService.createTestLessonRequest(this.data).subscribe((result: string) => {
      this.submitted = true;
      this.toastr.success('Спасибо! Запрос на пробный урок отправлен.');
      form.reset();
      setTimeout(() => {
        this.thankYouMessage = '';
      }, 5000);
    }, (error) => {
      this.toastr.error('Неверно введены данные', 'Ошибка');
    });
  }

  ngOnInit() {
  }
}
