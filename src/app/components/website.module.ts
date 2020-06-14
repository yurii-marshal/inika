import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebsiteRoutingModule} from './website-routing.module';

import {HeaderComponent} from '../common/header/header.component';
import {LogoComponent} from '../common/logo/logo.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {HomePageHeroComponent} from './pages/home-page/home-page-hero/home-page-hero.component';
import {SocialsComponent} from '../common/socials/socials.component';

import {Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from '../common/navigation/navigation.component';
import {CoursesPageComponent} from './pages/courses-page/courses-page.component';
import {TestLessonFormBigComponent} from './test-lesson-form-big/test-lesson-form-big.component';
import {TextMaskModule} from 'angular2-text-mask';
import {TestLessonService} from './test-lesson/test-lesson.service';
import {FooterComponent} from '../common/footer/footer.component';
import {SocialsService} from '../common/socials/socials.service';
import {TestLessonFormSmallComponent} from './test-lesson-form-small/test-lesson-form-small.component';
import {CourseComponent} from './courses/course/course.component';
import {CoursesListComponent} from './courses/courses-list/courses-list.component';
import {CoursesService} from './courses/courses.service';
import {PageBannerComponent} from './pages/page-banner/page-banner.component';
import {PricesPageComponent} from './pages/prices-page/prices-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {PriceCalculatorComponent} from './price-calculator/price-calculator.component';
import {CurrencyPipe} from '../pipes/currency.pipe';

import {SlickModule} from 'ngx-slick';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WebsiteComponent} from './website/website.component';
import {LoginDialogComponent} from './pages/home-page/login-dialog/login-dialog.component';
import {MaterialModule} from '../material/material.module';
import {LoginDialogModule} from './pages/home-page/login-dialog/login-dialog.module';
import {SafeHtmlPipe} from '../pipes/sanitize.pipe';
import {OfferComponent} from './pages/offer/offer.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {TermsOfUseComponent} from './pages/terms-of-use/terms-of-use.component';

@NgModule({
    imports: [
        CommonModule,
        WebsiteRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Angular2FontawesomeModule,
        TextMaskModule,
        LoginDialogModule,
        MaterialModule,
        SlickModule.forRoot()
    ],
    declarations: [
        WebsiteComponent,
        HeaderComponent,
        LogoComponent,
        HomePageComponent,
        HomePageHeroComponent,
        LoginDialogComponent,
        SocialsComponent,
        NavigationComponent,
        CoursesPageComponent,
        TestLessonFormBigComponent,
        FooterComponent,
        TestLessonFormSmallComponent,
        CourseComponent,
        CoursesListComponent,
        PageBannerComponent,
        PricesPageComponent,
        ContactPageComponent,
        PriceCalculatorComponent,
        CurrencyPipe,
        SafeHtmlPipe,
        TestimonialsComponent,
        WebsiteComponent,
        OfferComponent,
        PrivacyPolicyComponent,
        TermsOfUseComponent
    ],
    providers: [
        SocialsService,
        TestLessonService,
        CoursesService
    ],
    bootstrap: [WebsiteComponent]
})
export class WebsiteModule {
}
