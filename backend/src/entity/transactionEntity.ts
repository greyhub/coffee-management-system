import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { EmployeeEntity } from "./employeeEntity";

@Entity()
export class TransactionEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @Column({type: "text", nullable: false})
  description: string

  @Column({type: "int", default: 0, nullable: false})
  price: number

  @Column({type: "nvarchar", nullable: false})
  supplierName: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  time: Date

  @ManyToOne(type => EmployeeEntity, {
    cascade: true, onDelete: "RESTRICT", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'importerId', referencedColumnName: 'id'})
  employee: EmployeeEntity
}