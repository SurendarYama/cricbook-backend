import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Post = sequelize.define("post", {
  post_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Post;
