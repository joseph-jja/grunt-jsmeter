var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["GJSM"] = this["GJSM"] || {};

this["GJSM"]["templates/page.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <tr class=\""
    + escapeExpression(((helper = (helper = helpers.cssClassName || (depth0 != null ? depth0.cssClassName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cssClassName","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.lineStart || (depth0 != null ? depth0.lineStart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lineStart","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.statements || (depth0 != null ? depth0.statements : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"statements","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.lines || (depth0 != null ? depth0.lines : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lines","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"comments","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.commentsPercent || (depth0 != null ? depth0.commentsPercent : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"commentsPercent","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.branches || (depth0 != null ? depth0.branches : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"branches","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.depth || (depth0 != null ? depth0.depth : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"depth","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.complexity || (depth0 != null ? depth0.complexity : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"complexity","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.halsteadVolume || (depth0 != null ? depth0.halsteadVolume : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"halsteadVolume","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.halsteadPotential || (depth0 != null ? depth0.halsteadPotential : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"halsteadPotential","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.progLevel || (depth0 != null ? depth0.progLevel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"progLevel","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.miVolume || (depth0 != null ? depth0.miVolume : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"miVolume","hash":{},"data":data}) : helper)))
    + "</td>\n        <tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<html>\n<title>"
    + escapeExpression(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filename","hash":{},"data":data}) : helper)))
    + "</title>\n<style type=\"text/css\">\n  table { border: 1px solid black; }\n  td { border: 1px solid black; }\n  tr.odd { background: #ffe87c; }\n  tr.even { background: #ffffff; }\n  tr.complex td { background: red; color: #ffffff; }\n</style>\n<body>\nSource file: "
    + escapeExpression(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"filename","hash":{},"data":data}) : helper)))
    + "\n<br><a href=\"index.html\">Index</a>\n<table>\n<tr>\n<td>name</td>\n<td>line start</td>\n<td>statements</td>\n<td>lines</td>\n<td>comments</td>\n<td>% comments</td>\n<td>branches</td>\n<td>depth</td>\n<td>complexity</td>\n<td>Halstead Volume</td>\n<td>Halstead Potential</td>\n<td>Program Level</td>\n<td>MI Volume</td>\n</tr>\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helperMissing),(options={"name":"data","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.data) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</table>\n\n<body>\n</html>\n";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["GJSM"];}