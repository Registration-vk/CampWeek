export interface EventSpeaker {
    event_id: number;
    speaker_id: number;
}

export interface RegisteredSpeaker extends EventSpeaker {
    id: number;
}