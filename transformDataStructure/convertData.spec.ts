import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Middleware Integration Tests', () => {
  let app: any; // Declaring the variable to hold the instance of the NestJS application

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importing the AppModule for testing
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init(); // Initializing the NestJS application
  });

  afterAll(async () => {
    await app.close(); // Closing the NestJS application after all tests are done
  });

  it('should transform response structure', async () => {
    const response = await request(app.getHttpServer())
      .get('/') // Replace with your actual endpoint
      .expect(200); // Replace with the expected status code

    expect(response.body).toHaveProperty('status'); // Checking if the response body has the 'status' property
    expect(response.body).toHaveProperty('data'); // Checking if the response body has the 'data' property
    expect(typeof response.body.status).toBe('number'); // Checking if the 'status' property is of type 'number'
    // Add more assertions as needed to validate the structure and types of data
  });
});
