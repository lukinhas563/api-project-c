import { testServer } from '../jest.setup';

describe('Companies - Create', () => {
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
                first_name: 'Lucas',
                last_name: 'Montenegro',
                cpf: '11111111111',
                email: 'lucasmontenegro@email.com',
            });
    });

    test('Should create a new company', async () => {
        const res = await testServer
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

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toBe('object');
    });

    test('Should not create with same CNPJ', async () => {
        const res1 = await testServer
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

        const res2 = await testServer
            .post('/companies')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                company_name: 'Carmem Julia',
                fantasy_name: 'Limpeza e Armazem Ltda',
                cnpj: '50.985.654/0001-01',
                size: 'epp',
                tax_regime: 'lucro presumido',
                opening_date: '11/09/2020',
                main_economic_activity: 'Vendedor',
                id_collaborator: 1,
            });

        expect(res2.statusCode).toEqual(500);
        expect(typeof res2.body).toBe('object');
        expect(res2.body).toHaveProperty('errors.default');
    });

    test('Should not create with invalid infos', async () => {
        const res = await testServer
            .post('/companies')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                company_name: 'Jo',
                fantasy_name: 'Es',
                cnpj: '50.985.654',
                size: 'm',
                tax_regime: 'si',
                opening_date: '11',
                main_economic_activity: 'Ve',
                id_collaborator: 0,
            });

        expect(res.statusCode).toEqual(400);
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('errors.body.company_name');
        expect(res.body).toHaveProperty('errors.body.fantasy_name');
        expect(res.body).toHaveProperty('errors.body.cnpj');
        expect(res.body).toHaveProperty('errors.body.size');
        expect(res.body).toHaveProperty('errors.body.tax_regime');
        expect(res.body).toHaveProperty('errors.body.opening_date');
        expect(res.body).toHaveProperty('errors.body.main_economic_activity');
        expect(res.body).toHaveProperty('errors.body.id_collaborator');
    });

    test('Should to have all required fields', async () => {
        const res1 = await testServer
            .post('/companies')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                email: 'companyemail@email.com',
                status: 'encerrado',
            });

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
        expect(res1.body).toHaveProperty('errors.body.company_name');
        expect(res1.body).toHaveProperty('errors.body.fantasy_name');
        expect(res1.body).toHaveProperty('errors.body.cnpj');
        expect(res1.body).toHaveProperty('errors.body.size');
        expect(res1.body).toHaveProperty('errors.body.tax_regime');
        expect(res1.body).toHaveProperty('errors.body.opening_date');
        expect(res1.body).toHaveProperty('errors.body.main_economic_activity');
    });

    test('Should to have all fields', async () => {
        const res1 = await testServer
            .post('/companies')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({});

        expect(res1.statusCode).toEqual(400);
        expect(res1.body).toHaveProperty('errors');
    });

    test('Should not create without a token', async () => {
        const res1 = await testServer.post('/companies').send({});

        expect(res1.statusCode).toEqual(401);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
