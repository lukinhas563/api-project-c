import { testServer } from '../jest.setup';

describe('Colaborators - Get all', () => {
    test('Should get all colaborators', async () => {
        const res1 = await testServer.get('/colaborators').send();

        expect(res1.status).toEqual(500);
    });
});
