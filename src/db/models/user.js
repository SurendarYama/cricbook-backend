import { DataTypes } from "sequelize";
import { sequelize } from "db";

const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agrees: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default User;