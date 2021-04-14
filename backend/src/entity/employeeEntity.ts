import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class EmployeeEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @Column({type: "nvarchar", default: "", nullable: false})
  firstName: string

  @Column({type: "nvarchar", default: "", nullable: false})
  lastName: string

  @Column({type: "varchar", default: "", length: 12, nullable: false, unique: true})
  cccd: string

  @Column({type: "varchar", default: "", nullable: false})
  avatarUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean
}