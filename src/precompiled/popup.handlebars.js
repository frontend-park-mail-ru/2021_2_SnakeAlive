export const popup = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    const alias1=container.lambda; const alias2=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `							<div>\n								<p id='err-${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
     }' class="formErrorBlock">ошибок нет</p>\n								<input type="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
     }" id="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
     }" placeholder="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
     }" class="startInput">\n							</div>\n`;
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    let stack1; const alias1=container.lambda; const alias2=container.escapeExpression; const lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return `<div id="substrate">\n        <div id="popup">\n            <div id="closeLine">\n                <button class="btnHead" id="btnClose">\n                    <img src="image/020-close.png" class="cross">\n                </button>\n            </div>\n            <form method="post" class="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"cssClass") : depth0), depth0))
     }" id="${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"formId") : depth0), depth0))
     }">\n							<div>\n							<h2 class="formName">${
     alias2(alias1((depth0 != null ? lookupProperty(depth0,"formName") : depth0), depth0))
     }</h2>\n							</div>\n${
     (stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":7},"end":{"line":17,"column":16}}})) != null ? stack1 : ""
     }							<div>\n							<button id="${
     alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
     }" class="${
     alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"cssClass") : stack1), depth0))
     }">${
     alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"button") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
     }</button>\n								</div>\n            </form>\n        </div>\n</div>\n\n`;
},"useData":true});
