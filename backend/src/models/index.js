import sequelize from '../config/db.js';
import User from './user.js';
import Task from './task.js';
import Comment from './comment.js';
import Notification from './notification.js';

// Relations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' }); // creator/owner
Task.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

// Assigned user (nullable)
User.hasMany(Task, { foreignKey: 'assignedUserId', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedTo' });

Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'userComments', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(Notification, { foreignKey: 'taskId', as: 'notifications', onDelete: 'CASCADE' });
Notification.belongsTo(Task, { foreignKey: 'taskId' });

export { sequelize, User, Task, Comment, Notification };
