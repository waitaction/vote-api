import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 选举详情表（注：一条记录为一场选举，每场选举关联候选人，）
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
