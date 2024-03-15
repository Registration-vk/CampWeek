import { EntityState } from "@reduxjs/toolkit";

export interface StateSchema {
  user: UserSchema;
  events: EventsSchema;
  eventById: EventSchema;
  visitor: CreateVisitorSchema;
}

export interface UserSchema {
  userId?: number | null;
  isAuth: boolean;
  isLoading: boolean;
  error?: string;
}

export interface EventsSchema extends EntityState<Meeting, number> {
  events: Meeting[];
  filteredEvents: Meeting[];
  roleFilters: string[];
  storedCities: string[];
  isLoading: boolean;
  error?: string;
  offset: number;
  limit: number;
  hasMore: boolean;
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

export interface CreateVisitor {
  event_id: number;
  visitor_id: number;
}

export interface CreateVisitorSchema {
  ids: CreateVisitor | null;
  isLoading: boolean;
  error?: string;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
