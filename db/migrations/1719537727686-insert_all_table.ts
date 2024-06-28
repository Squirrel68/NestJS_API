import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAllTable1719537727686 implements MigrationInterface {
    name = 'InsertAllTable1719537727686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`base_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`identify\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`sex\` varchar(255) NOT NULL, \`dob\` datetime NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`emergency_contact\` varchar(255) NOT NULL, \`place_of_origin\` varchar(255) NOT NULL, \`place_of_residence\` varchar(255) NOT NULL, \`current_address\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`user_type\` varchar(255) NOT NULL DEFAULT 'INTERN', \`role\` varchar(255) NOT NULL DEFAULT 'USER', \`bankID\` varchar(255) NOT NULL, \`taxID\` varchar(255) NOT NULL, \`basic_trainer_id\` varchar(255) NOT NULL, \`level\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`project_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`project_type\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`client_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`timesheet_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`date_time\` datetime NOT NULL, \`work_hours\` int NOT NULL, \`note\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'PENDING', \`project_id\` varchar(36) NULL, \`task_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branch_entity\` (\`id\` varchar(36) NOT NULL, \`is_active\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task_entity\` ADD CONSTRAINT \`FK_810905c71760664b91c926035a2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_entity\` ADD CONSTRAINT \`FK_e3aa6de75fab99f6d3737c62cfc\` FOREIGN KEY (\`client_id\`) REFERENCES \`client_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_60a9091da67e31b2c1b5a18562a\` FOREIGN KEY (\`project_id\`) REFERENCES \`project_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` ADD CONSTRAINT \`FK_0aa0d17349f460a69caf3a69986\` FOREIGN KEY (\`task_id\`) REFERENCES \`task_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_0aa0d17349f460a69caf3a69986\``);
        await queryRunner.query(`ALTER TABLE \`timesheet_entity\` DROP FOREIGN KEY \`FK_60a9091da67e31b2c1b5a18562a\``);
        await queryRunner.query(`ALTER TABLE \`project_entity\` DROP FOREIGN KEY \`FK_e3aa6de75fab99f6d3737c62cfc\``);
        await queryRunner.query(`ALTER TABLE \`task_entity\` DROP FOREIGN KEY \`FK_810905c71760664b91c926035a2\``);
        await queryRunner.query(`DROP TABLE \`branch_entity\``);
        await queryRunner.query(`DROP TABLE \`position_entity\``);
        await queryRunner.query(`DROP TABLE \`timesheet_entity\``);
        await queryRunner.query(`DROP TABLE \`project_entity\``);
        await queryRunner.query(`DROP TABLE \`task_entity\``);
        await queryRunner.query(`DROP TABLE \`client_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`base_entity\``);
    }

}
