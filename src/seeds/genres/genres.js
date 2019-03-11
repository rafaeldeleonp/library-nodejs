import {ObjectID} from 'bson';

const genres = [
  {
    name: 'Fantasy',
    description: 'is a genre of speculative fiction set in a fictional universe, often without any locations, events, or people referencing the real world. Its roots are in oral traditions, which then became literature and drama. From the twentieth century it has expanded further into various media, including film, television, graphic novels and video games.',
  },
  {
    name: 'Romance',
    description: 'the romance novel or romantic novel discussed in this article is the mass-market version. Novels of this type of genre fiction place their primary focus on the relationship and romantic love between two people, and must have an "emotionally satisfying and optimistic ending.',
  },
  {
    name: 'Thriller',
    description: 'Thriller is a broad genre of literature, film and television, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.',
  },
  {
    name: 'Mistery',
    description: 'Mystery fiction is a genre of fiction usually involving a mysterious death or a crime to be solved. Often with a closed circle of suspects, each suspect is usually provided with a credible motive and a reasonable opportunity for committing the crime. The central character oftentimes will be a detective who eventually solves the mystery by logical deduction from facts presented to the reader.',
  },
  {
    name: 'Musical',
    description: '',
  },
  {
    name: 'Satire',
    description: 'Satire is a genre of literature, and sometimes graphic and performing arts, in which vices, follies, abuses, and shortcomings are held up to ridicule, ideally with the intent of shaming individuals, corporations, government, or society itself into improvement.',
  },
  {
    name: 'Horror',
    description: 'Horror is a genre of speculative fiction which is intended to frighten, scare, disgust, or startle its readers by inducing feelings of horror and terror.',
  },
  {
    name: 'Westerns',
    description: 'Western fiction is a genre of literature set in the American Old West frontier and typically set from the late eighteenth to the late nineteenth century.',
  },
  {
    name: 'Fiction',
    description: 'Fiction broadly refers to any narrative that is derived from the imagination—in other words, not based strictly on history or fact. It can also refer, more narrowly, to narratives written only in prose, and is often used as a synonym for the novel.',
  },
];

const genresData = genres.map((genre) => ({
  _id: new ObjectID(),
  ...genre,
}));

module.exports = genresData;