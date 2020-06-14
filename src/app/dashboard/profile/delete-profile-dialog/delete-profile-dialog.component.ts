import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'in-delete-profile-dialog',
	templateUrl: './delete-profile-dialog.component.html',
	styleUrls: [ './delete-profile-dialog.component.scss' ]
})
export class DeleteProfileDialogComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

	ngOnInit() {}
}
