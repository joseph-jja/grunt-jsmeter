var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["GJSM"] = this["GJSM"] || {};

this["GJSM"]["templates/index.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<li><a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.filename : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.filename : depth0), depth0))
    + "</a>"
    + escapeExpression(lambda((depth0 != null ? depth0.complexity : depth0), depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<html>\n<title>"
    + escapeExpression(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filename","hash":{},"data":data}) : helper)))
    + "</title>\n<style type=\"text/css\">\n  \n</style>\n<body>\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.filelist : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n\n<body>\n</html>\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["GJSM"];}