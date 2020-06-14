import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TransitionsService} from '../../../../services/transitions.service';

@Component({
  selector: 'in-add-exercise-menu',
  templateUrl: './add-exercise-menu.component.html',
  styleUrls: ['./add-exercise-menu.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AddExerciseMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('addSentenceSection') field;
  @Input() isAdminRole: boolean;
  @Output() onAddExercise: EventEmitter<any> = new EventEmitter();
  public isExerciseSectionOpened: boolean;
  public isItemForCover: boolean;

  constructor(private transitionsService: TransitionsService,
              private _eref: ElementRef) {
    this.isExerciseSectionOpened = false;
    // // console.log(this.field.nativeElement.getBoundingClientRect().top);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkOnHeight();
  }

  public addExercise(type: number): void {
    // console.log(type);
    this.onAddExercise.emit(type);
    this.toggleMenuSection();
  }

  public toggleMenuSection() {
    this.isExerciseSectionOpened = !this.isExerciseSectionOpened;
    this.checkOnHeight();
  }

  public checkOnHeight() {
    if (this.field.nativeElement.getBoundingClientRect().top > 0) {
      this.isItemForCover = this.field.nativeElement.getBoundingClientRect().top > 450;
    }
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isExerciseSectionOpened = false;
    }
  }
}
