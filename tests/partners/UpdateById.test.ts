import { testServer } from '../jest.setup';

describe('Partner - Update', () => {
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

        const partners = [
            {
                first_name: 'Caio',
                last_name: 'Augusto',
                cpf: '98598598595',
                percentage: 50,
            },
            {
                first_name: 'Joao',
                last_name: 'Victor',
                cpf: '98565235895',
                percentage: 50,
            },
            {
                first_name: 'Marcos',
                last_name: 'Antonio',
                cpf: '98565898563',
                percentage: 50,
            },
        ];

        const partner1 = await testServer
            .post('/partners?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(partners[0]);

        const partner2 = await testServer
            .post('/partners?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(partners[1]);

        const partner3 = await testServer
            .post('/partners?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(partners[2]);
    });

    test('Should update a activity by id', async () => {
        const res = await testServer
            .put(`/partners/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                email: 'lucasmontenegro@email.com',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update without a body', async () => {
        const res = await testServer
            .put(`/partners/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors.default');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update a collaborator without a token', async () => {
        const res = await testServer.put(`/partners/1`).send({
            email: 'lucasmontenegro@email.com',
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
