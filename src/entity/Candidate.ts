import { Entity, ObjectIdColumn, ObjectID, Column, PrimaryColumn } from "typeorm";

/**
 * 候选人
 */
@Entity()
export class Candidate {

    /**
     * 身份证号(香港)
     */
    @Column({ primary: true, unique: true, length: 10 })
    id: string;

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

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.valid = true;
        this.createTime = new Date().getTime();
        this.modifiedTime = new Date().getTime();
    }

}
