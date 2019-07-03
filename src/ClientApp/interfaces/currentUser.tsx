export interface IcurrentUser {
    name: string;
    surname: string;    
    permission: number;
    email: string;
    enabled: boolean;
}

export interface ICurrentUserCookie {
    user?: IcurrentUser;
    isLogged?: boolean;
}