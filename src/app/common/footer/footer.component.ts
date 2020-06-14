import {Component, OnInit} from '@angular/core';
import {SocialNetwork, SocialsService} from '../socials/socials.service';

@Component({
    selector: 'in-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public socials: SocialNetwork[];

    constructor(private socialsService: SocialsService) {
    }

    ngOnInit() {
        // this.getSocials();
    }

    private getSocials(): void {
        this.socialsService.getSocials()
            .subscribe((socials: SocialNetwork[]) => {
                this.socials = socials;
            });
    }

    goToTop() {
      window.scrollTo(0, 0);
    }

}
