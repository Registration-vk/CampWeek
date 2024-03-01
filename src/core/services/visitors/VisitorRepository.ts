import { AxiosInstance } from "axios";

import {
  EventVisitor,
  RegisteredVisitor,
  VisitorService,
  VisitorsRepositoryInterface,
} from "@/services/visitors";

export class VisitorRepository implements VisitorsRepositoryInterface {
  private visitorService: VisitorService;

  constructor(axiosInstance: AxiosInstance, baseUrl: string) {
    this.visitorService = new VisitorService(axiosInstance, baseUrl);
  }

  async getAllVisitors(): Promise<RegisteredVisitor[]> {
    try {
      return await this.visitorService.getAll();
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }

  async getVisitorById(visitorId: number): Promise<RegisteredVisitor> {
    try {
      return await this.visitorService.getById(visitorId);
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }

  async createVisitor(visitor: EventVisitor): Promise<RegisteredVisitor> {
    try {
      return await this.visitorService.create(visitor);
    } catch (error) {
      throw new Error(`Произошла ошибка: ${error}`);
    }
  }
}
