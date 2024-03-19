import { testServer } from '../jest.setup';

describe('Colaborators - Create', () => {
    test('Should create a new colaborator', async () => {
        const res1 = await testServer.post('/colaborators').send({
            first_name: 'Lucas',
            last_name: 'Montenegro',
            cpf: '11111111111',
            email: 'lucasmontenegro@email.com',
        });

        expect(res1.statusCode).toEqual(500);
        expect(typeof res1.body).toBe('object');
    });

    test('Do not to have a short field', async () => {
        const res1 = await testServer.post('/colaborators').send({
            first_name: 'Lu',
            last_name: 'Mo',
            cpf: '111111111',
            email: 'lucasmontenegro',
        });

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body).toHaveProperty('errors.body.first_name');
        expect(res1.body).toHaveProperty('errors.body.last_name');
        expect(res1.body).toHaveProperty('errors.body.cpf');
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    test('Should to have all fields', async () => {
        const res1 = await testServer.post('/colaborators').send({});

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');

        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cpf');
        expect(res1.body).toHaveProperty('errors.body.last_name');
        expect(res1.body).toHaveProperty('errors.body.first_name');
    });
});
