import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

class Task extends Model {}

Task.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.ENUM('pending', 'in_progress', 'completed'), allowNull: false, defaultValue: 'pending' },
  dueDate: { type: DataTypes.DATEONLY, allowNull: true },
  attachmentPath: { type: DataTypes.STRING, allowNull: true }
}, { sequelize, modelName: 'task', timestamps: true });

// Associations are defined in models/index.js
export default Task;
