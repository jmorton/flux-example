/**
 * Actions are objects that contain (what I call) a signal and payload.
 *
 * I don't like calling these events, because although they are similar
 * to DOM events, they are different. Instead of having to differentiate
 * between a DOM event vs. a Flux event, I'll just use a different term.
 *
 */

var dispatcher = require("./dispatcher.js");

var actions = {

  /**
   * This action runs whenever things need to be brought to the inital
   * state, typically on page load.
   */
  init: function(event) {
    dispatcher.dispatch({
      actionType: "init"
    });
  }

};

module.exports = actions;