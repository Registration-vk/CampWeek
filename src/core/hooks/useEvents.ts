import { useQuery } from "@tanstack/react-query";

import { $api } from '../axios';
import { EventFormData, EventRepository } from '../services/events';

const eventRepository = new EventRepository($api, '/api/v1/event');

export const useEventsAll = () => {
    return useQuery({
        queryKey: ['events/getAll'],
        queryFn: () => eventRepository.getAllEvents(),
    });
};

export const useEventById = (eventId: number) => {
    return useQuery({
        queryKey: ['events/getById', eventId],
        queryFn: () => eventRepository.getEventById(eventId),
    });
};

export const useCreateEvent = (event: EventFormData, isEnabled: boolean) => {
    return useQuery({
        queryKey: ['events/createEvent', event],
        queryFn: () => eventRepository.createEvent(event),
        enabled: isEnabled,
    });
};

