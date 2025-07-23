const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init({
            content: {
                type: Sequelize.STRING(500),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Comment',
            tableName: 'comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // 1:N 독립모델 (중간테이블 X)
        Comment.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });

        Comment.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    }
}

module.exports = Comment;