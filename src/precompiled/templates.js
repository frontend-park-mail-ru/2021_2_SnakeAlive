(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<li>\n								<input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":18,"column":21},"end":{"line":18,"column":29}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":18,"column":35},"end":{"line":18,"column":41}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":18,"column":56},"end":{"line":18,"column":64}}}) : helper)))
    + "\">\n							</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div id=\"substrate\">\n				<div id=\"popup\">\n					<div id=\"closeLine\">\n						<button class=\"btnHead\" id=\"btnClose\">\n							<img src=\"image/020-close.png\" class=\"cross\">\n						</button>\n					</div>\n					<form method=\"post\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"cssClass") || (depth0 != null ? lookupProperty(depth0,"cssClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClass","hash":{},"data":data,"loc":{"start":{"line":8,"column":32},"end":{"line":8,"column":44}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"formId") || (depth0 != null ? lookupProperty(depth0,"formId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formId","hash":{},"data":data,"loc":{"start":{"line":8,"column":50},"end":{"line":8,"column":60}}}) : helper)))
    + "\">\n						<ul>\n							<li>\n								<h2 class=\"logo-h\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"formName") || (depth0 != null ? lookupProperty(depth0,"formName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formName","hash":{},"data":data,"loc":{"start":{"line":11,"column":27},"end":{"line":11,"column":39}}}) : helper)))
    + "</h2>\n							</li>\n							<li>\n								<p id=\"formErrorBlock\" class=\"formErrorBlock\">ошибок нет</p>\n							</li>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":6},"end":{"line":20,"column":15}}})) != null ? stack1 : "")
    + "							<li>\n								<div id=\"btn-left-align\">\n									<button id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" class=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"cssClass") : stack1), depth0))
    + "\">"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</button>\n								</div>\n							</li>\n						</ul>\n					</form>\n				<div>\n			<div>\n			";
},"useData":true});
templates['test'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"lolo") || (depth0 != null ? lookupProperty(depth0,"lolo") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"lolo","hash":{},"data":data,"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":11}}}) : helper)))
    + "<a>";
},"useData":true});
})();