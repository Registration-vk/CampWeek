import { useQuery } from "@tanstack/react-query";

import { EventFormData, EventRepository } from '@/services/events';

import { $api } from '../axios';

const eventRepository = new EventRepository($api, '/api/v1/event');

export const useEventsAll = () => {
    const {data, isLoading, isError } = useQuery({
        queryKey: ['events/getAll'],
        queryFn: () => eventRepository.getAllEvents(),
    });

    return {
        events: data,
        isLoading,
        isError
    }
};

export const useEventById = (eventId: number) => {
    const {data, isLoading, isError } = useQuery({
        queryKey: ['events/getById', eventId],
        queryFn: () => eventRepository.getEventById(eventId),
    });

    return {
        event: data,
        isLoading,
        isError
    }
};

export const useCreateEvent = (event: EventFormData, isEnabled: boolean) => {
    return useQuery({
        queryKey: ['events/createEvent', event],
        queryFn: () => eventRepository.createEvent(event),
        enabled: isEnabled,
    });
};

