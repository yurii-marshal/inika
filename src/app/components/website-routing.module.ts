import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoursesPageComponent} from './pages/courses-page/courses-page.component';
import {PricesPageComponent} from './pages/prices-page/prices-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {WebsiteComponent} from './website/website.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {OfferComponent} from './pages/offer/offer.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {TermsOfUseComponent} from './pages/terms-of-use/terms-of-use.component';


const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'courses',
        component: CoursesPageComponent,
      },
      {
        path: 'prices',
        component: PricesPageComponent,
      },
      {
        path: 'contact',
        component: ContactPageComponent,
      },
      {
        path: 'offer',
        component: OfferComponent,
      },
      {
        path: 'privacypolicy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'termsofuse',
        component: TermsOfUseComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WebsiteRoutingModule {
}
