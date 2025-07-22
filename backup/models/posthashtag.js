const Sequelize = require('sequelize');
const Post = require('./post');

class PostHashtag extends Sequelize.Model {
    static initiate(sequelize) {
        PostHashtag.init({}, {
            sequelize,
            timestamps: true,
            modelName: 'PostHashtag',
            tableName: 'posthashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        PostHashtag.belongsTo(db.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
        });

        PostHashtag.belongsTo(db.Hashtag, {
        foreignKey: 'hashtagId',
        onDelete: 'CASCADE',
        });
    }
}

module.exports = PostHashtag;