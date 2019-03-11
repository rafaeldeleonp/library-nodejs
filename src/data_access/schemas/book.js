import {Schema, model} from 'mongoose';

const schema = new Schema({
  ISBN: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  authors: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  genres: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
});

export default model('Book', schema);
