import { useQuery } from "@tanstack/react-query";

import { EventVisitor, VisitorRepository } from '@/services/visitors';

import { $api } from '../axios';

const visitorRepository = new VisitorRepository($api, '/api/v1/eventvisitor');

export const useVisitorsAll = () => {
    const { data, isLoading, isError} = useQuery({
        queryKey: ['visitors/getAll'],
        queryFn: () => visitorRepository.getAllVisitors(),
    });

    return {
        visitors: data,
        isLoading,
        isError
    }
};

export const useVisitorById = (visitorId: number) => {
    const { data, isLoading, isError} = useQuery({
        queryKey: ['visitors/getById', visitorId],
        queryFn: () => visitorRepository.getVisitorById(visitorId),
    });

    return {
        visitor: data,
        isLoading,
        isError
    }
};

export const useCreateVisitor = (visitor: EventVisitor, isEnabled: boolean) => {
    const { data, isLoading, isError} = useQuery({
        queryKey: ['visitors/createEvent', visitor],
        queryFn: () => visitorRepository.createVisitor(visitor),
        enabled: isEnabled,
    });

    return {
        visitor: data,
        isLoading,
        isError
    }
};