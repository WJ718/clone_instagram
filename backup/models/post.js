const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        } , {
            sequelize,
            timestamps: true,
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // Post -> Image
        Post.hasMany(db.Image, {
            foreignKey: 'postId',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        // Post -> Comment
        Post.hasMany(db.Comment, {
            foreignKey: 'postId',
            sourceKey: 'id',
            onDelete: 'CASCADE',
        });

        // Post -> User (좋아요)
        Post.belongsToMany(db.User, {
            through: 'Like',
            as: 'Likers',
            foreignKey: 'postId',
            otherKey: 'userId',
        });

        // Post <-> hastag 
        Post.belongsToMany(db.Hashtag, {
            through: 'PostHashtag',
            foreignKey: 'postId',
            otherKey: 'hashtagId',
        });
    }
}

module.exports = Post;