import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Notification extends Model {}

Notification.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'notification', timestamps: true });

export default Notification;
