import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Post = sequelize.define(
  "post",
  {
    postId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postImageLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postVideoLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

export default Post;
