import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/database";

class Note extends Model {
  id: number;
  title: string;
  description: string;
  index: number;
  pinnedAt: Date | null;
  archivedAt: Date | null;
  deletedAt: Date | null;
}

Note.init(
  {
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
  },
  {
    sequelize,
    modelName: "Note",
  }
);

export default Note;
