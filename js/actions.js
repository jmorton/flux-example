/**
 * Actions are objects that contain (what I call) a signal and payload.
 *
 * I don't like calling these events, because although they are similar
 * to DOM events, they are different. Instead of having to differentiate
 * between a DOM event vs. a Flux event, I'll just use a different term.
 *
 */

var dispatcher = require("./dispatcher.js");
var assign = require("object-assign");

NodeList.prototype.map = function(step){
  return Array.prototype.map.call(this, step);
};

var actions = {

  /**
   * actUpon() is a very general action generator.  Because actions handle the
   * extractiion of useful data out of events, this is pretty light weight.
   * By convention, the target element for an action should have a data-action
   * attribute.  The value is the name of the action.
   *
   * For example:
   * <a href="#" data-action="show">Meow</a>
   *
   */
  generate: function(event) {
    console.log(event);
    if (event.target.matches("[data-action]")) {
      event.preventDefault();
      var named = event.target.getAttribute("data-action");
      if (typeof(actions[named]) !== "undefined") {
        actions[named].call(this, event);
      }
    }
  },

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

  reset: function(event) {
    dispatcher.dispatch({
      actionType: "reset"
    });
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

  pick: function(event) {
    var person_id = event.target.hash.slice(1);
    dispatcher.dispatch({
      actionType: "pick",
      person_id: person_id
    });
  }

};

module.exports = actions;