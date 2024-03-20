import { knex } from 'knex';
import { development, production, test } from './Environment';

const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return production;
        case 'test':
            return test;
        case 'development':
            return development;
        default:
            return production;
    }
};

export const Knex = knex(getEnviroment());
