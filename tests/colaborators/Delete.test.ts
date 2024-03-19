import { testServer } from '../jest.setup';

describe('Colaborators - Delete', () => {
    test('Should delete a colaborator', async () => {
        const res1 = await testServer.delete('/colaborators/1').send();

        expect(res1.status).toEqual(500);
    });
});
