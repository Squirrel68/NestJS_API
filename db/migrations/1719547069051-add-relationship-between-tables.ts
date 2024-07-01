import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBetweenTables1719547069051 implements MigrationInterface {
    name = 'AddRelationshipBetweenTables1719547069051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_project_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role\` varchar(255) NOT NULL DEFAULT 'DEV', \`user_id\` varchar(36) NULL, \`project_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`branch_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`position_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_60a9091da67e31b2c1b5a18562a\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_0aa0d17349f460a69caf3a69986\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`task_id\` \`task_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` DROP FOREIGN KEY \`FK_810905c71760664b91c926035a2\``);
        await queryRunner.query(`ALTER TABLE \`task_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` DROP FOREIGN KEY \`FK_e3aa6de75fab99f6d3737c62cfc\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` CHANGE \`client_id\` \`client_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_8a3837422c16f64938224a786bd\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_64c4bc04accc0e6911d31299704\` FOREIGN KEY (\`position_id\`) REFERENCES \`position_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_b183087900e26c24bdf77f320ec\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_60a9091da67e31b2c1b5a18562a\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_0aa0d17349f460a69caf3a69986\` FOREIGN KEY (\`task_id\`) REFERENCES \`task_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` ADD CONSTRAINT \`FK_810905c71760664b91c926035a2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` ADD CONSTRAINT \`FK_e3aa6de75fab99f6d3737c62cfc\` FOREIGN KEY (\`client_id\`) REFERENCES \`client_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_3a49fb53a91a4dc855b0c7e8d34\` FOREIGN KEY (\`user_id\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` ADD CONSTRAINT \`FK_42c1bb360257081fd5a74a29d95\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_42c1bb360257081fd5a74a29d95\``);
        await queryRunner.query(`ALTER TABLE \`user_project_entity\` DROP FOREIGN KEY \`FK_3a49fb53a91a4dc855b0c7e8d34\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` DROP FOREIGN KEY \`FK_e3aa6de75fab99f6d3737c62cfc\``);
        await queryRunner.query(`ALTER TABLE \`task_entity\` DROP FOREIGN KEY \`FK_810905c71760664b91c926035a2\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_0aa0d17349f460a69caf3a69986\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_60a9091da67e31b2c1b5a18562a\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_b183087900e26c24bdf77f320ec\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_64c4bc04accc0e6911d31299704\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_8a3837422c16f64938224a786bd\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` CHANGE \`client_id\` \`client_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` ADD CONSTRAINT \`FK_e3aa6de75fab99f6d3737c62cfc\` FOREIGN KEY (\`client_id\`) REFERENCES \`client_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` ADD CONSTRAINT \`FK_810905c71760664b91c926035a2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`task_id\` \`task_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` CHANGE \`project_id\` \`project_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_0aa0d17349f460a69caf3a69986\` FOREIGN KEY (\`task_id\`) REFERENCES \`task_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_60a9091da67e31b2c1b5a18562a\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`position_id\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`branch_id\``);
        await queryRunner.query(`DROP TABLE \`user_project_entity\``);
    }

}
