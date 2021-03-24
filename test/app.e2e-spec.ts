import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('欢迎 / (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('简易投票服务')
      .end((err, res) => {
        done();
      });
  });

  //登录
  it('管理员登录 /auth/login (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login').send({
        userName: "admin",
        password: "admin"
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        token = res.body.data.token;
        done();
      });
  });

  // 添加候选人张三到系统
  let candidateId1: string;
  let candidateId2: string;
  it('添加候选人张三到系统 /candidate/add-candidate (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/candidate/add-candidate').auth(token, { type: "bearer" }).send({
        idCard: "A100001(2)",
        name: "张三"
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        candidateId1 = res.body.data.id;
        done();
      });
  });

  // 添加候选人李四到系统
  it('添加候选人李四到系统 /candidate/add-candidate (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/candidate/add-candidate').auth(token, { type: "bearer" }).send({
        idCard: "A100002(3)",
        name: "李四"
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        candidateId2 = res.body.data.id;
        done();
      });
  });

  //新增一场选举
  let electionId: string;
  it('新增一场选举 /election/create-election (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/election/create-election').auth(token, { type: "bearer" }).send({
        beginTime: new Date().getTime(),
        endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 5, // 五天后结束
        candidateIds: [
          candidateId1,
          candidateId2
        ]
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        electionId = res.body.data.id;
        done();
      });
  });


  //用户投票
  it('用户A投票给张三 /voter/vote (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/voter/vote').send({
        idCard: "U123456(1)",
        email: "350561378@qq.com",
        electionId: electionId,
        candidateId: candidateId1,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        done();
      });
  });

  it('用户B投票给李四 /voter/vote (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/voter/vote').send({
        idCard: "U123457(2)",
        email: "luan.boy@qq.com",
        electionId: electionId,
        candidateId: candidateId2,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).toEqual(0);
        done();
      });
  });

  // 查询候选人的投票结果
  it('查询张三的实时票数结果 /voter/query-vote-number/:electionId/:candidateId/:page/:pageSize (GET)', (done) => {
    return request(app.getHttpServer())
      .get(`/voter/query-vote-number/${electionId}/${candidateId1}/${1}/${10}`)
      .auth(token, { type: "bearer" })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.code).toEqual(0);
        done();
      });
  });


});
