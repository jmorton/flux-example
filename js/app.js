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
document.addEventListener("DOMContentLoaded", views.init);


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
    case "pick":
      stores.PeopleStore.pick(action);
      break;
    case "reset":
      stores.PeopleStore.unpick();
      break;
    default:
      console.error("Dispatcher cannot handle action", action);
  }
});

/**
 * [stores] -> [views]
 */

stores.PeopleStore.addChangeListener(function() {
  views.list.render(stores.PeopleStore.all());
  views.form.render(stores.PeopleStore.selected());
});
