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
    @Column()
    valid?: boolean;

    /**
     * 创建一个投票实例
     * @param voterId 投票人身份证号
     * @param candidateId 候选人身份证号
     * @param electionId 选举id
     */
    constructor(voterId, candidateId, electionId) {
        this.voterId = voterId;
        this.candidateId = candidateId;
        this.electionId = electionId;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
        this.valid = true;
    }
}
