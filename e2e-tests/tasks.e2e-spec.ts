import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as assert from 'assert';
import { randomBytes } from 'crypto';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  const username = `user-${randomBytes(4).toString('hex')}`;
  const password = 'Test@123';
  let token: string;
  let id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username, password })
      .expect(200);
    token = res.body.accessToken;
  });

  //   it('(POST) /auth/signup ', async () => {});

  it('CREATE task ', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'task1', desc: 'task 1 desc' })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    expect(res.body.id).toBeDefined();
    id = res.body.id;
  });

  it('GET task by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.status).toEqual('OPEN');
  });

  it('GET all tasks - count should be ONE ', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('UPDATE task by id', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${id}/status`)
      .send({ status: 'IN_PROGRESS' })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.status).toEqual('IN_PROGRESS');
  });

  it('DELETE task by id', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('GET all tasks - count should be ZERO ', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toEqual(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
