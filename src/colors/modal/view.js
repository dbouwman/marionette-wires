var Marionette = require('backbone.marionette');
var template = require('./template.hbs');
var ModalBehavior = require('../../modal/behavior');

module.exports = Marionette.ItemView.extend({
  template: template,

  behaviors: {
    Modal: {
      behaviorClass: ModalBehavior
    }
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
    'click .destroy' : 'cancel'
  },

  initialize: function (options) {
    this.model = options.model;
    this.trigger('open');
  },

  confirm: function () {
    this.trigger('confirm');
    this.trigger('destroy');
  },

  cancel: function () {
    this.trigger('cancel');
    this.trigger('destroy');
  }
});