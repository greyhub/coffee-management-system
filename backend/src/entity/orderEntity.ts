import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm"
import { EmployeeEntity } from "./employeeEntity";

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false})
  createAt: Date

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateAt: Date
  
  @ManyToOne(type => EmployeeEntity, {
    cascade: true, onDelete: "RESTRICT", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'importerId', referencedColumnName: 'id'})
  employee: EmployeeEntity
}