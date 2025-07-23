const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: { // need to hashing
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // User -> Post
        User.hasMany(db.Post, {
            foreignKey: 'userId',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        // User -> Comment
        User.hasMany(db.Comment, {
            foreignKey: 'userId',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        // User -> Like -> Post
        User.belongsToMany(db.Post, {
            through: 'Likes',
            as: 'LikedPosts',
            foreignKey: 'userId',
            otherKey: 'postId',
        });

        // User <-> User
        User.belongsToMany(db.User, {
            through: 'Follows',
            as: 'Followers',
            foreignKey: 'followingId',
        });

        User.belongsToMany(db.User, {
            through: 'Follows',
            as: 'Followings',
            foreignKey: 'followerId',
        });
    }
}

module.exports = User;