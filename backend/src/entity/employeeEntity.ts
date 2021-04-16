import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, BeforeInsert} from "typeorm"
import AuthorGroupRole from "../config/authorGroupRoleConfig"

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

  @Column({type: "nvarchar", nullable: false})
  position: string

  @Column({type: "date", nullable: false})
  joinDate: Date

  @Column({type: "date", nullable: false})
  expireDate: Date

  @Column({type: "int", default: AuthorGroupRole.ANY, nullable: false})
  roleCode: number

  @Column({type: "varchar", length: 12, nullable: false, unique: true})
  cccd: string

  @Column({type: "varchar", default: "", nullable: false})
  avatarUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean

  @Column({type: "varchar", nullable: false, unique: true})
  account: string  

  @Column({type: "varchar", nullable: false})
  hashPassword: string

  @Column({type: "varchar", nullable: false})
  password: string
}