export interface EventFormData {
  name: string;
  link: string;
  add_link: string;
  date_time: Date;
  time_start: string;
  time_end: string;
  is_reg_needed: boolean;
  approved: boolean;
  description: string;
  add_info: string;
  notes: string;
  roles: string;
  region_id: number;
  creator_id: number;
}

export interface Event extends EventFormData {
  id: number;
}
