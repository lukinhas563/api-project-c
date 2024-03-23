import { testServer } from '../jest.setup';

describe('Colaborators - Update by id', () => {
    test('Should updated a colaborators', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const createColaborator = await testServer.post('/colaborators').send({
            first_name: 'Lucas',
            last_name: 'Montenegro',
            cpf: '11111111111',
            email: 'lucasmontenegro@email.com',
            id_user: 1,
        });

        const res1 = await testServer.put('/colaborators/1').send({
            first_name: 'Grazielle',
            last_name: 'Montenegro',
            cpf: '33333333333',
            email: 'graziellemontenegro@email.com',
        });

        expect(res1.status).toEqual(200);
    });

    test('Should not update a colaborators', async () => {
        const createUser = await testServer.post('/register').send({
            user_name: 'lucassilva2',
            first_name: 'Lucas',
            last_name: 'Silva',
            cpf: '55555555555',
            email: 'lucassilva2@email.com',
            password_hash: '5as4d6as54d65ggas',
        });

        const createColaborator = await testServer.post('/colaborators').send({
            first_name: 'Lucas',
            last_name: 'Montenegro',
            cpf: '11111111111',
            email: 'lucasmontenegro@email.com',
            id_user: 1,
        });

        const res1 = await testServer.put('/colaborators/3').send({
            cpf: '33333333333',
        });

        expect(res1.status).toEqual(500);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body).toHaveProperty('errors.default');
    });
});
