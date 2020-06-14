import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {TransitionsService} from './services/transitions.service';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'inika';
  navIsFixed: boolean;
  @HostBinding('class.dialog-login-show') isLoginDialogOpened = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  constructor(private transitionService: TransitionsService,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const matContainer = document.getElementsByClassName('mat-sidenav-content');
      if (matContainer) {
        [].forEach.call(matContainer, function (el) {
          el.scrollTo(0, 0);
          // if (el.attributes.class.value === 'content mat-card') {
          //   // console.log(el.scrollTo(0, 0));
          //   el.scrollTo(0, 0);
          // }
        });
      }
    });
    const restoredToken = localStorage.getItem('auth-token');
    if (restoredToken) {
      this.auth.setToken(restoredToken);
    }
    this.transitionService.currentLoginDialogToggle.subscribe((data) => {
      this.isLoginDialogOpened = data;
    });
    // this.router.navigate(['dashboard/lessons', 1]);
    //  if (!localStorage.getItem('auth-token')) {
    //   this.router.navigate(['/']);
    // }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
