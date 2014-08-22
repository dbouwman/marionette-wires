var Module = require('../common/module');
var Radio = require('backbone.radio');
var LayoutView = require('./layout-view');

var modalChannel = Radio.channel('modal');
var routerChannel = Radio.channel('router');

module.exports = Module.extend({
  initialize: function () {
    this.container = this.options.container;
    this.start();
  },

  onStart: function() {
    this._showLayoutView();
    this._bindChannelCommands();
  },

  onStop: function() {
    this.stopListening();
  },

  openModal: function (options) {
    this.layout.openModal(options);
    this.listenToOnce(routerChannel, 'route', function () {
      this.destroyModal();
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  },

  _showLayoutView: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
  },

  _bindChannelCommands: function() {
    modalChannel.comply('open', this.openModal, this);
    modalChannel.comply('destroy', this.destroyModal, this);
  }
});