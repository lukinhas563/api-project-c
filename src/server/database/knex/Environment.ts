import { Knex } from 'knex';
import path from 'path';

export const production: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        database: process.env.DATA_BASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 3306,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
};
export const development: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        database: process.env.DATA_BASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 3306,
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};
