import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 选举详情表（注：一条记录为一场选举，每场选举关联候选人）
 */
@Entity()
export class ElectionDetail {

    @ObjectIdColumn()
    id: ObjectID;

    /**
     * 选择开始时间(时间戳)
     */
    @Column()
    beginTime: number;

    /**
     * 选择结束时间(时间戳)
     */
    @Column()
    endTime: number;

    /**
     * 候选人 （管理員可以在系統中添加候選⼈，不可移除候選⼈，⼀場選舉最少2個候選⼈）
     */
    candidateIds: Array<string>;

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

    constructor(beginTime: number, endTime: number, candidateIds: Array<string>) {
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.candidateIds = candidateIds;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
        this.valid = true;
    }
}
