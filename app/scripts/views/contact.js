// VIEWS
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');

var _ = require('underscore');
var Backbone = require('backbone');

var contactCardTemplate = require('../../templates/contact-card.hbs');
var formAddContact = require('../../templates/form-add-contact.hbs');

// what does it mean to be a view?

// 'title' view - just to get something on the page
var ContactTitle = Backbone.View.extend({
  tagName: 'h1',
  className: 'well',
  render: function(){
    this.$el.text('Developer Directory');

    return this;
  }
});



// define the wrapper/list of the contact cards
var ContactCardList = Backbone.View.extend({
  tagName: 'div',
  className: 'row',
  initialize: function(){
    // listen for backbone events on the collection, delegate
    // methods to handle events
    this.listenTo(this.collection, 'add', this.renderContactCard);
    this.listenTo(this.collection, 'remove', this.removeContactCard);
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
  events: {
    'click .delete': 'deleteContact'
  },
  initialize: function(){
    // listen for backbone events on this model
    // apparently destroy+changed events will remove
    // models from the page!
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
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
    // hook up model to this model
    deleteModal.model = this.model;

    deleteModal.show();
  }

});

var AddContactForm = Backbone.View.extend({
  tagName: 'div',
  className: 'row',
  events: {
    'submit #add-contact' : 'submit'
  },
  template: formAddContact,
  render: function(){
    var formTemplate = this.template;
    this.$el.html(formTemplate);

    return this;
  },
  submit: function(e){
    e.preventDefault();
    var formData = $('#add-contact').serializeArray();
    var formEntry = {};
    formData.forEach(function(input){
      formEntry[input.name] = input.value;
    });
    this.collection.create(formEntry);
    // clear the form
    $('#add-contact')[0].reset();
  }
});

var ContactModal = Backbone.View.extend({
  el : $('#delete-contact')[0],
  events: {
    'click .btn-danger': 'deleteContact'
  },
  hide: function(){
    this.$el.modal('hide');
  },
  show: function(){
    this.$el.modal('show');
  },
  deleteContact: function(){
    this.model.destroy();

    this.hide();
  }
});

var deleteModal = new ContactModal();

module.exports = {
  ContactTitle: ContactTitle,
  ContactCardList: ContactCardList,
  ContactCard: ContactCard,
  AddContactForm: AddContactForm
};
