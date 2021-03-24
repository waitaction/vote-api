import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 投票人投票记录
 */
@Entity()
export class VoteDetail {

    @ObjectIdColumn()
    id: ObjectID;
    /**
     * 投票人身份证号 | 选举id | 候选人身份证号
     */

    @Column({ unique: true })
    uniqueId: string;

    /**
     * 投票人身份证号
     */
    @Column()
    voterId: string;

    /**
     * 选举id
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
        this.candidateId = candidateId;
        this.uniqueId = `${voterId}|${electionId}|${candidateId}`
        this.voterId = voterId;
        this.electionId = electionId;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
        this.valid = true;
    }
}
