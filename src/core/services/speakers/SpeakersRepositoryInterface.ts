import { RegisteredSpeaker, EventSpeaker } from "@/core/services/speakers";

export interface SpeakersRepositoryInterface {
  getAllSpeakers: () => Promise<RegisteredSpeaker[]>;
  getSpeakerById: (eventId: number) => Promise<RegisteredSpeaker>;
  createSpeaker: (event: EventSpeaker) => Promise<RegisteredSpeaker>;
}
