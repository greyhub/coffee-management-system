import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index} from "typeorm"
import { EmployeeEntity } from "./employeeEntity";
import { OrderEntity } from "./orderEntity";
import { ProductEntity } from "./productEntity";

@Entity()
export class OrderProductEntity {
  @ManyToOne(type => OrderEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false, primary: true
  })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id'})
  @Index({unique: true})
  order: OrderEntity

  @ManyToOne(type => ProductEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false, primary: true
  })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id'})
  @Index({unique: true})
  product: ProductEntity

  @Column({type: "int", default: 0, nullable: false})
  count: number
}