import request from 'supertest'

describe('Integration: Home page', () => {

    // Putting dbModule in here means that dbModule is deleted
    // between "decribe()'s". This ensures the database is not
    // connected to more than once when running many test files.
    var dbModule = require("../../src/database/dbclient");
    var appModule = require("../../src/index");
    let app
    let db

    beforeAll((done) => {

        // can wire in testdb if so inclined
        dbModule.initDb((err, conn) => {
            if (err) throw err

            db = conn
            app = appModule.startApp()
            done()
        })

    });

    afterAll((done) => {
        app.close()
        db.close().then(done())
    });
    
    it('should say "Hello World!"', async () => {
        const response: request.Response = await request(app).get('/')

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
    it('should give a 404', async () => {
        const response: request.Response = await request(app).get('/404')
        
        expect(response.status).toBe(404);
        expect(response.text).toBe('Not Found');
    });
});


