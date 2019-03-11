import {Schema, model} from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default model('Genre', schema);
