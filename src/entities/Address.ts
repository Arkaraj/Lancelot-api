import { Field, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  Addressid: string;

  @Field()
  @Column("text")
  city: string;

  @Field()
  @Column("text")
  state: string;

  @Field()
  @Column("text")
  Country: string;

  @Field()
  @Column("text")
  location: string;

  @Field()
  @Column("text")
  pincode: string;

  @Field()
  @Column("varchar", { default: "+91", length: 3 })
  phoneCountryCode: string;

  @Field()
  @Column("varchar", { nullable: true, length: 10 })
  phone: string;
}
