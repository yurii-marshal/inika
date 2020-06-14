import { Injectable } from '@angular/core';
import { RequestsService } from '../requests.service';

@Injectable()
export class DictionariesService {
	public dictionaries: Object = {};
	public convertedDTO: Object = {};
	public paymentGatewayList: Array<Object>;

	constructor(private httpService: RequestsService) {}

	public getDictionaries(response) {
		const that = this;
		this.httpService.get(
			`/dictionaries`,
			{},
			(data) => {
				that.dictionaries = data;
				that.convertedDTO = {};
				for (const prop in data) {
					if (!data.hasOwnProperty(prop)) {
						continue;
					}
					that.convertedDTO[prop] = {};
					for (let i = 0; i < data[prop].length; i++) {
						that.convertedDTO[prop][data[prop][i]['code']] = {
							title: data[prop][i]['description'],
							checkbox: false
						};
					}
				}
				if (response) {
					response(that.convertedDTO);
				}
			},
			() => null,
			() => null
		);
	}

	public getClearingCompanyList(response) {
		const that = this;
		this.httpService.get(
			`/clearingCompany`,
			{},
			(data) => {
				response(data);
			},
			() => null,
			() => null
		);
	}

	public getPaymentGatewayList(response) {
		const that = this;
		this.httpService.get(
			`/paymentGateway`,
			{},
			(data) => {
				that.paymentGatewayList = data;
				if (response) {
					response(that.paymentGatewayList);
				}
			},
			() => null,
			() => null
		);
	}
}
