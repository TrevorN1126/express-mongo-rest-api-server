const logger = require('./config/winston');
const User = require('./server/user/user.model');
const Thing = require('./server/thing/thing.model');
const MongoServer = require('./config/db');

const newUserName = 'TestUser';
const newPassword = 'password';

const newAdminUserName = 'TestAdmin';
const newAdminPassword = 'password';

// connect to mongo db
MongoServer.initiate();

const thing = new Thing({
  name: 'TheThing',
  description: 'Description of the thing'
});

thing.save()
  .then((savedThing) => {
    logger.info(savedThing);
  })
  .catch((err) => { logger.info(err); });

const admin = new User({
  username: newAdminUserName,
  password: newPassword,
  permissions: ['Admin']
});

admin.save()
  .then((savedUser) => {
    logger.info(savedUser);
    // fetch user and test password verification
    User.findOne({ username: newAdminUserName }, (errFind, user) => {
      if (errFind) throw errFind;

      // test a matching password
      user.comparePassword(newAdminPassword, (err, isMatch) => {
        if (err) throw err;
        logger.info('password:', isMatch); // -> password: true
      });

      // test a failing password
      user.comparePassword('123Password', (err, isMatch) => {
        if (err) throw err;
        logger.info('123Password:', isMatch); // -> 123Password: false
      });
    });
  })
  .catch((err) => { logger.info(err); });

const user = new User({
  username: newUserName,
  password: newPassword,
  permissions: ['User']
});


user.save()
  .then((savedUser) => {
    logger.info(savedUser);
    // fetch user and test password verification
    User.findOne({ username: newUserName }, (errFind, newUser) => {
      if (errFind) throw errFind;

      // test a matching password
      newUser.comparePassword(newPassword, (err, isMatch) => {
        if (err) throw err;
        logger.info('password:', isMatch); // -> Password123: true
      });

      // test a failing password
      newUser.comparePassword('123Password', (err, isMatch) => {
        if (err) throw err;
        logger.info('123Password:', isMatch); // -> 123Password: false
      });
    });
  })
  .catch((err) => { logger.info(err); });

MongoServer.close();
