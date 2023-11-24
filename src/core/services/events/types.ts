export interface EventFormData {
    name: string;
    link: string;
    add_link: string;
    date_time: Date;
    time_start: string;
    time_end: string;
    is_reg_needed: boolean;
    approved: boolean;
    description: string;
    add_info: string;
    notes: string;
    region_id: number;
    creator_id: number;
      
    // meetingName: string;
    // meetingLink: string;
    // meetingDate: Date;
    // meetingStart: string;
    // meetingEnd: string;
    // isRegNeeded: boolean;
    // meetingAddLink: string;
    // meetingDsc: string;
    // meetingAddInfo: string;
    // meetingSpeakers: string[],
    // meetingSpeakerInfo: string;
    // meetingTarget: string[],
    // meetingNotes: string;
}

export interface Event extends EventFormData {
    id: number;
    name: string;
    link: string;
    add_link: string;
    date_time: Date;
    time_start: string;
    time_end: string;
    is_reg_needed: boolean;
    approved: boolean;
    description: string;
    add_info: string;
    notes: string;
    region_id: number;
    creator_id: number;
}