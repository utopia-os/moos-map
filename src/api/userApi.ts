import { createUser, passwordRequest, passwordReset, readMe, updateMe} from '@directus/sdk';
import {  directusClient } from './directus';
import { UserApi, UserItem } from 'utopia-ui/dist/types';


export class userApi implements UserApi {

  async register(email: string, password: string, userName: string): Promise<any> {
    try {
      return await directusClient.request(createUser({email: email, password: password, first_name: userName}));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await directusClient.login(email,password,{mode: 'json'});
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }


  async logout(): Promise<any> {
    try {
      return await directusClient.logout();
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async getUser(): Promise<any> {
    try {
      let user = await directusClient.request(readMe({ fields: ['*', { offers: ['*'], needs: ['*'] }] }));
      return user;
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

    async getToken(): Promise<any> {
    try {
    const token = await directusClient.getToken();
      return token;
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async updateUser(user: UserItem): Promise<any> {
    const { id, ...userRest } = user;
    try {
      const res = await directusClient.request(updateMe(userRest,{ fields: ['*', { offers: ['*'], needs: ['*'] }] }))
      return res as any;
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async requestPasswordReset(email:string, reset_url?:string): Promise<any> {
    try {
    return await directusClient.request(passwordRequest(email,reset_url));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async passwordReset(reset_token:string, new_password:string): Promise<any> {
    try {
    return await directusClient.request(passwordReset(reset_token, new_password));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

}









