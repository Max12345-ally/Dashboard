module.exports = (sequelize, Sequelize, Author) => {
  const Tutorial = sequelize.define("tutorial", {
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
  Author.hasOne(Tutorial);

  return Tutorial;
};

