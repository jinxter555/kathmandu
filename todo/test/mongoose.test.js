const mongoose = require('mongoose');

class thingSchema extends mongoose.Schema {
  constructor(obj, options) {
    super(obj, options);
    this.add({ test: String });
  }
}

class creativeWorkSchema extends thingSchema {
  constructor(obj, options) {
    super(obj, options);
    this.add({ test2: String });
  }
  hello(){
    console.log("hello world");
  }

}

const schema = new creativeWorkSchema();

const TestModel = mongoose.model('Test', schema);

test("tesT1 ", () => {
  tm = new TestModel({ test: 'abc', test2: 'abc' });
  console.log(tm);
  schema.hello();
});
