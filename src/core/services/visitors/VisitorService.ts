import { AxiosInstance } from 'axios';

import { RegisteredVisitor } from '@/services/visitors';

import { ParticipantBase } from '../ParticipantBase';

export class VisitorService extends ParticipantBase<RegisteredVisitor> {
    constructor(axiosInstance: AxiosInstance, baseUrl: string) {
        super(axiosInstance, baseUrl)
    }

    async getAll(): Promise<RegisteredVisitor[]> {
        return super.getAll();
    }

    async getById(id: number): Promise<RegisteredVisitor> {
        return super.getById(id);
    }

    async create<EventVisitor, RegisteredVisitor>(entity: EventVisitor): Promise<RegisteredVisitor> {
        return super.create(entity);
    }    
}