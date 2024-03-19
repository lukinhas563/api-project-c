import { testServer } from '../jest.setup';

describe('Colaborators - Update by id', () => {
    test('Should updated a colaborators', async () => {
        const res1 = await testServer.put('/colaborators/1').send();

        expect(res1.status).toEqual(500);
    });
});
