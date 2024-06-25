import axios from 'axios';

export default class RecordClient {
  private static instance: RecordClient;
  private client: any;

  private constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 5000,
    });
  }

  public static getInstance() {
    if (RecordClient.instance === undefined) {
      RecordClient.instance = new RecordClient();
    }
    return RecordClient.instance;
  }

  public async createMessage(messageData: { user_id_send: number; user_id_receive: number; message: string }): Promise<any> {
    const response = await this.client.post('/messages', messageData);
    return response.data;
  }

  public async getMessageById(id: number): Promise<any> {
    const response = await this.client.get(`/messages/received/${id}`);
    return response.data;
  }
  
}
