/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 */
exports.create = {

	User: [{
    name: { first: 'Admin', last: 'User' },
    email: 'dev.scottashmore@gmail.com', 
    password: 'admin', 
    isAdmin: true 
  }]

};