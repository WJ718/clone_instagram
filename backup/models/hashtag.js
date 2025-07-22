const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize) {
        Hashtag.init({
            tag: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        Hashtag.belongsToMany(db.Post, {
            through: 'PostHashtags',
            as: 'TaggedPosts',
            foreignKey: 'hashtagId',
            otherKey: 'postId',
        });
    }
}

module.exports = Hashtag;