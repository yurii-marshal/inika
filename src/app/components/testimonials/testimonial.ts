export class Testimonial {
    constructor(public authorName: string,
                public authorPhoto?: string,
                public text?: string,
                public video?: string) {
    }

    public state = 'active';
    public view = 'small';

    setView(newView: 'small' | 'full') {
        this.view = newView;
    }

    public setState(newState: 'active' | 'inactive') {
        this.state = newState;
    }
}
