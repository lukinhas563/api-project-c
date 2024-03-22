import { testServer } from '../jest.setup';

describe('Colaborators - Update by id', () => {
    test('Should updated a colaborators', async () => {
        const res1 = await testServer.put('/colaborators/1').send({
            first_name: 'Lucas',
            last_name: 'Montenegro',
            cpf: '11111111111',
            email: 'lucasmontenegro@email.com',
            id_user: 1,
        });

        expect(res1.status).toEqual(500);
    });
});
