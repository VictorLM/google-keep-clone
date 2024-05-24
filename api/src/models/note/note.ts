import { DataTypes } from "sequelize";
import sequelize from "../../database/database";

const Note = sequelize.define("Note", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  index: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pinnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  archivedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Note;
