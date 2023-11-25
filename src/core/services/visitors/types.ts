export interface EventVisitor {
    event_id: number;
    visitor_id: number;
}

export interface RegisteredVisitor extends EventVisitor {
    id: number;
}