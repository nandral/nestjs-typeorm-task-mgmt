import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as assert from 'assert';
import { randomBytes } from 'crypto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const username = `user-${randomBytes(4).toString('hex')}`;
  const password = 'Test@123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) /auth/signup ', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password })
      .expect(201);
  });

  it('(POST) /auth/signup - same username, should fail ', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password })
      .expect(409);
  });

  it('/auth/signin (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username, password })
      .expect(200);

    assert.ok(res.body.accessToken);
  });

  afterAll(async () => {
    await app.close();
  });
});
