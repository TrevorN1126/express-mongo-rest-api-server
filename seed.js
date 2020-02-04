const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./server/user/user.model');
const Thing = require('./server/thing/thing.model');

const newUserName = 'TestUser';
const newPassword = 'password';

const newAdminUserName = 'TestAdmin';
const newAdminPassword = 'password';

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

const thing = new Thing({
  name: 'TheThing',
  description: 'Description of the thing'
});

thing.save()
  .then((savedThing) => {
    console.log(savedThing);
  })
  .catch((err) => { console.log(err); });

const admin = new User({
  username: newAdminUserName,
  password: newPassword,
  permissions: ['admin']
});


admin.save()
  .then((savedUser) => {
    console.log(savedUser);
    // fetch user and test password verification
    User.findOne({ username: newAdminUserName }, (err, user) => {
      if (err) throw err;

      // test a matching password
      user.comparePassword(newAdminPassword, (err, isMatch) => {
        if (err) throw err;
        console.log('password:', isMatch); // -> password: true
      });

      // test a failing password
      user.comparePassword('123Password', (err, isMatch) => {
        if (err) throw err;
        console.log('123Password:', isMatch); // -> 123Password: false
      });
    });
  })
  .catch((err) => { console.log(err); });

const user = new User({
  username: newUserName,
  password: newPassword,
  permissions: ['user']
});


user.save()
  .then((savedUser) => {
    console.log(savedUser);
    // fetch user and test password verification
    User.findOne({ username: newUserName }, (err, user) => {
      if (err) throw err;

      // test a matching password
      user.comparePassword(newPassword, (err, isMatch) => {
        if (err) throw err;
        console.log('password:', isMatch); // -> Password123: true
      });

      // test a failing password
      user.comparePassword('123Password', (err, isMatch) => {
        if (err) throw err;
        console.log('123Password:', isMatch); // -> 123Password: false
      });

      mongoose.disconnect();
    });
  })
  .catch((err) => { console.log(err); });
