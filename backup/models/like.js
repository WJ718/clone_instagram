const Sequelize = require('sequelize');

class Like extends Sequelize.Model {
    static initiate(sequelize) {
        Like.init({}, {
            sequelize,
            timestamps: true,
            modelName: 'Like',
            tableName: 'likes',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        Like.belongsTo(db.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });

        Like.belongsTo(db.Post, {
            foreignKey: 'postId',
            onDelete: 'CASCADE',
        });
    }
}

module.exports = Like;