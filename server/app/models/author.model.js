module.exports = (sequelize, Sequelize) => {

    const Author = sequelize.define("author", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      price: {
        type: Sequelize.DECIMAL
      },
      pageCount: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      publishedDate: {
        type: Sequelize.DATE
      }
    });
  
    return Author;
  };
  