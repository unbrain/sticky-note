const Sequelize = require('sequelize');
const path = require('path')
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  // SQLite only
  storage: path.join(__dirname, '../db/database.sqlite'),

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  // operatorsAliases: false
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
})

//Note.sync({force: true})
Note.findAll({raw:true}).then((notes) => {
  console.log(notes)
})
module.exports.Note = Note