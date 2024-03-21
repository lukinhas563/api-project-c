import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') });

export const production: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        database: process.env.DATABASE,
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
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        },
    },
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};
