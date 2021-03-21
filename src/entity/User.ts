import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

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
    @Column({ default: (new Date()).getTime() })
    createTime?: number;

    /**
     * 修改时间
     */
    @Column({ default: (new Date()).getTime() })
    modifiedTime?: number;
    /**
     * 是否有效
     */
    @Column({ default: true })
    valid?: boolean;
}
