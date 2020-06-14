export interface AuthData {
  id?: string;
  username: string;
  city?: string;
  activity?: string;
  phone?: string;
  skype?: string;
  email: string;
  courses?: number[];
  students?: number[];
  avatar_img?: string,
  avatar_thumb_url?: string,
  avatar_content_id?: string,
  permissions?: {}
  filter: {role_id: string};
}
