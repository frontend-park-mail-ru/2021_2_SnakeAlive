export const sights = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    let stack1; const alias1=depth0 != null ? depth0 : (container.nullContext || {}); const alias2=container.lambda; const alias3=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `<div class="card">\n    <div class="carousel">\n${
     (stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"imgs") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":12,"column":17}}})) != null ? stack1 : ""
     }    </div>\n\n    <div class="card__data__holder">\n        <div class="card__name__holder">\n            ${
     alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
     }\n        </div>\n\n        <div class="tag__holder">\n${
     (stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":29,"column":21}}})) != null ? stack1 : ""
     }        </div>\n\n        <div class="card__comment__holder">\n										<span class="card__comment__author font__default">\n											Автор:\n											<a class="font__link">${
     alias3(alias2((depth0 != null ? lookupProperty(depth0,"author") : depth0), depth0))
     }</a>\n										</span>\n            <div class="card__comment__data font__default">\n                ${
     alias3(alias2((depth0 != null ? lookupProperty(depth0,"comment") : depth0), depth0))
     }\n            </div>\n        </div>\n    </div>\n</div>\n`;
},"2":function(container,depth0,helpers,partials,data) {
    let stack1; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `${(stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":9,"column":19}}})) != null ? stack1 : ""
     }                  <img src="${
     container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"source") : depth0), depth0))
     }" alt="" class='"photo'>\n              </div>\n`;
},"3":function(container,depth0,helpers,partials,data) {
    return "              <div class =\"card__carousel__item card__carousel__item_main\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "              <div class =\"card__carousel__item\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    let stack1; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `                <div class="tag card__tag card__tag__font">\n                    ${
     container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
     }\n${
     (stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":24,"column":20},"end":{"line":27,"column":27}}})) != null ? stack1 : ""
     }                </div>\n`;
},"8":function(container,depth0,helpers,partials,data) {
    return "";
},"10":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"span__font__large\">•</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    let stack1; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"cards") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":9}}})) != null ? stack1 : "");
},"useData":true});
