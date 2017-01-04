const mongoose = require('mongoose');
const Article = mongoose.model('Article');

function getErrorMessage (err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
  const article = new Article(req.body);
  article.creator = req.user;

  article.save((err) => { // save() Mongoose instance 
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(article);
    }
  });
};
/*

The list() method of the Express controller will provide the basic functionality 
to retrieve a list of the existing articles. It will use the model's find() method
 to retrieve all the documents in the article collection and then output a JSON 
 representation of this list. To implement the list() method, append the following 
 lines of code to your app/controllers/articles.server.controller.js file:

*/
exports.list = function(req, res) {
  Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, articles) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(articles);
    }
  });
};
/*
The read() method of the Express controller 
will provide the basic functionality to read an existing article 
document from the database. Since you're writing a sort of RESTful API, 
the common usage of this method will be handled by passing the article's ID 
field as a route parameter. This means that your requests to the server will 
contain an articleId parameter in their paths.
*/

exports.read = function(req, res) {
  res.status(200).json(req.article); //req.article
};

/*
 the Express router provides the app.param() method for the handling of route parameters. 
 This method allows you to attach a middleware for all the requests containing the articleId route parameter


The middleware itself will then use the articleId provided to find the proper MongoDB document and add the retrieved 
article object to the request object. This will allow all the 
controller methods that manipulate an existing article to obtain the article object from the Express request object.

As you can see, the middleware function signature contains all the Express middleware arguments and an id argument.
 It then uses the id argument to find an article and reference it using the req.article property. Note how the populate() 
 method of the Mongoose model was used to add some user fields to the creator property of the article object. In this case, 
 you populated the firstName, lastName, and fullName properties of the creator user object.
*/

exports.articleByID = function(req, res, next, id) {
  Article.findById(id).populate('creator', 'firstName lastName fullName').exec((err, article) => {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));

    req.article = article;
    next();
  });

};
/*
The update() method of the Express controller will provide the basic operations to update an existing article document.
 It will use the existing article object as the base object and then update the title and content fields using the HTTP 
 request body. It will also use the model save() method to save the changes to the database. To implement the update()
  method, go to your app/controllers/articles.server.controller.js file and append the following lines of code:
*/

exports.update = function(req, res) {
  const article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(article);
    }
  });
};

/**
 * 
 * The delete() method of the Express controller will provide the basic operations to delete 
 * an existing article document. It will use the model remove() method to delete the existing 
 * article from the database. To implement the delete() method, go to your app/controllers/articles.server.controller.js 
 * file and append the following lines of code:
 * 
 * 
 * Again, you can see how the delete() method also makes use of the already obtained article object
 *  by the articleByID() middleware. So, all you have to do is invoke the Mongoose model's remove() 
 * method and then output the deleted article object as a JSON representation. In case of an error, it will
 *  output the appropriate error message using the getErrorMessage() method you wrote earlier and an HTTP error
 *  code instead.
 */
exports.delete = function(req, res) {
  const article = req.article;

  article.remove((err) => {
    if (err) {  
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(article);
    }
  });
};
//ongratulations! You just finished implementing your Express controller's CRUD functionality. Before you continue to wire the Express routes that will invoke these methods,'
//let's take some time to implement two authorization middleware''



///////////////////////////////////////////
///mplementing an authentication middleware
/////////////////////////////////////////////

/**
 * While you can check this assignment inside your methods, this will enforce you to implement the same validation code over
 *  and over. Instead, you can just use the Express middleware chaining to block
 *  unauthorized requests from executing your controller methods. The first middleware you should implement will check 
 * whether a user is authenticated at all. Since this is an authentication-related method, it would be best to implement 
 * it in the Express users controller, so go to the app/controllers/users.server.controller.js file and append the following 
 * lines of code:
 * 
 * 



/**
 * ****************************************
 * Implementing an authorization middleware*
 * ****************************************
 * 
In your CRUD module, there are two methods that edit an existing article document. Usually, the update() 
and delete() methods should be restricted so that only the user who created the article will be able to use them. 
This means that you need to authorize any request made to these methods to validate whether the current article is being 
edited by its creator. To do this, you will need to add an authorization middleware to your Articles controller, so go
 to the app/controllers/articles.server.controller.js file and append the following lines of code:


 The hasAuthorization() middleware uses the req.article and req.user objects to verify that the current user is the creator of the current article. This middleware also assumes that it gets executed only for requests that contain the articleId route parameter. Now that you have all your methods and middleware in place, it is time to wire the routes that enable their execution.
 */

exports.hasAuthorization = function(req, res, next) {
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    next();
};

/**
* **************************
* Wiring the Express routes
******************************
Before we begin wiring the Express routes, let's do a quick overview of the RESTful API architectural design. 
The RESTful API provides a coherent service structure that represents a set of actions that you can perform on an
 application resource. This means that the API uses a predefined route structure along with the HTTP method name 
 in order to provide context for HTTP requests. Though the RESTful architecture can be applied in different ways, 
 a RESTful API usually complies with a few simple rules:




A base URI per resource, in our case, http://localhost:3000/articles

A data structure, usually JSON, passed in the request body

The usage of standard HTTP methods (for example, GET, POST, PUT, and DELETE)


 Using these three rules, you'll be able to properly route HTTP requests to use the right controller method. So, your articles API will consist of five routes:

GET http://localhost:3000/articles: This will return a list of articles

POST http://localhost:3000/articles : This will create and return a new article

GET http://localhost:3000/articles/:articleId: This will return a single existing article

PUT http://localhost:3000/articles/:articleId: This will update and return a single existing article

DELETE http://localhost:3000/articles/:articleId: This will delete and return a single article
 */