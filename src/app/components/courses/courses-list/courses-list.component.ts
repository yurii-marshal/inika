import {Component, Input, OnInit} from '@angular/core';
import {CoursesService} from '../courses.service';
import {Course} from '../course/Course';

@Component({
    selector: 'in-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

    @Input() public showHeader: boolean;
    @Input() public category: string;

    public courses: Course[];

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit() {
        this.getCourses();
    }

    private getCourses(): void {
        this.coursesService.getAll()
            .subscribe((courses: Course[]) => {
                this.courses = courses.filter((course: Course) => {
                    if (course.category.slug === this.category) {
                        return course;
                    }
                }).sort((a, b) => {
                    if (a.order < b.order) {
                        return -1;
                    }
                    if (a.order > b.order) {
                        return 1;
                    }
                    return 0;
                });
            });
    }

}
