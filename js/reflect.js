/**
 * Reflect is inspired by Christophe Grande's [Enlive](https://github.com/cgrand/enlive)
 * This module turns a DOM node into a snippet or template.  Use a templates
 * to modify a DOM node in place.  Use a snippet to generate new nodes that you
 * can insert into the DOM.
 *
 */

/**
 * snippet() create node generating reflector for transformation
 *
 * @param {String} selector
 * @param {function} transform
 */
exports.snippet = function(selector, transform) {
  var selection = document.querySelector(selector).cloneNode(true);
  var reflector = {
    render: function(object) {
      var reflection = selection.cloneNode(true);
      var render = function() {
        return transform.call(reflection, object);
      };
      return render();
    }
  }
  return reflector;
}

/**
 * template() create node updating reflector for transormation
 *
 * @param {String} selector
 * @param {function} transform
 */
exports.template = function(selector, transform) {
  var selection = document.querySelector(selector);
  var reflector = {
    render: function(object) {
      return transform.call(selection, object);
    }
  };
  return reflector;
}
