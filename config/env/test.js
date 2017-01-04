// Set the 'test' environment configuration object
module.exports = {
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'testSessionSecret',
	viewEngine: 'ejs',
	facebook: {
		clientID: '12086779958849201208677995884920',
		clientSecret: 'bfcda18589ad3f95f7b4e91888675c28',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'MOUYCDhPmmnS3dPz99yXSHFJP',
		clientSecret: 'z3Ub7a4exconD6ZPN3zPN6xJdcEPudAIVO1y4ZkLtUpLjOPpkF',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: '1064765571891-ijk9fret1mpivl2i1nplbi561h8fssqr.apps.googleusercontent.com',
		clientSecret: 'Ix_yo8Y4fb5AjzA01FW342IO',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};