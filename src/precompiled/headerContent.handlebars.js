export const headerContent = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    const alias1=container.lambda; const alias2=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `<div class="logo-h"><h2  id="click-logo">TripAdvisor</h2></div>\n<div id="register-place-h"></div>\n<div id="login-place-h">\n	<p>${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
     } ${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"surname") : depth0), depth0))
     }</p>\n</div>\n`;
},"useData":true});
