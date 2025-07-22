const Sequelize = require('sequelize');

class Follow extends Sequelize.Model {
    static initiate(sequelize) {
        Follow.init({}, {
            sequelize,
            timestamps: true,
            modelName: 'Follow',
            tableName: 'follows',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // 내가 팔로우하는 사람
        Follow.belongsTo(db.User, {
            foreignKey: 'followingId',
            onDelete: 'CASCADE',
        });

        // 나를 팔로우하는 사람
        Follow.belongsTo(db.User, {
            foreignKey: 'followerId',
            onDelete: 'CASCADE',
        });

    }
}

module.exports = Follow;