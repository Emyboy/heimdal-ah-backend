import chai from 'chai';
import chaiHttp from 'chai-http';

import callbacks from '../helpers';

chai.use(chaiHttp);
chai.should();

const {
  facebookCallback,
  googleCallback,
  twitterCallback
} = callbacks;

describe('Social Authentication Test', () => {
  const socialMediaDone = () => (
    { done: true }
  );

  const facebookProfile = {
    displayName: 'sudhons adewale',
    emails: [{ value: 'heimdal@gmail.com' }],
    photos: [{ value: 'a_very_funny_image' }],
    name: { givenName: 'james', familyName: 'John' }
  };

  const twitterProfile = {
    displayName: 'sudhons adewale',
    emails: [{ value: 'heimdal23@gmail.com' }],
    photos: [{ value: 'a_very_funny_image' }],
    name: { givenName: 'james', familyName: 'John' }
  };

  const googleProfile = {
    displayName: 'sudhons adewale',
    emails: [{ value: 'heimdal324@gmail.com' }],
    photos: [{ value: 'a_very_funny_image' }],
    name: { givenName: 'james', familyName: 'John' }
  };

  describe('Social medias callbacks', () => {
    it('should signup facebook user', async () => {
      const result = await facebookCallback(null, null, null, facebookProfile, socialMediaDone);
      result.should.have.property('done');
    });

    it('should login an existing facebook user', async () => {
      const result = await facebookCallback(null, null, null, facebookProfile, socialMediaDone);
      result.should.have.property('done');
    });

    it('should signup google user', async () => {
      const result = await googleCallback(null, null, null, googleProfile, socialMediaDone);
      result.should.have.property('done');
    });

    it('should login an existing google user', async () => {
      const result = await googleCallback(null, null, null, facebookProfile, socialMediaDone);
      result.should.have.property('done');
    });

    it('should signup twitter user', async () => {
      const result = await twitterCallback(null, null, null, twitterProfile, socialMediaDone);
      result.should.have.property('done');
    });

    it('should login an existing twitter user', async () => {
      const result = await twitterCallback(null, null, null, facebookProfile, socialMediaDone);
      result.should.have.property('done');
    });
  });
});
