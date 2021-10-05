export const countrySightsTemplate = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `<div id="data__holder">\n    <div class="header_holder" id ="header__holder">\n        <h2 class="header__default cardlist__header__main">\n            Лучшие достопримечательности ${
     container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
     }\n        </h2>\n    </div>\n    \n    <div class="card__grid card__grid__3" id="card-grid-wrapper"></div>\n</div>\n`;
},"useData":true});
