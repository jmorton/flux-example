/**
 * There is a single dispatcher in an application.
 *
 * It is responsible for sending actions to stores.  One nice thing
 * about the dispatcher is that it decouples transforming event data
 * into something more usable from the functions that transfrom
 * application state.  There's more to it than that -- but it's one of
 * the key benefits of having this module.
 *
 */

var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();
module.exports = dispatcher;