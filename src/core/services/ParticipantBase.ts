import { AxiosInstance, AxiosResponse } from "axios";


export abstract class ParticipantBase<T> {
    protected readonly baseUrl: string;
    protected readonly axiosInstance: AxiosInstance;

    protected constructor(axiosInstance: AxiosInstance, baseUrl: string) {
        this.axiosInstance = axiosInstance;
        this.baseUrl = baseUrl;
    }

    async getAll(): Promise<T[]> {
        const { data }: AxiosResponse<T[]> = await this.axiosInstance.get(
            this.baseUrl,
        );
        return data;
    }

    async getById(id: number): Promise<T> {
        const { data }: AxiosResponse<T> = await this.axiosInstance.get(
          `${this.baseUrl}/${id}`,
        );
        return data;
      }
    
      async create<T, K>(entity: T): Promise<K> {
        const { data }: AxiosResponse<K> = await this.axiosInstance.post(
          this.baseUrl,
          entity,
        );
        return data;
    }
}