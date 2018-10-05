const mongoose = require('mongoose');
const User = require('../models/user_model')

var u;

function myPromise(program) {
  return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved 123');
      }, 2000);
    });
}


describe('user model test', () => {

  beforeAll(() => {
    mongoose.connect(
      'mongodb://localhost:27017/kathmandu_dev',
      { useNewUrlParser: true }
    )
  });

  afterAll(async () => {
    mongoose.connection.close()
    // mongoose bug.
    // force mongoose drop connection
    u = await User.find({null: null});
  });

  it("has a module",() => {
    expect(User).toBeDefined()
  })

  test("can create and save", async () => {
    jest.setTimeout(500);
    u = await new User({username: "u1", password: "p1", email: "e1@g.c"}).save();
    u = await new User({username: "u2", password: "p1", email: "e1@g.c"}).save();
    u = await new User({username: "u3", password: "p1", email: "e1@g.c"}).save();
    console.log('user is: '  + u);
  })
});
