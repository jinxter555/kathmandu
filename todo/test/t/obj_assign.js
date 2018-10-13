class  myClass {
  world() {
    console.log("world: " + this.c);
  }
}
const object1 = {
  a: 1,
  b: 2,
  c: 3,
  hello: function() {
    console.log("hello: " + this.d);
  }
};

const object2 = Object.assign({c: 4, d: 5}, object1);
const object_c = Object.assign(new myClass, object1);

console.dir(object2);
// expected output: 3 5
object2.hello();
object_c.world();
