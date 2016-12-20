const users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
  app.route('/users')
  .post(users.create)
  .get(users.list);

  app.route('/users/:userId') //adding a colon before a substring in a 
                             //route definition means that this substring will be handled as a request parameter.
     .get(users.read)//get the user by the passed id
     .put(users.update) // update the user by the passed id
     .delete(users.delete); //since we already use the userById() middleware, 
                            //the easiest way to remove an existing document would be to simply use the remove()

  app.param('userId', users.userByID); //handle the population of the req.user object,
  //userByID will be executed before any other middleware registered in this case, users.read
};