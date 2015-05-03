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

document.app = { stores: stores, actions: actions };

/**
 * [DOM events] -> [actions]
 */

// actions.generate() will trigger other actions -- it's a router of sorts.
document.addEventListener("click", actions.generate);

document.addEventListener("DOMContentLoaded", actions.init);


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
