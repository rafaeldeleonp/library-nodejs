const authors = require('../authors/authors');
const genres = require('../genres/genres');
import {ObjectID} from 'bson';
import find from 'lodash/find';

const books = [
  {
    ISBN: '9780679734505',
    title: 'Crime and Punishment',
    summary: 'Through the story of the brilliant but conflicted young Raskolnikov and the murder he commits, Fyodor Dostoyevsky explores the theme of redemption through suffering. “Crime and Punishment” put Dostoyevsky at the forefront of Russian writers when it appeared in 1866 and is now one of the most famous and influential novels in world literature. The poverty-stricken Raskolnikov, a talented student, devises a theory about extraordinary men being above the law, since in their brilliance they think “new thoughts” and so contribute to society. He then sets out to prove his theory by murdering a vile, cynical old pawnbroker and her sister. The act brings Raskolnikov into contact with his own buried conscience and with two characters — the deeply religious Sonia, who has endured great suffering, and Porfiry, the intelligent and discerning official who is charged with investigating the murder — both of whom compel Raskolnikov to feel the split in his nature. Dostoyevsky provides readers with a suspenseful, penetrating psychological analysis that goes beyond the crime — which in the course of the novel demands drastic punishment — to reveal something about the human condition: The more we intellectualize, the more imprisoned we become.',
    authors: 'Fyodor Dostoevsky',
    genres: 'Fiction',
  },
  {
    ISBN: '9781505259568',
    title: 'Romeo and Juliet',
    summary: 'Romeo and Juliet is a tragedy written by William Shakespeare early in his career about two young star-crossed lovers whose deaths ultimately reconcile their feuding families. It was among Shakespeares most popular plays during his lifetime and, along with Hamlet, is one of his most frequently performed plays. Today, the title characters are regarded as archetypal young lovers. Romeo and Juliet belongs to a tradition of tragic romances stretching back to antiquity. Its plot is based on an Italian tale, translated into verse as The Tragical History of Romeus and Juliet by Arthur Brooke in 1562 and retold in prose in Palace of Pleasure by William Painter in 1567. Shakespeare borrowed heavily from both but, to expand the plot, developed supporting characters, particularly Mercutio and Paris. Believed to have been written between 1591 and 1595, the play was first published in a quarto version in 1597. This text was of poor quality, and later editions corrected it, bringing it more in line with Shakespeares original. Shakespeares use of his poetic dramatic structure, especially effects such as switching between comedy and tragedy to heighten tension, his expansion of minor characters, and his use of sub-plots to embellish the story, has been praised as an early sign of his dramatic skill. The play ascribes different poetic forms to different characters, sometimes changing the form as the character develops. Romeo, for example, grows more adept at the sonnet over the course of the play.',
    authors: 'William Shakespeare',
    genres: 'Romance',
  },
  {
    ISBN: '9781936830886',
    title: 'A Christmas Carol',
    summary: 'A Christmas Carol is a novella by English author Charles Dickens. It was first published by Chapman & Hall on 19 December 1843. Carol tells the story of a bitter old miser named Ebenezer Scrooge and his transformation resulting from a supernatural visit by the ghost of his former business partner Jacob Marley and the Ghosts of Christmases Past, Present and Yet to Come. The novella met with instant success and critical acclaim.The book was written and published in early Victorian era Britain, a period when there was strong nostalgia for old Christmas traditions together with the introduction of new customs, such as Christmas trees and greeting cards. Dickens sources for the tale appear to be many and varied, but are, principally, the humiliating experiences of his childhood, his sympathy for the poor, and various Christmas stories and fairy tales',
    authors: 'Charles Dickens',
    genres: 'Fiction',
  },
  {
    ISBN: '9780241265543',
    title: 'War and Peace',
    summary: 'War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.',
    authors: 'Leo Tolstoy',
    genres: 'Fiction',
  },
  {
    ISBN: '9788129116123',
    title: 'Animal Farm',
    summary: 'Animal Farm is the most famous by far of all twentieth-century political allegories. Its account of a group of barnyard animals who revolt against their vicious human master, only to submit to a tyranny erected by their own kind, can fairly be said to have become a universal drama. Orwell is one of the very few modern satirists comparable to Jonathan Swift in power, artistry, and moral authority; in Animal Farm his spare prose and the logic of his dark comedy brilliantly highlight his stark message.',
    authors: 'George Orwell',
    genres: 'Satire,Fiction',
  },
  {
    ISBN: '9781512399042',
    title: 'The Raven',
    summary: 'Notable for its musical, artstc expression and mystc atmosphere, poem The Raven narrates about mysterious visit of a talking raven to a struck with grief young man who lost his lady-love. Answering full of despair and hope questons, the raven repeats the word “nevermore” and makes the hero’s heartache worse. Edgar Poe described in details the process of creatng The Raven in his essay The Philosophy of Compositon, pointng out its methodic ways and logical approach. Soon aier publishing, The Raven made Poe natonally famous and very popular among readers.',
    authors: 'Edgar Allan Poe',
    genres: 'Fiction',
  },
  {
    ISBN: '9780618640157',
    title: 'The Lord of the Rings: One Volume',
    summary: 'In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.',
    authors: 'J. R. R. Tolkien',
    genres: 'Fantasy',
  },
  {
    ISBN: '9781503215672',
    title: 'The Adventures of Tom Sawyer',
    summary: 'The Adventures of Tom Sawyer by Mark Twain is an 1876 novel about a young boy growing up along the Mississippi River. The story is set in the fictional town of St. Petersburg, inspired by Hannibal, Missouri, where Twain lived. Tom Sawyer lives with his Aunt Polly and his half-brother Sid. Tom dirties his clothes in a fight and is made to whitewash the fence the next day as punishment. He cleverly persuades his friends to trade him small treasures for the privilege of doing his work. He then trades the treasures for Sunday School tickets which one normally receives for memorizing verses, redeeming them for a Bible, much to the surprise and bewilderment of the superintendent who thought "it was simply preposterous that this boy had warehoused two thousand sheaves of Scriptural wisdom on his premises—a dozen would strain his capacity, without a doubt." Tom falls in love with Becky Thatcher, a new girl in town, and persuades her to get "engaged" by kissing him. But their romance collapses when she learns Tom has been "engaged" previously to Amy Lawrence. Shortly after Becky shuns him, he accompanies Huckleberry Finn to the graveyard at night, where they witness the murder of Dr. Robinson.',
    authors: 'Mark Twain',
    genres: 'Satire,Fiction',
  },
  {
    ISBN: '9780451419439',
    title: 'Les Misérables',
    summary: 'Sensational, dramatic, packed with rich excitement and filled with the sweep and violence of human passions, Les Misérables is not only superb adventure but a powerful social document. The story of how the convict Jean-Valjean struggled to escape his past and reaffirm his humanity, in a world brutalized by poverty and ignorance, became the gospel of the poor and the oppressed.',
    authors: 'Victor Hugo',
    genres: 'Musical,Fiction',
  },
  {
    ISBN: '9780486278070',
    title: 'The Picture of Dorian Gray',
    summary: 'The Picture of Dorian Gray is an 1891 philosophical novel by Irish writer and playwright Oscar Wilde. First published as a serial story in the July 1890 issue of Lippincotts Monthly Magazine, the editors feared the story was indecent, and without Wildes knowledge, deleted five hundred words before publication. Despite that censorship, The Picture of Dorian Gray offended the moral sensibilities of British book reviewers, some of whom said that Oscar Wilde merited prosecution for violating the laws guarding the public morality. In response, Wilde aggressively defended his novel and art in correspondence with the British press. Wilde revised and expanded the magazine edition of The Picture of Dorian Gray (1890) for publication as a novel; the book edition (1891) featured an aphoristic preface — an apologia about the art of the novel and the reader. The content, style, and presentation of the preface made it famous in its own literary right, as social and cultural criticism. In April 1891, the editorial house Ward, Lock and Company published the revised version of The Picture of Dorian Gray.',
    authors: 'Oscar Wilde',
    genres: 'Fiction',
  },
];

function splitString(string) {
  return string.split(',');
}

function getAuthorsIds(string) {
  let items = splitString(string);
  return items.map((item) => {
    const doc = find(authors, (author) => {
      const fullname = `${author.first_name} ${author.last_name}`;
      return fullname === item;
    });

    return doc._id;
  });
}

function getGenresIds(string) {
  let items = splitString(string);
  return items.map((item) => {
    const doc = find(genres, (genre) => {
      return genre.name === item;
    });

    return doc._id;
  });
}

const booksData = books.map((book) => {
  return {
    _id: new ObjectID(),
    ISBN: book.ISBN,
    title: book.title,
    summary: book.summary,
    authors: getAuthorsIds(book.authors),
    genres: getGenresIds(book.genres),
    pages: 0,
  };
});

module.exports = booksData;