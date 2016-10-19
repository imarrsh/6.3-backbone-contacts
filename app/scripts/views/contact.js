// VIEWS

var Backbone = require('backbone');
var contactCardTemplate = require('../../templates/contact-card.hbs');

// what does it mean to be a view?

// 'title' view - just to get something on the page
var ContactTitle = Backbone.View.extend({
  tagName: 'h1',
  className: 'well',
  render: function(){
    this.$el.text('Contacts');

    return this;
  }
});



// define the wrapper/list of the contact cards
var ContactCardList = Backbone.View.extend({
  tagName: 'div',
  className: 'wrapper',
  initialize: function(){
    // listen for backbone events on the collection, delegate
    // methods to handle events
    this.listenTo(this.collection, 'add', this.renderContactCard);
  },
  render: function(){
    return this;
  },
  renderContactCard: function(contact){
    // recive the model passed from listenTo event
    // grab the view we want to render inside of this one
    // send it the model we got from listenTo event
    var contactCard = new ContactCard({model: contact});
    // append it to this view -
    // call the instantiated view's render method
    this.$el.append(contactCard.render().el);
  }
});



// contact card view, corresponds with a model
var ContactCard = Backbone.View.extend({
  tagName: 'div',
  className: 'col-md-4',
  initialize: function(){
    // listen for backbone events on this model
    this.listenTo(this.model, 'destroy', this.deleteContact);
  },
  template: contactCardTemplate,
  render: function(){
    // set up the context object from toJSON
    var context = this.model.toJSON();
    // render the card with data
    var renderedCard = this.template(context);
    // set up the html for this model instance
    this.$el.html(renderedCard);
    // return the finished thing
    return this;
  },
  deleteContact: function(){
    // destroy this model
  }

});

module.exports = {
  ContactTitle: ContactTitle,
  ContactCardList: ContactCardList,
  ContactCard: ContactCard
};
