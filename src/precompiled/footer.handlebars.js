export const footer = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    const alias1=container.lambda; const alias2=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `<div class="footer">\n    <p class="footer_content">\n		SnakeAlive on GitHub: <a href="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"backend_href") : depth0), depth0))
     }">backend</a> | <a href="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"frontend_href") : depth0), depth0))
     }">frontend</a>\n		</p>\n</div>\n`;
},"useData":true});
