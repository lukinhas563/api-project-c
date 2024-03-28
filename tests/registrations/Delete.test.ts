import { testServer } from '../jest.setup';

describe('Registrations - Delete', () => {
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

        const companies = [
            {
                company_name: 'Joelma Miranda',
                fantasy_name: 'Escola de Danca',
                cnpj: '50.985.654/0001-01',
                size: 'me',
                tax_regime: 'simples nacional',
                opening_date: '11/09/1997',
                main_economic_activity: 'Vendedor',
            },
            {
                company_name: 'Caio Castro Brothers',
                fantasy_name: 'Armazem e Funilaria Ltda',
                cnpj: '50.152.685/0001-01',
                size: 'me',
                tax_regime: 'simples nacional',
                opening_date: '11/09/1997',
                main_economic_activity: 'Vendedor',
            },
            {
                company_name: 'Marcos Mion Santos',
                fantasy_name: 'Limpeza e Lavagem',
                cnpj: '30.523.987/0001-01',
                size: 'epp',
                tax_regime: 'lucro presumido',
                opening_date: '11/09/1997',
                main_economic_activity: 'Vendedor',
            },
        ];

        const company1 = await testServer
            .post('/companies?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(companies[0]);

        const company2 = await testServer
            .post('/companies?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(companies[1]);

        const company3 = await testServer
            .post('/companies?idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(companies[2]);

        const registrations = [
            {
                type_record: 'Fiscal',
                value: 20,
            },
            {
                type_record: 'Fiscal',
                value: 20,
            },
            {
                type_record: 'Fiscal',
                value: 20,
            },
        ];

        const register1 = await testServer
            .post('/registrations?idCompany=1&idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(registrations[0]);

        const register2 = await testServer
            .post('/registrations?idCompany=1&idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(registrations[1]);

        const register3 = await testServer
            .post('/registrations?idCompany=1&idCollaborator=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(registrations[2]);
    });

    test('Should delete a register', async () => {
        const res = await testServer
            .delete(`/registrations/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('result');
    });

    test('Should not delete an nonexistent company', async () => {
        const res = await testServer
            .delete(`/registrations/199`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('errors.default');
    });

    test('Should not delete without a token', async () => {
        const res = await testServer.delete(`/registrations/1`).send();

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
