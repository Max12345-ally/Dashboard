module.exports = (sequelize, Sequelize) => {

    const Author = sequelize.define("author", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      salary: {
        type: Sequelize.DECIMAL
      },
      starsCount: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      }
    });
  
    return Author;
  };
  