import { AxiosInstance } from "axios";

import {
  EventSpeaker,
  RegisteredSpeaker,
  SpeakerService,
  SpeakersRepositoryInterface,
} from "@/services/speakers";

export class SpeakerRepository implements SpeakersRepositoryInterface {
  private speakerService: SpeakerService;

  constructor(axiosInstance: AxiosInstance, baseUrl: string) {
    this.speakerService = new SpeakerService(axiosInstance, baseUrl);
  }

  async getAllSpeakers(): Promise<RegisteredSpeaker[]> {
    try {
      return await this.speakerService.getAll();
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }

  async getSpeakerById(speakerId: number): Promise<RegisteredSpeaker> {
    try {
      return await this.speakerService.getById(speakerId);
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }

  async createSpeaker(speaker: EventSpeaker): Promise<RegisteredSpeaker> {
    try {
      return await this.speakerService.create(speaker);
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }
}
