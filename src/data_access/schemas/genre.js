import {Schema, model} from 'mongoose';

const schema = new Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model('Genre', schema);
