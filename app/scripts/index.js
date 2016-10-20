var $ = require('jquery');

var models = require('./models/contact');
var views = require('./views/contact');

// DOM Ready
$(function(){

  var $app = $('#app');
  // instantiate new collection
  var contactsCollection = new models.ContactCardCollection();

  // define a new view for an h1 at the top of the page
  // append to the page - call the render method with the el
  var contactTitle = new views.ContactTitle();
  $app.append(contactTitle.render().el);

  // instantiate card list wrapper
  var contactsWrapper = new views.ContactCardList({collection: contactsCollection});
  $app.append(contactsWrapper.render().el);

  var formWrapper = new views.AddContactForm({collection: contactsCollection});
  $app.append(formWrapper.render().el);



  // GET from server
  contactsCollection.fetch();

  // dummy data - add is a _function_ - dont forget!
  // contactsCollection.add([
  //   {
  //     'firstName' : 'Marshall',
  //     'lastName' : 'Thompson',
  //     'title' : 'Front-End Engineer',
  //     'email' : 'mthompson@tiny-lasagna.com',
  //     'phone' : '706.123.1234',
  //     'twitterHandle' : 'imarrsh',
  //     'linkedIn' : 'marshall-thopmson'
  //   },
  //   {
  //     'firstName' : 'Joe',
  //     'lastName' : 'Schmoe',
  //     'title' : 'Back-End Engineer',
  //     'email' : 'jschmoe@tiny-lasagna.com',
  //     'phone' : '601.435.6789',
  //     'twitterHandle' : 'schmoe',
  //     'linkedIn' : 'joe-schmoe'
  //   },
  //   {
  //     'firstName' : 'Joe',
  //     'lastName' : 'Schmoe',
  //     'title' : 'Back-End Engineer',
  //     'email' : 'jschmoe@tiny-lasagna.com',
  //     'phone' : '601.435.6789',
  //     'twitterHandle' : 'schmoe',
  //     'linkedIn' : 'joe-schmoe'
  //   },
  // ]);

  console.log(contactsCollection);

}());
