/**
 * Views are functions that update the DOM as needed using data provided
 * by a store.  This code does not use React -- it uses something that
 * I prefer and will elaborate on later.  However, this groudwork should
 * give you a sense of where we're heading.
 */
var Reflect = require("./reflect.js");
var views = {}

document.addEventListener("DOMContentLoaded", function() {

  views.listTemplate = Reflect.template(".people", function(people) {
    while (this.firstChild) { this.removeChild(this.firstChild); }
    for (p in people) {
      this.appendChild(views.itemSnippet.render(people[p]));
    }
    return this;
  });

  views.itemSnippet = Reflect.snippet(".people a", function(person) {
    this.querySelector(".given-name").textContent = person["given-name"];
    this.querySelector(".family-name").textContent = person["family-name"];
    this.href = "#" + person["id"];
    return this;
  });

  views.formTemplate = Reflect.template("form.editor", function(person) {
    if (person) {
      this.querySelector("[name=id]").value = person['id'];
      this.querySelector("[name=given-name]").value = person['given-name'];
      this.querySelector("[name=family-name]").value = person['family-name'];
    } else {
      this.querySelector("[name=id]").value = "";
      this.querySelector("[name=given-name]").value = "";
      this.querySelector("[name=family-name]").value = "";
    }
    return this;
  });

});

module.exports = views;