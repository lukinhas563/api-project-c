import { testServer } from '../jest.setup';

describe('Employees - Update', () => {
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

        const employees = [
            {
                first_name: 'Lais',
                last_name: 'Santana',
                cpf: '98565985695',
            },
            {
                first_name: 'Mario',
                last_name: 'Santana',
                cpf: '98565452332',
            },
            {
                first_name: 'Joao',
                last_name: 'Vitor',
                cpf: '98565236595',
            },
        ];

        const employee1 = await testServer
            .post('/employees?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(employees[0]);

        const employee2 = await testServer
            .post('/employees?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(employees[1]);

        const employee3 = await testServer
            .post('/employees?idCompany=1')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(employees[2]);
    });

    test('Should update a employee by id', async () => {
        const res = await testServer
            .put(`/employees/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                first_name: 'Test Test Test',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('result');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update without a body', async () => {
        const res = await testServer
            .put(`/employees/1`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors.default');
        expect(res.body).toBeInstanceOf(Object);
    });

    test('Should not update a employee without a token', async () => {
        const res = await testServer.put(`/employees/1`).send({
            activity: 'Test Test Test',
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('errors.default');
    });
});
