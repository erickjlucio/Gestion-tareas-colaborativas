import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Comment extends Model {}

Comment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false }
}, { sequelize, modelName: 'comment', timestamps: true });

export default Comment;
