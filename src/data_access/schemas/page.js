import {Schema, model} from 'mongoose';

const schema = new Schema({
  book_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

export default model('Page', schema);
