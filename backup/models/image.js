const Sequelize = require('sequelize');

class Image extends Sequelize.Model {
    static initiate(sequelize) {
        Image.init({
            url: {
                type: Sequelize.STRING(300),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Image',
            tableName: 'images',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        Image.belongsTo(db.Post, {
            foreignKey: 'postId',
            sourceKey: 'id',
            onDelete: 'CASCADE',
        });
    }
}

module.exports = Image;