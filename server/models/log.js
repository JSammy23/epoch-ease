const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },  
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: false 
  },
  timeCode: {
    type: String,
    required: true,
    enum: ['122 UC', '110 CR', 'UO Off-Premise, Union Paid', 'UU Off-Premise, unpaid', 'UP On-premise'],
    default: '122 UC'
  },
  description: {
    type: String,
    required: true,
    maxlength: [100, 'Description should not exceed 100 characters']
  }
});

// Pre-save hook to default description if left blank
LogSchema.pre('save', function(next) {
    if (!this.description) {
      this.description = 'Union Business'; // Default description
    }
    next();
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
