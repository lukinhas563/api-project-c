import { testServer } from '../jest.setup';

describe('Companies - Delete', () => {
    let accessToken = '';
    let idCompany = '';

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
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '78954252151',
                email: 'lucasmontenegro@email.com',
            });

        const idCollaborator = collaborator.body.return;

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
                id_collaborator: Number(idCollaborator),
            });

        idCompany = company.body.return;
    });

    test('Should delete a company', async () => {
        const res = await testServer
            .delete(`/companies/${idCompany}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('result');
    });

    test('Should not delete an nonexistent company', async () => {
        const res = await testServer
            .delete(`/companies/199`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('errors.default');
    });

    test('Should not delete without a token', async () => {
        const res = await testServer.delete(`/companies/${idCompany}`);

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
