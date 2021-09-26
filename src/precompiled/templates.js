(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cards'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<giv id=\"inner\" class=\"inner\">\n				<div class=\"inner-line\">\n					<div class=\"inner-left\">One</div>\n					<div class=\"inner-right\">One</div>\n				</div>\n				<div class=\"inner-line\">\n					<div class=\"inner-left\">One</div>\n					<div class=\"inner-right\">One</div>\n				</div>\n			</div>";
},"useData":true});
templates['county_sights'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"data__holder\">\n    <div class=\"header_holder\">\n        <h2 class=\"header__default cardlist__header__main\">\n            Лучшие достопримечательности "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":49}}}) : helper)))
    + "\n        </h2>\n    </div>\n\n    <div class=\"card__grid\" id=\"123\"></div>\n</div>";
},"useData":true});
templates['footer'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"footer\">\n				<p>\n				SnakeAlive on GitHub: <a href=\"https://github.com/go-park-mail-ru/2021_2_SnakeAlive\">backend</a> | <a href=\"https://github.com/frontend-park-mail-ru/2021_2_SnakeAlive\">frontend</a>\n				</p>\n			</div>";
},"useData":true});
templates['header'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header\" id=\"header\">\n	<div class=\"logo-h\"><h2>TripAdvisor</h2></div>\n	<div id=\"register-place-h\"></div>\n	<div id=\"login-place-h\"></div>\n    <div id=\"popup-place\"></div>\n</div>";
},"useData":true});
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
templates['sights'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card\">\n    <div class=\"carousel\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"imgs") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":12,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"card__data__holder\">\n        <div class=\"card__name__holder\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":17,"column":12},"end":{"line":17,"column":20}}}) : helper)))
    + "\n        </div>\n\n        <div class=\"tag__holder\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":23,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n\n        <div class=\"card__comment_holder\">\n										<span class=\"card__comment__author font__default\">\n											Автор:\n											<a href=\"/profile/"
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":29,"column":29},"end":{"line":29,"column":39}}}) : helper)))
    + "\" class=\"font__link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":29,"column":60},"end":{"line":29,"column":70}}}) : helper)))
    + "</a>\n										</span>\n            <div class=\"card__comment__data font__default\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"comment") || (depth0 != null ? lookupProperty(depth0,"comment") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data,"loc":{"start":{"line":32,"column":16},"end":{"line":32,"column":27}}}) : helper)))
    + "\n            </div>\n        </div>\n    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":9,"column":19}}})) != null ? stack1 : "")
    + "                  <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"source") || (depth0 != null ? lookupProperty(depth0,"source") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"source","hash":{},"data":data,"loc":{"start":{"line":10,"column":28},"end":{"line":10,"column":38}}}) : helper)))
    + "\" alt=\"\">\n              </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "              <div class =\"card__carousel__item card__carousel__item_main\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "              <div class =\"card__carousel__item\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"tag card__tag card__tag__font\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":22,"column":59},"end":{"line":22,"column":67}}}) : helper)))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"cards") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":37,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();