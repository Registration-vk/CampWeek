import { AxiosInstance, AxiosResponse } from "axios";

import { ApiBase } from "@/services/ApiBase";
import { Event, EventFormData } from '@/services/events';


export class EventService extends ApiBase<Event> {
    constructor(axiosInstance: AxiosInstance, baseUrl: string) {
        super(axiosInstance, baseUrl);
    }

    async getAll(): Promise<Event[]> {
        return super.getAll();
    }

    async getById(id: number): Promise<Event> {
        return super.getById(id);
    }

    async create<EventFormData, Event>(entity: EventFormData): Promise<Event> {
        return super.create(entity);
    }
}