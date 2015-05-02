/**
 * Actions are objects that contain (what I call) a signal and payload.
 *
 * I don't like calling these events, because although they are similar
 * to DOM events, they are different. Instead of having to differentiate
 * between a DOM event vs. a Flux event, I'll just use a different term.
 *
 */

var dispatcher = require("./dispatcher.js");
var assign = require('object-assign');

NodeList.prototype.map = function(step){
    return Array.prototype.map.call(this, step);
};

var actions = {

  /**
   * This action runs whenever things need to be brought to the inital
   * state, typically on page load.
   */
  init: function(event) {
    dispatcher.dispatch({
      actionType: "init"
    });
  },

  remove: function(event) {
    var person_id = Number.parseInt(document.querySelector("input[name=id]").value);
    if (person_id) {
      dispatcher.dispatch({
        actionType: "remove",
        person_id: person_id
      });
    }
  },

  /**
   * Let's see if we can use this for both creating and updating people.
   */
  save: function(event) {
    var person = {};
    var person_id = Number.parseInt(document.querySelector("input[name=id]").value);
    if (person_id) {
      person["id"] = person_id;
    }
    person["given-name"] = document.querySelector("input[name=given-name]").value;
    person["family-name"] = document.querySelector("input[name=family-name]").value;
    dispatcher.dispatch({
      actionType: "save",
      person: person
    });
  },

  show: function(event) {
    var person_id = window.location.hash.slice(1);
    dispatcher.dispatch({
      actionType: "show",
      person_id: person_id
    });
  }

};

module.exports = actions;