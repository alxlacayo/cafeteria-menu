import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
    test('response content-type is application/json', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('application/json')
        );
    });

    test('response content-type is text/html', async () => {
        const response = await request(app)
            .get('/');
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('text/html')
        );
    });

    test('response object contains necessary properties', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(response.body).toStrictEqual(
            expect.objectContaining({
                menu: expect.objectContaining({
                    date: expect.any(String),
                    sections: expect.any(Array),
                    isDinnerMenu: expect.any(Boolean)
                }),
                settings: expect.any(Object)
            })
        );
    });
});

describe('GET /preview', () => {
    test('when date parameter is not set', async () => {
        const response = await request(app)
            .get('/preview');
        expect(response.statusCode).toBe(400);
    });

    test('when date parameter is incorrectly set', async () => {
        const response = await request(app)
            .get('/preview?date=somebadstring');
        expect(response.statusCode).toBe(400);
    });

    test('when dinner_menu parameter is set but not to "true"', async () => {
        const response = await request(app)
            .get('/preview?date=08-13-2021&dinner_menu=yes');
        expect(response.statusCode).toBe(400);
    });

    test('when date parameter is correctly set', async () => {
        const response = await request(app)
            .get('/preview?date=08-23-2021')
            .set('Accept', 'application/json');
        expect(response.body).toStrictEqual(
            expect.objectContaining({
                menu: expect.objectContaining({
                    date: expect.any(String),
                    sections: expect.any(Array),
                    isDinnerMenu: expect.any(Boolean)
                }),
                settings: expect.any(Object)
            })
        );
        expect(response.body.menu.isDinnerMenu).toBe(false);
    });

    test('when date & dinner_menu parameter are correctly set', async () => {
        const response = await request(app)
            .get('/preview?date=09-01-2021&dinner_menu=true')
            .set('Accept', 'application/json');
        expect(response.body).toStrictEqual(
            expect.objectContaining({
                menu: expect.objectContaining({
                    date: expect.any(String),
                    sections: expect.any(Array),
                    isDinnerMenu: expect.any(Boolean)
                }),
                settings: expect.any(Object)
            })
        );
        expect(response.body.menu.isDinnerMenu).toBe(true);
    });

    test('when no items exists for a date', async() => {
        const response = await request(app)
            .get('/preview?date=08-27-3021')
            .set('Accept', 'application/json');
        expect(response.body.menu.sections.length).toBe(0);
    });

    test('response content-type is application/json', async () => {
        const response = await request(app)
            .get('/preview?date=08-13-2021')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('application/json')
        );
    });

    test('response content-type is text/html', async () => {
        const response = await request(app)
            .get('/preview?date=08-13-2021');
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('text/html')
        );
    });
});

describe('GET page that does not exists', () => {
    test('response is 404', async () => {
        const response = await request(app)
            .get('/somebrokelink')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(404);
    });
});
