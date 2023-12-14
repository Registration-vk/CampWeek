export interface UserFormData {
  id: number;
  first_name: string;
  last_name: string;
  sex: number;
  city: string;
  bdate: string;
}

export interface User extends UserFormData {
  vk_id: number;
  region_id: any;
}
