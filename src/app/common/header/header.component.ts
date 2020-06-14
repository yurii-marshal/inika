import {Component, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {TransitionsService} from '../../services/transitions.service';

@Component({
    selector: 'in-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public color = '#ffffff';
    public logoType = 'basic';
    public socialsColor = '#ffffff';
    public home = true;

    constructor(private router: Router,
                private transitionService: TransitionsService) {
    }

    ngOnInit() {
      this.toggleHeader(this.router);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
              this.toggleHeader(event);
            }
        });
    }
    toggleHeader(event): void {
      if (event.url !== '/') {
        this.logoType = 'special';
        this.socialsColor = '#ffffff';
        this.color = '#ffffff';
        this.home = false;
      } else {
        this.logoType = 'basic';
        this.socialsColor = '#ffffff';
        this.color = '#ffffff';
        this.home = true;
      }
    }
    public openLoginDialog() {
        this.transitionService.transiteLoginDialogTrigger(true);
    }

}
