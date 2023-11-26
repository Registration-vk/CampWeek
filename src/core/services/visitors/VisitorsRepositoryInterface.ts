import { EventVisitor, RegisteredVisitor } from '@/services/visitors';

export interface VisitorsRepositoryInterface {
    getAllVisitors: () => Promise<RegisteredVisitor[]>;
    getVisitorById: (visitorId: number) => Promise<RegisteredVisitor>;
    createVisitor: (visitor: EventVisitor) => Promise<RegisteredVisitor> 
}