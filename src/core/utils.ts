import { SelectOption } from "@/components/ui/SelectField/SelectField";
import { User } from "@/services/users";

import { RegisteredSpeaker } from "./services/speakers";
import { RegisteredVisitor } from "./services/visitors";

export const filterOptions = (options: SelectOption[], selectedValues?: string[]) => {
  if (!selectedValues) {
    return [];
  }

  return options.filter((option) => selectedValues.includes(option.value));
};

export const registerForEvent = (isEnabled: boolean) => {
  window.location.reload();
};

export const getParticipants = (
  participants: RegisteredSpeaker[] | RegisteredVisitor[],
  users: User[],
  eventId: number,
) => {
  const filteredParticipants = participants?.filter(
    (participant) => participant.event_id === eventId,
  );
  const participantsIds = filteredParticipants.map((participant) => {
    if ("speaker_id" in participant) {
      return participant.speaker_id;
    } else {
      return participant.visitor_id;
    }
  });

  return users.flatMap((user) => {
    if (participantsIds?.includes(user.id)) {
      return `${user.first_name} ${user.last_name}`;
    }
    return [];
  });
};

export function compareArrays(array1: string[], array2: string[]) {
  for (const element of array2) {
    if (!array1.includes(element)) {
      return false;
    }
  }
  return true;
}
