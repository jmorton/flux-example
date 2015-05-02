/**
 * Data flow in Flux goes like so:
 *
 * [actions] -> [dispatcher] -> [stores] -> [views]
 *
 * Because this is a simple project, there is a single file containing
 * the code for each module (as opposed to a bunch of directories).
 *
 */

var actions    = require("./actions.js");
var dispatcher = require("./dispatcher.js");
var stores     = require("./stores.js");
var views      = require("./views.js");

document.app = { stores: stores };

/**
 * [DOM events] -> [actions]
 */
document.addEventListener("DOMContentLoaded", function() {

  // it'd be nice to look at the URL and pick the contact
  // if there is an ID given.

  // also, we need to figure out how to have "live" events
  // without jquery

  actions.init();

  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    actions.save(event);
  });

  document.querySelector("[data-action=remove]").addEventListener("click", function(event) {
    event.preventDefault();
    actions.remove(event);
  })

});

window.addEventListener("hashchange", function(event) {
  event.preventDefault();
  actions.show(event);
});

/**
 * [dispatcher] -> [stores]
 */

dispatcher.register(function(action) {
  console.log(action);
  switch(action.actionType) {
    case "init":
      stores.PeopleStore.load(action);
      break;
    case "remove":
      stores.PeopleStore.remove(action);
      break;
    case "save":
      stores.PeopleStore.save(action);
      break;
    case "show":
      stores.PeopleStore.show(action);
      break;
    default:
      console.error("Dispatcher cannot handle action", action);
  }
});

/**
 * [stores] -> [views]
 */

stores.PeopleStore.addChangeListener(function() {
  console.log("Now we update the list template and form!");
  views.listTemplate.render(stores.PeopleStore.all());
  views.formTemplate.render(stores.PeopleStore.selected());
});
