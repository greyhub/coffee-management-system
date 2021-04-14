import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class ProductEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @Column({type: "nvarchar", default: "", nullable: false})
  name: string

  @Column({type: "int", default: 0, nullable: false})
  price: number

  @Column({type: "nvarchar", default: "", nullable: false, length: 20000})
  description: string

  @Column({type: "varchar", default: "", nullable: false})
  previewUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean
}