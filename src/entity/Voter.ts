import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 投票人
 */
@Entity()
export class Voter {

    /**
     * 身份证号(香港)
     */
    @Column({ primary: true, unique: true, length: 10 })
    id: string;

    /**
     * 投票人邮箱
     */
    @Column()
    email: string;

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
