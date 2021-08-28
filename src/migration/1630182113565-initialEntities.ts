import {MigrationInterface, QueryRunner} from "typeorm";

export class initialEntities1630182113565 implements MigrationInterface {
    name = 'initialEntities1630182113565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`address\` (\`Addressid\` char(36) NOT NULL, \`city\` text NOT NULL, \`state\` text NOT NULL, \`Country\` text NOT NULL, \`location\` text NOT NULL, \`pincode\` text NOT NULL, \`phoneCountryCode\` varchar(3) NOT NULL DEFAULT '+91', \`phone\` varchar(9) NULL, PRIMARY KEY (\`Addressid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`organisation\` (\`OrgId\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`interests\` text NOT NULL, \`userid\` varchar(255) NOT NULL, \`social_links\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT '2021-08-28 20:21:59', \`creatorUserId\` char(36) NULL, \`addressAddressid\` char(36) NULL, UNIQUE INDEX \`REL_221db54b0343a72dc0a0eb2df5\` (\`addressAddressid\`), PRIMARY KEY (\`OrgId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`image_schema\` (\`Imgid\` char(36) NOT NULL, \`imagePath\` text NOT NULL, \`fundraiserId\` char(36) NOT NULL, \`orgId\` char(36) NOT NULL, PRIMARY KEY (\`Imgid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`user\` (\`userId\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`bio\` text NOT NULL, \`lancels\` float NOT NULL DEFAULT '0', \`level\` float NOT NULL DEFAULT '1', \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`social_link\` varchar(255) NOT NULL, \`interests\` text NOT NULL, \`addressAddressid\` char(36) NULL, \`profilePicImgid\` char(36) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_703e68a3d29a874f160ac3797b\` (\`addressAddressid\`), UNIQUE INDEX \`REL_e557f4c2a9d61150d7999e1e72\` (\`profilePicImgid\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`fundraiser_contributors\` (\`fundraiserId\` char(36) NOT NULL, \`userId\` char(36) NOT NULL, PRIMARY KEY (\`fundraiserId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lancelot\`.\`fundraiser\` (\`FId\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`userId\` char(36) NOT NULL, \`orgId\` char(36) NULL, \`interests\` text NOT NULL, \`tags\` text NOT NULL, \`lancels\` float NOT NULL DEFAULT '0', \`verified\` tinyint NOT NULL DEFAULT 0, \`link\` varchar(255) NOT NULL, \`amount\` float NOT NULL DEFAULT '0', \`raised_amount\` float NOT NULL DEFAULT '0', \`start_date\` datetime NOT NULL DEFAULT '2021-08-28 20:21:59', \`end_date\` datetime NOT NULL, \`featured\` tinyint NOT NULL DEFAULT 0, \`type\` enum ('Environment', 'Community', 'Animal causes', 'Travel campaigns', 'Local businesses', 'Startups', 'Education', 'Women Empowerment', 'Creative projects', 'Personal', 'Other') NOT NULL DEFAULT 'Other', \`funds_usage\` text NOT NULL, \`about_me\` text NOT NULL, \`created_at\` datetime NOT NULL DEFAULT '2021-08-28 20:21:59', \`addressAddressid\` char(36) NULL, UNIQUE INDEX \`REL_e22ac9fb38d5d65c8ffb787bc2\` (\`addressAddressid\`), PRIMARY KEY (\`FId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`organisation\` ADD CONSTRAINT \`FK_2e89ed021bedd4af403225c7ded\` FOREIGN KEY (\`creatorUserId\`) REFERENCES \`Lancelot\`.\`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`organisation\` ADD CONSTRAINT \`FK_221db54b0343a72dc0a0eb2df57\` FOREIGN KEY (\`addressAddressid\`) REFERENCES \`Lancelot\`.\`address\`(\`Addressid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`image_schema\` ADD CONSTRAINT \`FK_d8f3f4248782af3f9b7822c69e5\` FOREIGN KEY (\`fundraiserId\`) REFERENCES \`Lancelot\`.\`fundraiser\`(\`FId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`image_schema\` ADD CONSTRAINT \`FK_bf0516f2ad9b95c2dc2a0b1deaa\` FOREIGN KEY (\`orgId\`) REFERENCES \`Lancelot\`.\`organisation\`(\`OrgId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`user\` ADD CONSTRAINT \`FK_703e68a3d29a874f160ac3797be\` FOREIGN KEY (\`addressAddressid\`) REFERENCES \`Lancelot\`.\`address\`(\`Addressid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`user\` ADD CONSTRAINT \`FK_e557f4c2a9d61150d7999e1e72e\` FOREIGN KEY (\`profilePicImgid\`) REFERENCES \`Lancelot\`.\`image_schema\`(\`Imgid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser_contributors\` ADD CONSTRAINT \`FK_1d194634b40b4850dfc25416727\` FOREIGN KEY (\`userId\`) REFERENCES \`Lancelot\`.\`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser_contributors\` ADD CONSTRAINT \`FK_4d4f3481cf4021554b6c0dda977\` FOREIGN KEY (\`fundraiserId\`) REFERENCES \`Lancelot\`.\`fundraiser\`(\`FId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` ADD CONSTRAINT \`FK_d31d6092fcb530cb819cba504c3\` FOREIGN KEY (\`userId\`) REFERENCES \`Lancelot\`.\`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` ADD CONSTRAINT \`FK_bb6d708a4c4732c4fdde49aac8c\` FOREIGN KEY (\`orgId\`) REFERENCES \`Lancelot\`.\`organisation\`(\`OrgId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` ADD CONSTRAINT \`FK_e22ac9fb38d5d65c8ffb787bc2e\` FOREIGN KEY (\`addressAddressid\`) REFERENCES \`Lancelot\`.\`address\`(\`Addressid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` DROP FOREIGN KEY \`FK_e22ac9fb38d5d65c8ffb787bc2e\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` DROP FOREIGN KEY \`FK_bb6d708a4c4732c4fdde49aac8c\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser\` DROP FOREIGN KEY \`FK_d31d6092fcb530cb819cba504c3\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser_contributors\` DROP FOREIGN KEY \`FK_4d4f3481cf4021554b6c0dda977\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`fundraiser_contributors\` DROP FOREIGN KEY \`FK_1d194634b40b4850dfc25416727\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`user\` DROP FOREIGN KEY \`FK_e557f4c2a9d61150d7999e1e72e\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`user\` DROP FOREIGN KEY \`FK_703e68a3d29a874f160ac3797be\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`image_schema\` DROP FOREIGN KEY \`FK_bf0516f2ad9b95c2dc2a0b1deaa\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`image_schema\` DROP FOREIGN KEY \`FK_d8f3f4248782af3f9b7822c69e5\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`organisation\` DROP FOREIGN KEY \`FK_221db54b0343a72dc0a0eb2df57\``);
        await queryRunner.query(`ALTER TABLE \`Lancelot\`.\`organisation\` DROP FOREIGN KEY \`FK_2e89ed021bedd4af403225c7ded\``);
        await queryRunner.query(`DROP INDEX \`REL_e22ac9fb38d5d65c8ffb787bc2\` ON \`Lancelot\`.\`fundraiser\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`fundraiser\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`fundraiser_contributors\``);
        await queryRunner.query(`DROP INDEX \`REL_e557f4c2a9d61150d7999e1e72\` ON \`Lancelot\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`REL_703e68a3d29a874f160ac3797b\` ON \`Lancelot\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`Lancelot\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`Lancelot\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`image_schema\``);
        await queryRunner.query(`DROP INDEX \`REL_221db54b0343a72dc0a0eb2df5\` ON \`Lancelot\`.\`organisation\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`organisation\``);
        await queryRunner.query(`DROP TABLE \`Lancelot\`.\`address\``);
    }

}
