import {Injectable} from '@angular/core';
import {RequestsService} from '../requests.service';
import {LocalstorageService} from '../localstorage.service';

@Injectable()
export class CourseApiService {
	public currentCourseId: number;

	constructor(public httpService: RequestsService,
				private storageService: LocalstorageService) {
		this.currentCourseId = storageService.read('currentCourseId') || null;
	}

	// public getStudentsList(params, response, completeCallback) {
	//     this.httpService.get(
	//         `/students`,
	//         params,
	//         (data) => {
	//             response(data);
	//         },
	//         () => completeCallback,
	//         () => null
	//     );
	// }
	// public updateStudent(requestData, response, error) {
	//     this.httpService.post(
	//         `/update-student`,
	//         requestData,
	//         (data) => {
	//             response(data);
	//         },
	//         () => null,
	//         (err) => error(err)
	//     );
	// }
	// public deleteStudent(requestData, response, error) {
	//     this.httpService.delete(
	//         `/delete-student`,
	//         requestData,
	//         (data) => {
	//             response(data);
	//         },
	//         () => null,
	//         (err) => error(err)
	//     );
	// }
}
