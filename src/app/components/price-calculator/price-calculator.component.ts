import {Component, Input, OnInit} from '@angular/core';
import {CoursesService} from '../courses/courses.service';
import {Course, CoursePrice, Currency} from '../courses/course/Course';
import {Category} from '../courses/Category';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
    selector: 'in-price-calculator',
    templateUrl: './price-calculator.component.html',
    styleUrls: ['./price-calculator.component.scss']
})
export class PriceCalculatorComponent implements OnInit {

    @Input() public price: number;

    public selectedOption: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public selectedOptionControl: FormControl = new FormControl();

    public lessons = [
        {
            number: 1,
        },
        {
            number: 5,
            discount: 2
        },
        {
            number: 10,
            discount: 3
        },
        {
            number: 20,
            discount: 5
        },
        {
            number: 30,
            discount: 7
        }
    ];

    public sortedCourses: {
        category: Category,
        courses: Course[]
    }[] = [];

    public currentCategoryInfo: {
        category: Category,
        courses: Course[]
    };

    public currentInfo: {
        category: Category,
        courses: Course[]
    };

    public currentPrices: CoursePrice[];
    private pricesChange: Subject<void> = new Subject<void>();

    public priceOptions: number[] = [];

    public currencies: Currency[];
    public currentCurrency: Currency;

    public wantedLessons: number;
    public customDiscount = 10;

    public wantedLessonsControl = new FormControl();

    constructor(private coursesService: CoursesService) {
        this.wantedLessons = 40;
    }

    ngOnInit() {
        if (localStorage.getItem('currency')) {
            this.currentCurrency = JSON.parse(localStorage.getItem('currency'));
        }
        this.getData().subscribe(() => {

            this.selectedOption.subscribe((option: number) => {
                this.price = this.priceOptions[option - 1];
            });

            this.pricesChange.subscribe(() => {
                this.priceOptions = [];
                this.lessons.forEach((lesson: any) => {
                    this.currentPrices.forEach(price => {
                        this.priceOptions.push(lesson.number * price.value - lesson.number * price.value *
                            (lesson.discount ? lesson.discount : 0) / 100);
                    });
                });
                this.currentPrices.forEach(price => {
                    this.priceOptions.push(this.wantedLessons * price.value -
                        this.wantedLessons * price.value * (this.customDiscount ? this.customDiscount : 0) / 100);
                });
                this.price = this.priceOptions[this.selectedOption.getValue() - 1];
            });

            this.setCategory(this.sortedCourses[0].category.slug);

            this.selectedOptionControl.valueChanges
                .subscribe((value: number) => {
                    this.selectedOption.next(value);
                });

            this.selectedOptionControl.patchValue(1);

        });
        this.wantedLessonsControl.valueChanges
            .subscribe((value: number) => {
                this.wantedLessons = value;
                if (value >= 40) {
                    this.customDiscount = 10;
                }
                if (value >= 30 && value < 40) {
                    this.customDiscount = 7;
                }
                if (value >= 20 && value < 30) {
                    this.customDiscount = 5;
                }
                if (value >= 10 && value < 20) {
                  this.customDiscount = 3;
                }
                if (value >= 5 && value < 10) {
                  this.customDiscount = 2;
                }
                if (value < 5) {
                    this.customDiscount = 0;
                }
                this.pricesChange.next();
            });
        this.wantedLessonsControl.valueChanges
            .debounceTime(800)
            .subscribe((value: number) => {
                if (value < 2 || value > 999) {
                    this.wantedLessons = 40;
                }
                this.pricesChange.next();
            });
        this.wantedLessonsControl.patchValue(this.wantedLessons);

        window.scrollTo(0, 0);

    }

    private getData(): Observable<void> {
        return Observable.create(observer => {
            this.coursesService.getAll().subscribe((courses: Course[]) => {
                this.sortedCourses = courses.reduce((categories, currentValue: Course) => {
                    if (categories.findIndex(category => {
                            return category.slug === currentValue.category.slug;
                        }) === -1) {
                        categories.push(currentValue.category);
                    }
                    return categories;
                }, []).map((category: Category) => {
                    return {
                        category: category,
                        courses: courses.filter((course: Course) => {
                            return course.category.slug === category.slug;
                        }).sort((a, b) => {
                            if (a.order < b.order) {
                                return -1;
                            }
                            if (a.order > b.order) {
                                return 1;
                            }
                            return 0;
                        })
                    };
                });
                observer.next();
            });
        });
    }

    public setCategory(categorySlug: string): void {
        this.currentCategoryInfo = this.sortedCourses.find(item => {
            return item.category.slug === categorySlug;
        });
        this.setCourse(this.currentCategoryInfo.courses[0]);
    }

    public setCourse(selectedCourse: Course): void {
        this.currentInfo = JSON.parse(JSON.stringify(this.currentCategoryInfo));
        this.currentInfo.courses = this.currentInfo.courses.filter((course: Course) => {
            return course.name === selectedCourse.name;
        });
        this.getCurrencies();
    }

    private getCurrencies(): void {
        this.currencies = this.currentCategoryInfo.courses.reduce((currencies: Currency[], course: Course) => {
            course.prices.forEach((coursePrice: CoursePrice) => {
                if (currencies.findIndex(currency => currency.name === coursePrice.currency.name) === -1) {
                    currencies.push(coursePrice.currency);
                }
            });
            return currencies;
        }, []);
        this.setCurrency(this.currentCurrency || this.currencies[0]);
    }

    public setCurrency(currency: Currency): void {
        this.currentCurrency = currency;
        localStorage.setItem('currency', JSON.stringify(currency));
        this.currentPrices = this.currentInfo.courses[0].prices.filter((coursePrice: CoursePrice) => {
            return coursePrice.currency.name === currency.name;
        });
        this.pricesChange.next();
    }

}
