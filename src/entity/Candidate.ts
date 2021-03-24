import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

/**
 * 候选人
 */
@Entity()
export class Candidate {


    @ObjectIdColumn()
    id: ObjectID;

    /**
     * 身份证号(香港)
     */
    @Column({ unique: true })
    idCard: string;

    /**
     * 候选人姓名
     */
    @Column()
    name: string;

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
     * 创建候选人实例
     * @param idCard 候选人身份证
     * @param name 候选人姓名
     */
    constructor(idCard: string, name: string) {
        this.idCard = idCard;
        this.name = name;
        this.valid = true;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
    }

}
