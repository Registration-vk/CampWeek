import { Event, EventFormData } from '@/core/services/events';

export interface EventsRepositoryInterface {
    getAllEvents: () => Promise<Event[]>;
    getEventById: (eventId: number) => Promise<Event>;
    createEvent: (event: EventFormData) => Promise<Event>;
}