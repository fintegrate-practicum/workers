import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
    public readonly auth0Domain: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.auth0Domain = this.configService.get('AUTH0_DOMAIN');
    }

    async getUser(userId: string): Promise<any> {
        try {
            const token = await this.getAccessToken();
            const apiUrl = `${this.auth0Domain}/api/v2/users/${userId}`;
            const response: AxiosResponse = await this.httpService
                .get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .toPromise();
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(userId: string, updateUserData: any): Promise<any> {
        try {
            const token = await this.getAccessToken();
            const apiUrl = `${this.auth0Domain}/api/v2/users/${userId}`;
            const response: AxiosResponse = await this.httpService
                .patch(apiUrl, updateUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .toPromise();
            return response.data;
        }
        catch (error) {
            console.log(error)
        }
    }

    public async getAccessToken(): Promise<string> {
        const clientId = this.configService.get('AUTH0_CLIENT_ID');
        const clientSecret = this.configService.get('AUTH0_CLIENT_SECRET');
        const audience = this.configService.get('AUTH0_AUDIENCE');
        const tokenUrl = `https://${this.auth0Domain}/oauth/token`;

        try {
            const response: AxiosResponse = await this.httpService
                .post(tokenUrl, {
                    grant_type: 'client_credentials',
                    client_id: clientId,
                    client_secret: clientSecret,
                    audience: audience,
                })
                .toPromise();
            return response.data.access_token
        } catch (error) {
            console.log(error)
        }
    }
}
