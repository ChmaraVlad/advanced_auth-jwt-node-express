import { AxiosResponse } from "axios";
import $api from "../http";

import {  IUser } from "../models/response/IAuthResponse";

export default class AuthService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>>  {
        return $api.get<IUser[]>('/logout')
    }
}