import { AxiosInstance } from "axios";

import { ParticipantBase } from '@/services/ParticipantBase';
import { RegisteredSpeaker } from '@/services/speakers';


export class SpeakerService extends ParticipantBase<RegisteredSpeaker> {
    constructor(axiosInstance: AxiosInstance, baseUrl: string) {
        super(axiosInstance, baseUrl);
    }

    async getAll(): Promise<RegisteredSpeaker[]> {
        return super.getAll();
    }

    async getById(id: number): Promise<RegisteredSpeaker> {
        return super.getById(id);
    }

    async create<EventSpeaker, RegisteredSpeaker>(entity: EventSpeaker): Promise<RegisteredSpeaker> {
        return super.create(entity);
    }
}