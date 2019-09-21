import chai from 'chai';
import chaiHttp from 'chai-http';

import { createNewTags, calcReadingTime } from '../../helpers/articleHelper';

chai.use(chaiHttp);
chai.should();

describe('Article Helper tests', () => {
  it('should create new tags and return an array of tagIds', async () => {
    const result = await createNewTags(['food', 'rice', 'beans']);
    result.should.be.an('array');
  });
  it('should calculate the reading time if a string is supplied', async () => {
    const result = await calcReadingTime('I am a string of text');
    result.should.be.equal('1 min read');
  });
});
