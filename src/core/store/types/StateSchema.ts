export interface StateSchema {
  user: UserSchema;
  events: EventsSchema;
  eventById: EventSchema;
}

export interface UserSchema {
  userId?: number | null;
  isAuth: boolean;
  isLoading: boolean;
  error?: string;
}

export interface EventsSchema {
  events: Meeting[];
  filteredEvents: Meeting[];
  roleFilters: string[];
  storedCities: string[];
  isLoading: boolean;
  error?: string;
}

export interface EventSchema {
  event: Meeting | null;
  isLoading: boolean;
  error?: string;
}

export interface Meeting {
  id: number;
  name: string;
  link: string;
  add_link: string;
  date_time: string;
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
