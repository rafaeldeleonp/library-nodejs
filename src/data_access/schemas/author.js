import {Schema, model} from 'mongoose';

const schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  born: {
    type: Date,
    required: true,
  },
  died: {
    type: Date,
  },
});

export default model('Author', schema);
