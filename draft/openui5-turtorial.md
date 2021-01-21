# Open UI5 Turtorial

## UI5

https://openui5.hana.ondemand.com/resources/sap-ui-core.js


```javascript
<script
	id="sap-ui-bootstrap"
	src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
	data-sap-ui-theme="sap_belize"
	data-sap-ui-libs="sap.m"
	data-sap-ui-compatVersion="edge"
	data-sap-ui-async="true"
	data-sap-ui-onInit="module:sap/ui/demo/walkthrough/index"
	data-sap-ui-resourceroots='{
		"sap.ui.demo.walkthrough": "./"
	}'>
</script>
```

> In this step, we load the OpenUI5 framework from our local webserver and initialize the core modules with the following configuration options:
The src attribute of the <script> tag tells the browser where to find the OpenUI5 core library – it initializes the OpenUI5 runtime and loads additional resources, such as the libraries specified in the data-sap-ui-libs attribute.

- The OpenUI5 controls support different themes, we choose sap_belize as our default theme.

- We specify the required UI library sap.m containing the UI controls we need for this tutorial.

- To make use of the most recent functionality of OpenUI5 we define the compatibility version as edge.

- We configure the process of “bootstrapping” to run asynchronously.

- This means that the OpenUI5 resources can be loaded simultaneously in the background for performance reasons.

- We define the module to be loaded initially in a declarative way. With this, we avoid directly executable JavaScript code in the HTML file. This makes your app more secure. We will create the script that this references to further down in this step.
We tell OpenUI5 core that resources in the sap.ui.demo.walkthrough namespace are located in the same folder as index.html. This is, for example, necessary for apps that run in the SAP Fiori launchpad.

- `src` 声明 sap-ui-core 组件的位置
- `data-sap-ui-theme` 设置主题，默认：sap_belize
- `ata-sap-ui-libs` 设置 library
- `data-sap-ui-compatVersion` 设置兼容性
- `data-sap-ui-async` 是否后台同步
- `data-sap-ui-onInit` 等于在 html 加载 index.js，不过这种方式会加密 javascript 文件
- `data-sap-ui-resourceroots` 设置路径，类似 alias

### Controls

=== "index.html"
    ```html
    <body class="sapUiBody" id="content">
    </body>
    ```

=== "index.js"
    ```js
    sap.ui.define([
        "sap/m/Text"

    ], function (Text) {
        "use strict";

        new Text({
            text: "Hello World"
        }).placeAt("content");

    });
    ```

### XML Views


=== "webapp/view/App.view.xml"
    ```xml
    <mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">
    <Text text="Hello World"/>
    </mvc:View>
    ```

=== "webapp/index.js"
    ```javascript
        sap.ui.define([
            "sap/ui/core/mvc/XMLView"
        ], function (XMLView) {
            "use strict";
            XMLView.create({
                viewName: "sap.ui.demo.walkthrough.view.App"
            }).then(function (oView) {
                oView.placeAt("content");
            });
        });
    ```

### Controller

Controller and View is capitalized

Controllers carry the same name as the related view (if there is a 1:1 relationship)

一对一的情况下 Controller 保持与 View 名称一致性

### JSON Model




## UI5 CLI

npm install --global @ui5/cli

ui5 serve

```bash
tree

my-app/
    \_ node_modules/ 
    \_ webapp/ 
        \_ manifest.json
    \_ ui5.yaml # ui5 配置文件
    \_ package.json # npm 配置文件
my-reuse-library/
    \_ node_modules/
    \_ src/
    \_ test/
    \_ ui5.yaml
    \_ package.json
```

ui5.yml

```yaml
specVersion: '2.1'
metadata:
  name: openui5-demo
type: application
```

mainifest.json

```json
{
	"_version": "1.12.0",
	"sap.app": {
		"id": "HelloWorld.helloworld-ui5cli",
		"type": "application",
		"i18n": "i18n/i18n.properties",
		"applicationVersion": {
			"version": "1.0.0"
		},
		"title": "{{appTitle}}",
		"description": "{{appDescription}}"
	},

	"sap.ui": {
		"technology": "UI5",
		"icons": {
			"icon": "",
			"favIcon": "",
			"phone": "",
			"phone@2": "",
			"tablet": "",
			"tablet@2": ""
		},
		"deviceTypes": {
			"desktop": true,
			"tablet": true,
			"phone": true
		}
	},

	"sap.ui5": {
		"rootView": {
			"viewName": "HelloWorld.helloworld-ui5cli.view.MainView",
			"type": "XML",
			"async": true,
			"id": "app"
		},
		"dependencies": {
			"minUI5Version": "1.60.0",
			"libs": {
				"sap.ui.core": {},
				"sap.m": {},
				"sap.ui.layout": {}
			}
		},
		"contentDensities": {
			"compact": true,
			"cozy": true
		},
		"models": {
			"i18n": {
				"type": "sap.ui.model.resource.ResourceModel",
				"settings": {
					"bundleName": "HelloWorld.helloworld-ui5cli.i18n.i18n"
				}
			}
		},
		"resources": {
			"css": [{
				"uri": "css/style.css"
			}]
		},
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"viewPath": "HelloWorld.helloworld-ui5cli.view",
				"controlId": "app",
				"controlAggregation": "pages",
				"async": true
			},
			"routes": [{
				"name": "RouteMainView",
				"pattern": "RouteMainView",
				"target": ["TargetMainView"]
			}],
			"targets": {
				"TargetMainView": {
					"viewType": "XML",
					"viewLevel": 1,
					"viewName": "MainView"
				}
			}
		}
	}
}
```


## 参考

- https://sap.github.io/ui5-tooling/
- https://openui5.hana.ondemand.com/
- https://blogs.sap.com/2015/07/15/sapui5-vs-fiori/
- https://github.com/javalisson/helloworld-ui5cli
- https://github.com/SAP/openui5-sample-app




