import { useQuery } from "@tanstack/react-query";

import { EventSpeaker, SpeakerRepository } from "@/services/speakers";

import { $api } from "../axios";

const speakerRepository = new SpeakerRepository($api, "/api/v1/eventspeaker");

export const useSpeakersAll = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["speakers/getAll"],
    queryFn: () => speakerRepository.getAllSpeakers(),
  });

  return {
    speakers: data,
    isLoading,
    isError,
  };
};

export const useSpeakerById = (speakerId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["speakers/getById", speakerId],
    queryFn: () => speakerRepository.getSpeakerById(speakerId),
  });

  return {
    speaker: data,
    isLoading,
    isError,
  };
};

export const useCreateSpeaker = (speaker: EventSpeaker, isEnabled: boolean) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["speakers/createEvent", speaker],
    queryFn: () => speakerRepository.createSpeaker(speaker),
    enabled: isEnabled,
  });

  return {
    speaker: data,
    isLoading,
    isError,
    isSuccessful: isSuccess,
  };
};
