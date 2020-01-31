const mongoose = require('mongoose');
const config = require('./config/config');
const User = require('./server/user/user.model');

const newUserName = 'TestUser';
const newPassword = 'password';

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

const user = new User({
  username: newUserName,
  password: newPassword
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
  .catch((e) => console.log(e));