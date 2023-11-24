import { AxiosInstance } from 'axios';

import { Event, EventFormData, EventService, EventsRepositoryInterface } from '@/services/events';

export class EventRepository implements EventsRepositoryInterface {
    private eventService: EventService;

    constructor(axiosInstance: AxiosInstance, baseUrl: string) {
        this.eventService = new EventService(axiosInstance, baseUrl);
    }

    async getAllEvents(): Promise<Event[]> {
        try {
            return await this.eventService.getAll();
        } catch (error) {
            throw new Error(`Произошла ошибка: ${error}`);
        }
    }

    async getEventById(eventId: number): Promise<Event> {
        try {
            return await this.eventService.getById(eventId);
        } catch (error) {
            throw new Error(`Произошла ошибка: ${error}`);
        }
    }

    async createEvent(event: EventFormData): Promise<Event> {
        try {
            return await this.eventService.create(event);
        } catch (error) {
            throw new Error(`Произошла ошибка: ${error}`);
        }
    }
}