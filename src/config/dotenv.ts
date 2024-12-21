import dotenv from 'dotenv';

export const globalEnvironment = (): void => {
    dotenv.config();
}