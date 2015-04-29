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
