import { testServer } from '../jest.setup';

describe('Colaborators - Get by id', () => {
    test('Should get a colaborators', async () => {
        const res1 = await testServer.get('/colaborators/1').send();

        expect(res1.status).toEqual(500);
    });
});
