import "reflect-metadata";
import { Md5 } from './lib/md5';
import { createConnection } from "typeorm";
import { User } from './entity/User';
import { bootstrap } from './main';

createConnection().then(async (connection) => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // 查询是否有管理员用户，如果没有则创建一个默认的用户 (演示用)
    const userCount = await connection.manager.count(User);
    if (userCount == 0) {
        const user = new User();
        user.userName = "admin";
        user.pwd = Md5.computedMd5("admin") //需加盐
        user.isManager = true;
        await connection.manager.save(user);
    }

    // console.log("Here you can setup and run express/koa/any other framework.");
    await bootstrap();
}).catch(error => console.log(error));