import { api } from "./axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    messsage: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role : string
        status: boolean;
    }
}

export const loginRequest = async (data : LoginRequest) : Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "auth/login",
        data
    );

    return response.data;
}