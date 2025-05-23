const { assert, expect } = require('chai');

const User = require('../../../lib/user');
const Session = require('../../../lib/session');

describe('user.forgotPassword', () => {
  const session = new Session('secret');
  const user = new User(session);
  it('should return access token and refresh token', async () => {
    const { session: newSession, user: newUser } = await user.forgotPassword('demo@demo.com');
    expect(newSession).to.have.property('refresh_token');
    expect(newSession).to.have.property('access_token');
    expect(newUser).to.have.property('language');
    expect(newUser).to.have.property('selector');
  });
  it('should return error, user not found', async () => {
    const promise = user.forgotPassword('not-found@test.com');
    return assert.isRejected(promise, 'User not found');
  });
});
