import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 投票人投票记录
 */
@Entity()
export class VoteDetail {

    @ObjectIdColumn()
    id: ObjectID;
    /**
     * 投票人
     */

    @Column()
    voterId: string;
    /**
     * 哪一场选举(注：与voterId形成复合唯一键)
     */
    @Column()
    electionId: string;

    /**
     * 候选人
     */
    @Column()
    candidateId: string;

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
