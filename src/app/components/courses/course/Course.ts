import {Category} from '../Category';

export interface Course {
    name: string;
    image: string;
    description: string;
    currentStudents: number;
    order: number;
    inclass: boolean;
    level: {
        from: string;
        to: string
    };
    category: Category;
    prices: CoursePrice[];
}

export interface CoursePrice {
    currency: Currency;
    value: number;
    duration: number;
}

export interface Currency {
    name: string;
    sign: string;
}
