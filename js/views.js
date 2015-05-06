/**
 * Views are functions that update the DOM as needed using data provided
 * by a store.  This code does not use React -- it uses something that
 * I prefer and will elaborate on later.  However, this groudwork should
 * give you a sense of where we're heading.
 */
var Reflect = require("./reflect.js");
var views = {}

views.init = function() {

  views.list = Reflect.template(".people", function(people) {
    while (this.firstChild) { this.removeChild(this.firstChild); }
    for (p in people) {
      this.appendChild(views.item.render(people[p]));
    }
    return this;
  });

  views.item = Reflect.snippet(".people a", function(person) {
    this.querySelector(".given-name").textContent = person["given-name"];
    this.querySelector(".family-name").textContent = person["family-name"];
    this.href = "#" + person["id"];
    return this;
  });

  /**
   * Map an object's properties to form elements that have a corresponding
   * name attribute.
   *
   * For example:
   *   var person = { 'given-name': 'Alice' };
   *   <input name="given-name" value="Alice">
   *
   */
  views.form = Reflect.template("form.editor", function(person) {
    var inputs = this.querySelectorAll("[name]");
    if (person) {
      for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = person[inputs[i].name];
      }
    } else {
      for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = "";
      }
    }
    return this;
  });

};

module.exports = views;