import { testServer } from '../jest.setup';

describe('Companies - Get by id', () => {
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
    });

    test('Should get a company by id', async () => {
        const res = await testServer
            .get(`/companies/1?idCollaborator=1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);

        expect(res.body).toHaveProperty('result');
        expect(res.body).toHaveProperty('result.id');
        expect(res.body).toHaveProperty('result.company_name');
        expect(res.body).toHaveProperty('result.fantasy_name');
        expect(res.body).toHaveProperty('result.cnpj');
        expect(res.body).toHaveProperty('result.size');
        expect(res.body).toHaveProperty('result.tax_regime');
        expect(res.body).toHaveProperty('result.opening_date');
        expect(res.body).toHaveProperty('result.main_economic_activity');
        expect(res.body).toHaveProperty('result.id_collaborator');
        expect(res.body).toHaveProperty('result.id_user');
        expect(res.body).toHaveProperty('result.created_at');
        expect(res.body).toHaveProperty('result.updated_at');
        expect(res.body).toHaveProperty('result.secondaryEconomicActivity');

        expect(res.body.result.id).not.toBeNaN();
        expect(res.body.result.id).not.toBeNull();
        expect(res.body.result.id).not.toBeLessThan(0);

        expect(res.body.result.id_collaborator).not.toBeNaN();
        expect(res.body.result.id_collaborator).not.toBeNull();
        expect(res.body.result.id_collaborator).not.toBeLessThan(0);

        expect(res.body.result.id_user).not.toBeNaN();
        expect(res.body.result.id_user).not.toBeNull();
        expect(res.body.result.id_user).not.toBeLessThan(0);
    });

    test('Should not get a company without the idCollaborator querry', async () => {
        const res = await testServer
            .get(`/companies/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.default');
    });

    test('Should not get all without a token', async () => {
        const res = await testServer.get(`/companies/1?idCollaborator=1`).send();

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
