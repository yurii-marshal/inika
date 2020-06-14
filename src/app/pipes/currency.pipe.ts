import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from '../components/courses/course/Course';

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

    transform(value: number, currency: Currency): string {
        let result = '';
        switch (currency.name) {
            case 'USD': {
                result = `${currency.sign}${value}`;
                break;
            }
            default: {
                result = `${value} ${currency.sign}`;
                break;
            }
        }
        return result;
    }

}
