import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 投票人
 */
@Entity()
export class Voter {

    @ObjectIdColumn()
    id: ObjectID;

    /**
     * 身份证号(香港)
     */
    @Column({ unique: true })
    idCard: string;
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

    /**
     * 投票人
     * @param idCard 投票人身份证
     * @param email 投票人邮箱
     */
    constructor(idCard: string, email: string) {
        this.idCard = idCard;
        this.email = email;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
        this.valid = true;
    }

}
