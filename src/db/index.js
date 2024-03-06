import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  import.meta.env.CRICBOOK_APP_POSTGRESQL_DB_CONNECTION_URL
);
