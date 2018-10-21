
const {Base, Book, Movie, Hobby} = require('../models/DiscMod');
const WorkCompany = require('../models/WorkCompany');
const MongoDB = require('../openMongo');
const OPStatus = require('../op_status');
const faker = require('faker');



var book1_args = {
  date_added: Date(),
  title: faker.lorem.sentence(3),
  redo: false,
  author: "book author 1"
}
var movie1_args = {
  date_added: Date(),
  title: faker.lorem.sentence(3),
  redo: false,
  director: "movie 1 director 1"
}

var hobby1_args = {
  name: "stay home"
}

var hobby2_args = {
  name: "at friends"
}

var base1_args = {
  date_added: Date(),
  title: faker.lorem.sentence(3),
  redo: false,
}

var base2_args = {
  date_added: Date(),
  title: faker.lorem.sentence(3),
  redo: false,
}


describe('test discriminator base',  () => {

  beforeAll(() => {
    MongoDB.open('test');
    Hobby.remove({}, function(err) {
      //console.log('collection removed')
    });
    Base.remove({}, function(err) {
      //console.log('collection removed')
    });
  });

  afterAll(async () => {
    MongoDB.close();
    p = await Book.find({null: null});
  });

  test('Able to create a multiple objects', async() => {
    // these have to go before hoppies because of todo dependency
    book1_obj = await new Book(book1_args).save();
    movie1_obj = await new Movie(movie1_args).save();

    hobby1_obj = await new Hobby(hobby1_args).save();
    hobby2_obj = await new Hobby(hobby2_args).save();


    hobby1_obj.todo = book1_obj._id;
    hobby2_obj.todo = movie1_obj._id;

    hobby1_saved_obj = await hobby1_obj.save().catch(e => {console.log(e)});
    hobby2_saved_obj = await hobby2_obj.save().catch(e => {console.log(e)});

    hobby1_found_obj = await Hobby.findOne(hobby1_args);
    hobby2_found_obj = await Hobby.findOne(hobby2_args);

    //console.dir(hobby1_saved_obj);

    console.dir(hobby1_found_obj);
    console.dir(hobby2_found_obj);
  });

  xtest('hobby1 ', async() => {
    book1_obj = await new Book(book1_args).save();
    hobby1_obj = await new Hobby(hobby1_args).save();

    hobby1_obj.todo = book1_obj._id;

    console.dir(hobby1_obj);
    console.dir(book1_obj);

    hobby1_saved_obj = await hobby1_obj.save().catch(e => {console.log(e)});

    //hobby1_found_obj = await Hobby.findOne(hobby1_args);

    //console.dir(hobby1_saved_obj);

    //console.dir(hobby1_found_obj);
  });


  xtest('hobby2 ', async() => {
    movie1_obj = await new Movie(movie1_args).save();
    hobby2_obj = await new Hobby(hobby2_args).save();

    hobby2_obj.todo = movie1_obj._id;

    hobby2_saved_obj = await hobby2_obj.save().catch(e => {console.log(e)});

    hobby2_found_obj = await Hobby.findOne(hobby2_args);

    //console.dir(hobby1_saved_obj);

    console.dir(hobby2_found_obj);
  });


});
