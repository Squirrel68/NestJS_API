import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDataTypeFloat1719557119833 implements MigrationInterface {
    name = 'UpdateDataTypeFloat1719557119833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task_entity\` DROP FOREIGN KEY \`FK_810905c71760664b91c926035a2\``);
        await queryRunner.query(`ALTER TABLE \`task_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_3a49fb53a91a4dc855b0c7e8d34\``);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_42c1bb360257081fd5a74a29d95\``);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` DROP FOREIGN KEY \`FK_e3aa6de75fab99f6d3737c62cfc\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` CHANGE \`client_id\` \`client_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_b183087900e26c24bdf77f320ec\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_60a9091da67e31b2c1b5a18562a\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_0aa0d17349f460a69caf3a69986\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP COLUMN \`work_hours\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD \`work_hours\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`task_id\` \`task_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_8a3837422c16f64938224a786bd\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_64c4bc04accc0e6911d31299704\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`branch_id\` \`branch_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`position_id\` \`position_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` ADD CONSTRAINT \`FK_810905c71760664b91c926035a2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_3a49fb53a91a4dc855b0c7e8d34\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_42c1bb360257081fd5a74a29d95\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` ADD CONSTRAINT \`FK_e3aa6de75fab99f6d3737c62cfc\` FOREIGN KEY (\`client_id\`) REFERENCES \`client_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_b183087900e26c24bdf77f320ec\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_60a9091da67e31b2c1b5a18562a\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_0aa0d17349f460a69caf3a69986\` FOREIGN KEY (\`task_id\`) REFERENCES \`task_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_8a3837422c16f64938224a786bd\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_64c4bc04accc0e6911d31299704\` FOREIGN KEY (\`position_id\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_64c4bc04accc0e6911d31299704\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_8a3837422c16f64938224a786bd\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_0aa0d17349f460a69caf3a69986\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_60a9091da67e31b2c1b5a18562a\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_b183087900e26c24bdf77f320ec\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` DROP FOREIGN KEY \`FK_e3aa6de75fab99f6d3737c62cfc\``);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_42c1bb360257081fd5a74a29d95\``);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_3a49fb53a91a4dc855b0c7e8d34\``);
        await queryRunner.query(`ALTER TABLE \`task_entity\` DROP FOREIGN KEY \`FK_810905c71760664b91c926035a2\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`position_id\` \`position_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` CHANGE \`branch_id\` \`branch_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_64c4bc04accc0e6911d31299704\` FOREIGN KEY (\`position_id\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_8a3837422c16f64938224a786bd\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`task_id\` \`task_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP COLUMN \`work_hours\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD \`work_hours\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_0aa0d17349f460a69caf3a69986\` FOREIGN KEY (\`task_id\`) REFERENCES \`task_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_60a9091da67e31b2c1b5a18562a\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_b183087900e26c24bdf77f320ec\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` CHANGE \`client_id\` \`client_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` ADD CONSTRAINT \`FK_e3aa6de75fab99f6d3737c62cfc\` FOREIGN KEY (\`client_id\`) REFERENCES \`client_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_42c1bb360257081fd5a74a29d95\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_3a49fb53a91a4dc855b0c7e8d34\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` ADD CONSTRAINT \`FK_810905c71760664b91c926035a2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
