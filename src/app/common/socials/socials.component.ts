import {Component, Input, OnInit} from '@angular/core';
import {SocialNetwork, SocialsService} from './socials.service';

@Component({
    selector: 'in-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

    public socials: SocialNetwork[];
    @Input() public color: string;

    constructor(private socialsService: SocialsService) {
    }

    private getSocials(): void {
        this.socialsService.getSocials()
            .subscribe((socials: SocialNetwork[]) => {
                this.socials = socials;
        });
    }

    ngOnInit(): void {
        this.getSocials();
    }

}
