module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    authorId: {
      type: Sequelize.UUID
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

  const Author = require("./author.model.js")(sequelize, Sequelize);
  Tutorial.hasOne(Author);

  return Tutorial;
};

