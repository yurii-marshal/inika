export interface Student {
	id?: string;
	username: string;
	address?: string;
	activity?: string;
	phone?: string;
	skype?: string;
	email: string;
	courses?: any;
	teachers?: any;
	lessons?: number[];
	avatar_img?: string;
	avatar_thumb_url?: string;
	avatar_content_id?: string;
	permissions?: {}
	role_id?: string;
	file?: File;
	password?: string;
}
