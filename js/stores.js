/**
 * Stores manage application state and trigger updates to the view.
 *
 * However, stores do not directly reference views.  Instead, they
 * provide a way to register callback functions that isolate that
 * aspect elsewhere.
 *
 * We rely on two other modules to implement our stores:
 * 1. EventEmitter
 * 2. object-assign
 *
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// This is a store.  As an EventEmitter, we are able to register callbacks
// that can be used to refresh views when application state changes.
var PeopleStore = assign({}, EventEmitter.prototype, {

  /**
   * get people data from somewhere
   */
  load: function() {
    console.log("Loading people data from somewhere")
    this.emit("change")
    return [];
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  }

});

exports.PeopleStore = PeopleStore;