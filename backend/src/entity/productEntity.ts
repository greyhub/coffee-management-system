import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class ProductEntity {
  @PrimaryColumn({type: "varchar", length: 5, nullable: false})
  id: string

  @Column({type: "varchar", default: "", length: 50, nullable: false})
  name: string

  @Column({type: "int", default: 0, nullable: false})
  price: number

  @Column({type: "varchar", default: "", nullable: false})
  description: string

  @Column({type: "varchar", default: "", nullable: false})
  previewUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean
}