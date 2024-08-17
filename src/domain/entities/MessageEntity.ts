import { AvilableRols } from "./UserEntity";

export interface MessageEntity {
    id?: string;
    message: string;
    from: AvilableRols;
    createdAt?: Date;
}