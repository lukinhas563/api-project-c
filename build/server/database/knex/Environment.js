"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.development = exports.production = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '..', '..', '..', '..', '.env') });
exports.production = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: 'root',
        password: process.env.PASSWORD,
        port: 3306,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, '..', 'seeds'),
    },
};
exports.development = {
    client: 'sqlite3',
    connection: {
        filename: path_1.default.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        afterCreate: (connection, done) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        },
    },
};
exports.test = Object.assign(Object.assign({}, exports.development), { connection: ':memory:' });
