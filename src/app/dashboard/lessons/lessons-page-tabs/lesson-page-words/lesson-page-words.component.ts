import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {TransitionsService} from '../../../../services/transitions.service';
import {LessonsApiService} from '../../../../services/api/lessons-api.service';

export interface Element {
  word: string;
  transcription: string;
  translate: string;
}

@Component({
  selector: 'in-lesson-page-words',
  templateUrl: './lesson-page-words.component.html',
  styleUrls: ['./lesson-page-words.component.scss'],
})

export class LessonPageWordsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['word', 'transcription', 'translate', 'delete'];
  dataSource = new MatTableDataSource<Element>([]);
  pageSizeOptions = [10, 20, 30];
  pageSize = 10;
  adminRole: boolean;
  hasTableEmptyElement: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren('inputs0') inputs0;
  @ViewChildren('inputs1') inputs1;
  @ViewChildren('inputs2') inputs2;

  constructor(private transitionsService: TransitionsService,
              public lessonsService: LessonsApiService) {
    this.transitionsService.currentLessonBuilderToggle.subscribe((data) => {
      this.adminRole = data;
    });
    this.transitionsService.currentLessonBuilderOnDataResponse.subscribe((data) => {
      this.dataSource = new MatTableDataSource<Element>(this.lessonsService.lessonEntity['wordsList']);
    });
  }

  ngOnInit() {
    this.checkOnEmptyWords();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  private checkOnEmptyWords() {
    this.hasTableEmptyElement = false;
    const list = this.lessonsService.lessonEntity['wordsList'];
    for (let i = 0; i < list.length; i++) {
      if (list[i]['word'] === '' || list[i]['translate'] === '') {
        this.hasTableEmptyElement = true;
        break;
      }
    }
  }

  public addRow() {
    this.checkOnEmptyWords();
    if (!this.hasTableEmptyElement) {
      this.lessonsService.lessonEntity['wordsList'].push({
        id: null,
        word: '',
        transcription: '',
        translate: ''
      });
    }
    this.dataSource = new MatTableDataSource(this.lessonsService.lessonEntity['wordsList']);
    this.hasTableEmptyElement = true;
    // this.dataSource.paginator = this.paginator;
  }

  public deleteRow(i) {
    const id = this.lessonsService.lessonEntity['wordsList'][i]['id'];
    if (id) {
      this.lessonsService.deleteWordById(id,
        (data) => {
          this.onDeleteRow(i);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.onDeleteRow(i);
    }
  }

  private onDeleteRow(i) {
    this.lessonsService.lessonEntity['wordsList'].splice(i, 1);
    this.dataSource = new MatTableDataSource(this.lessonsService.lessonEntity['wordsList']);
    this.checkOnEmptyWords();
  }

  public onEnterWord(ev, i) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      const inputEls = this.inputs1.toArray();
      inputEls[i].nativeElement.focus();
    }
  }

  public onEnterTranscription(ev, i) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      const inputEls = this.inputs2.toArray();
      inputEls[i].nativeElement.focus();
    }
  }

  public onEnterTranslate(ev, i) {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.addRow();
      setTimeout(() => {
        const inputEls = this.inputs0.toArray();
        // if ((ELEMENT_DATA.length - 1) % this.pageSize === 0) {
        //     this.paginator.pageIndex = ((ELEMENT_DATA.length - 1) / this.pageSize);
        //     // console.log(this.paginator.pageIndex);
        //     inputEls[0].nativeElement.focus();
        // } else {
        //     inputEls[i + 1].nativeElement.focus();
        // }
        inputEls[i + 1].nativeElement.focus();
      }, 100);
    }
  }
}
