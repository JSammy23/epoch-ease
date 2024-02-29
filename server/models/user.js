const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
      firstName: {
        type: String,
        required: true,
        maxlength: [50, 'First name should not exceed 50 characters'],
      },
      lastName: {
        type: String,
        required: true,
        maxlength: [50, 'Last name should not exceed 50 characters'], 
      },
      unionPosition: {
        type: String,
        match: [/^[A-Za-z\s]+$/, 'Union position must only contain letters'],
        maxlength: [50, 'Union position should not exceed 50 characters'],
      },
      badgeNumber: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Badge number must only contain letters and numbers'],
        maxlength: [7, 'Badge number should not exceed 7 characters'], 
      },
      ssoNumber: {
        type: String,
        required: true,
        match: [/^\d{9}$/, 'SSH number must be a 9 digit identifier'],
      },
      componentNumber: {
        type: String,
        required: true,
        match: [/^\d{4}$/, 'Component number must be a 4 digit identifier'],
      },
      supervisor: {
        type: String,
        required: true,
        maxlength: [100, 'Supervisor name should not exceed 100 characters'],
      }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;