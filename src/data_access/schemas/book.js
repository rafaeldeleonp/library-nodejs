import {Schema, model} from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  author: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  genres: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
});

export default model('Book', schema);
