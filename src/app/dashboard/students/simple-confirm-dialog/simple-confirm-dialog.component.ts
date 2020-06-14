import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
	selector: 'in-simple-confirm-dialog',
	templateUrl: 'simple-confirm-dialog.component.html'
})
export class SimpleConfirmDialogComponent {
	constructor(public dialogRef: MatDialogRef<SimpleConfirmDialogComponent>) {
	}

	save() {
		this.dialogRef.close(true);
	}

	close() {
		this.dialogRef.close();
	}
}
