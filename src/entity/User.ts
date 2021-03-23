import { Entity, ObjectIdColumn, ObjectID, Column, EntityRepository, BaseEntity } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    /**
     * 用户名
     */
    @Column()
    userName: string;

    /**
     * 密码(md5)
     */
    @Column()
    pwd: string;

    /*
     *是否管理员
     */
    @Column()
    isManager: boolean;
    /**
     * 创建时间
     */
    @Column()
    createTime?: number;

    /**
     * 修改时间
     */
    @Column()
    modifiedTime?: number;
    /**
     * 是否有效
     */
    @Column({ default: true })
    valid?: boolean;

    constructor(userName: string, pwd: string, isManager: boolean) {
        this.userName = userName;
        this.pwd = pwd;
        this.isManager = isManager;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
        this.valid = true;
    }
}
