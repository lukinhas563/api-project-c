import { testServer } from '../jest.setup';

describe('Partners - Delete', () => {
    let accessToken = '';

    beforeAll(async () => {
        await testServer.post('/register').send({
            user_name: 'testserver',
            first_name: 'Test',
            last_name: 'Server',
            cpf: '12345678911',
            email: 'test-server@email.com',
            password_hash: '1234567',
        });

        const loginUser = await testServer.post('/login').send({
            user_name: 'testserver',
            password_hash: '1234567',
        });

        accessToken = loginUser.body.accessToken;

        const collaborator = await testServer
            .post('/collaborators')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'teste1',
                last_name: 'test1',
                cpf: '78954252151',
                email: 'test1@email.com',
            });

        const company = await testServer
            .post('/companies')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                company_name: 'Joelma Miranda',
                fantasy_name: 'Escola de Danca',
                cnpj: '50.985.654/0001-01',
                size: 'me',
                tax_regime: 'simples nacional',
                opening_date: '11/09/1997',
                main_economic_activity: 'Vendedor',
                id_collaborator: 1,
            });

        const partner = await testServer
            .post('/partners?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'Caio',
                last_name: 'Augusto',
                cpf: '98598598595',
                percentage: 50,
            });
    });

    test('Should delete a partner', async () => {
        const res = await testServer
            .delete(`/partners/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('result');
    });

    test('Should not delete an nonexistent partner', async () => {
        const res = await testServer
            .delete(`/partners/199`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('errors.default');
    });

    test('Should not delete without a token', async () => {
        const res = await testServer.delete(`/partners/1`).send();

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
