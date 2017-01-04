const users = require('../../app/controllers/users.server.controller');
const articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
  app.route('/api/articles')
     .get(articles.list)
     .post(users.requiresLogin, articles.create);
  
  app.route('/api/articles/:articleId')
     .get(articles.read)
     .put(users.requiresLogin, articles.hasAuthorization, articles.update)
     .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

  app.param('articleId', articles.articleByID);
};
/**
 * In the preceding code snippet, you did several things. First, you required the users and articles controllers
 *  and then you used the Express app.route() method to define the base routes for your CRUD operations.
 *  You used the Express routing methods to wire each controller method to a specific HTTP method.
 *  You may also notice how the POST method uses the users.requiresLogin() middleware, since a user needs to log in
 *  before they can create a new article. In the same way, the PUT and DELETE methods use both users.requiresLogin()
 *  and articles.hasAuthorization() middleware, since users can only edit and delete the articles they created.
 *  Finally, you used the app.param() method to make sure that every route that has the articleId parameter will 
 * first call the articles.articleByID() middleware. Next, you'll need to configure your Express application to load 
 * your new Article model and routes file.
 */