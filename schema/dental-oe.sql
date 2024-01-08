CREATE TABLE IF NOT EXISTS `user`(
  `id` INTEGER NOT NULL,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `user_id_pk` PRIMARY KEY (`id` AUTOINCREMENT)
  CONSTRAINT `user_username_uq` UNIQUE (`username`)
);

CREATE TABLE IF NOT EXISTS `tool`(
  `id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `description` TEXT NULL,
  `quantity` INTEGER NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `tool_id_pk` PRIMARY KEY (`id` AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS `patient`(
  `id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `age` INTEGER NOT NULL,
  `phone` TEXT NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `patient_id_pk` PRIMARY KEY (`id` AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS `appointment`(
  `id` INTEGER NOT NULL,
  `date` DATETIME NOT NULL,
  `hour` INTEGER NOT NULL,
  `description` TEXT NULL,
  `patient_id` INTEGER NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `date_id_pk` PRIMARY KEY (`id` AUTOINCREMENT),
  CONSTRAINT `date_patient_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `treatment`(
  `id` INTEGER NOT NULL,
  `type` TEXT NOT NULL,
  `cost` INTEGER NULL,
  `payment` INTEGER NULL,
  `status` TEXT DEFAULT 'Vigente',
  `patient_id` INTEGER NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `treatment_id_pk` PRIMARY KEY (`id` AUTOINCREMENT),
  CONSTRAINT `treatment_patient_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `expedient`(
  `id` INTEGER NOT NULL,
  `number` TEXT NOT NULL,
  `treatment_id` INTEGER NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `expedient_id_pk` PRIMARY KEY (`id` AUTOINCREMENT),
  CONSTRAINT `expedient_treatment_id_fk` FOREIGN KEY (`treatment_id`) REFERENCES `treatment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `medical_file`(
  `id` INTEGER NOT NULL,
  `name` TEXT NOT NULL,
  `path` TEXT NOT NULL,
  `expedient_id` INTEGER NOT NULL,
  `created_at` DATE DEFAULT (DATETIME('now', 'localtime')),
  `updated_at` DATE NULL,
  CONSTRAINT `radiography_id_pk` PRIMARY KEY (`id` AUTOINCREMENT),
  CONSTRAINT `radiography_expedient_id_fk` FOREIGN KEY (`expedient_id`) REFERENCES `expedient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
