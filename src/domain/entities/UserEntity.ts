
export interface UserEntity {
    username: string;
    rol: AvilableRols;
}

export type AvilableRols = 'user' | 'bot';