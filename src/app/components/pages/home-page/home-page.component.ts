import {Component, Inject, ViewChild, ElementRef, OnInit} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import 'slick-carousel/slick/slick';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
    selector: 'in-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    public slides: any[] = [
        {
            title: `Оставьте заявку на пробный урок`,
            text: `Наш методист свяжется с вами в ближайшее ` +
            `время и согласует удобное время бесплатного ` +
            `пробного занятия.`,
            image: {
                url: 'assets/images/process-1.jpg',
                alt: 'Process'
            }
        },
        {
            title: 'Пробное занятие',
            text: 'На пробном занятии наш методист оценит ваш уровень владения английским ' +
            'языком и составит персональные рекомендации для вашего преподавателя.',
            image: {
                url: 'assets/images/process-2.jpg',
                alt: 'Process'
            }
        },
        {
            title: 'Подбор преподавателя',
            text: 'Исходя из результатов пробного занятия, методист подберет вам преподавателя по интересам, ' +
            'темпераменту и желаемому расписанию занятий.',
            image: {
                url: 'assets/images/process-3.jpg',
                alt: 'Process'
            }
        },
        {
            title: 'Занятия',
            text: 'На уроках вы используете разнообразные оксфордские и кембриджские ' +
            'материалы, интерактивные упражнения, смотрите видео, слушаете новости и еще очень ' +
            'много всего полезного. Занятия носят живой и активный характер и ничуть не уступают ' +
            'традиционной подаче знаний в аудиториях, а во многих аспектах курсы английского ' +
            'языка по скайпу превосходят привычную форму обучения.',
            image: {
                url: 'assets/images/process-4.jpg',
                alt: 'Process'
            }
        }
    ];

    public slideConfig: any = {
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'prevArrow': '.in-slider-nav__button--prev',
        'nextArrow': '.in-slider-nav__button--next, .in-process__next',
        'slide': '.in-process__slide',
        'adaptiveHeight': true
    };

    // constructor() {
    // }
    constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    }

    public gotoTop(): void {
        // tslint:disable-next-line:max-line-length
        const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(
          {
            document: this.document,
            scrollTarget: '#scrollToTop',
            pageScrollDuration: 400
          });
        this.pageScrollService.start(pageScrollInstance);
    }

    ngOnInit() {
    }

}
