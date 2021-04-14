import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class EmployeeEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @Column({type: "nvarchar", default: "", nullable: false})
  firstName: string

  @Column({type: "nvarchar", default: "", nullable: false})
  lastName: string

  @Column({type: "date", nullable: true})
  birthday: Date

  @Column({type: "nvarchar", default: "", nullable: false})
  address: string

  @Column({type: "int", default: 0, nullable: false})
  position: number

  @Column({type: "date", nullable: false})
  joinDate: Date

  @Column({type: "date", nullable: false})
  expireDate: Date

  @Column({type: "int", default: 1, nullable: false})
  roleCode: number

  @Column({type: "varchar", default: "", length: 12, nullable: false, unique: true})
  cccd: string

  @Column({type: "varchar", default: "", nullable: false})
  avatarUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean

  @Column({type: "varchar", default: "", nullable: false})
  account: string  

  @Column({type: "varchar", default: "", nullable: false})
  hashPassword: string
}