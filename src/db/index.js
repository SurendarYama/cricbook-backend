import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();
export const sequelize = new Sequelize(
  process.env.CRICBOOK_APP_POSTGRESQL_DB_CONNECTION_URL
);

export const syncAllDB = async (models) => {
  for (let i = 0; i < models.length; i++) {
    try {
      await models[i].sync();
    } catch (err) {
      console.log(err);
    }
  }
};
