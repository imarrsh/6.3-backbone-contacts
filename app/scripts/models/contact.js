// MODELS

var Backbone = require('backbone');

// what does it mean to be a contact card?
var ContactCard = Backbone.Model.extend({
  idAttribute : '_id'
});

// what is a collection of contact cards?
var ContactCardCollection = Backbone.Collection.extend({
  model : ContactCard,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mtcontacts'
});

module.exports = {
  ContactCard : ContactCard,
  ContactCardCollection : ContactCardCollection
};
