import axios from 'axios';

export default class UserClient {
    private static instance: UserClient;
    private client: any;

    private constructor() {
        this.client = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
        });
    }

    public static getInstance() {
        if (UserClient.instance === undefined) {
          UserClient.instance = new UserClient();
        }
        return UserClient.instance;
    }
    
    public async checkAuth(userId: string, token: string): Promise<{ auth: boolean }> {
        const response = await this.client.get('/users/auth', {
          headers: { Authorization: `Bearer ${token}` },
          params: { user: userId }
        });
        return response.data;
    }
}