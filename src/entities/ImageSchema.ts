import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Fundraiser } from "./Fundraiser";
import { Organisation } from "./Organisation";

@ObjectType()
@Entity()
export class ImageSchema extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  Imgid: string;

  @Field()
  @Column("text")
  imagePath: string;

  @Field()
  @Column("text")
  fundraiserId: string;
  @Field(() => Fundraiser)
  @ManyToOne(() => Fundraiser, (fund) => fund.images)
  @JoinColumn({ name: "fundraiserId" })
  fundraiser: Fundraiser;

  @Field()
  @Column("text")
  orgId: string;
  @Field(() => Organisation)
  @ManyToOne(() => Organisation, (org) => org.description)
  @JoinColumn({ name: "orgId" })
  organisation: Organisation;
}
