"use strict";angular.module("searchInterfaceApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","services.config"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/scenariothree",{templateUrl:"views/scenariothree.html",controller:"ScenarioThreeCtrl",controllerAs:"scenariothree"}).when("/scenariothreelanding",{templateUrl:"views/scenariothreelanding.html",controller:"ScenarioThreeLandingCtrl",controllerAs:"scenariothreelanding"}).when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("searchInterfaceApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("searchInterfaceApp").directive("cytoscapeDirective",["$rootScope","$window",function(a,b){return{restrict:"E",template:'<div id="cy"></div>',replace:!0,scope:{cyNodes:"=",cyEdges:"=",cyClick:"&"},link:function(c){c.style=cytoscape.stylesheet().selector("node").css({"background-color":"#666",label:"data(name)",width:"label",height:"label",shape:"rectangle"}).selector("edge").css({width:3,"line-color":"#ccc","target-arrow-color":"#ccc","target-arrow-shape":"triangle"}).selector(".background").css({"text-border-color":"#000","text-background-color":"#ccc","text-background-opacity":.75,"text-valign":"center","text-halign":"center"}),c.readyfunc=function(){var a=this;a.elements().unselectify(),a.on("tap","node",function(a){var b=a.cyTarget,d=b.id();c.cyClick({value:d})})},console.debug("doCy called"),c.cy=cytoscape({container:$("#cy"),style:c.style,ready:c.readyfunc,elements:c.cyNodes.concat(c.cyEdges)}),c.params={name:"cola",animate:!0,randomize:!1,fit:!0,nodeSpacing:3,edgeLengthVal:30,maxSimulationTime:1500},c.layout=c.cy.makeLayout(c.params),c.layout.run(),c.cy.nodes().forEach(function(a){var b=a.data("id");a.on("tap",function(){console.debug("Node "+b+" was clicked")})}),a.$on("reloadGraph",function(){console.debug("Reloading the graph!!"),c.layout.stop(),c.cy=cytoscape({container:$("#cy"),style:c.style,ready:c.readyfunc,elements:c.cyNodes.concat(c.cyEdges)}),c.layout=c.cy.makeLayout(c.params),c.layout.run()}),a.$on("appChanged",function(a,b){console.debug("Something changed!!"),c.layout.stop(),b&&b.length>0&&(console.debug("Adding new node"),c.cy.add(b),c.layout=c.cy.makeLayout(c.params)),c.layout.run()}),angular.element(b).bind("resize",function(){c.cy.resize(),c.layout.run()})}}}]),angular.module("searchInterfaceApp").directive("focusMe",function(){return{scope:{trigger:"=focusMe"},link:function(a,b){a.$watch("trigger",function(c){c===!0&&(b[0].focus(),a.trigger=!1)})}}}),angular.module("searchInterfaceApp").controller("ScenarioThreeCtrl",["$scope","$rootScope","$location","$anchorScroll",function(a,b,c,d){a.disableBtns=function(){a.searchbtnDisabled=!0,a.sobtnDisabled=!0,a.addbtnDisabled=!0,a.resetbtnDisabled=!0,a.addbtnDisabled=!0,a.subDisabled=!0,a.predDisabled=!0,a.objDisabled=!0},a.enableBtns=function(){a.searchbtnDisabled=!1,a.sobtnDisabled=!1,a.addbtnDisabled=!1,a.resetbtnDisabled=!1,a.addbtnDisabled=!1,a.subDisabled=!1,a.predDisabled=!1,a.objDisabled=!1},a.enableBtns(),a.searchbtnDisabled=!0,a.focusSubject=!0;var e=[],f=[];a.refresh=function(){console.debug("refreshing the graph"),b.$broadcast("appChanged")},a.reset=function(){console.debug("resetting the graph"),a.nodes=e,a.edges=f,a.searchbtnDisabled=!0,g(),b.$broadcast("reloadGraph")};var g=function(){a.valueToId={},a.nextId=0,a.nodes.forEach(function(b){a.valueToId[b.data.name]=b.data.id,b.data.id>=a.nextId&&(a.nextId=b.data.id+1)})};a.nodes=e,a.edges=f,g();var h=function(b){if(null===b||""===b.trim())return null;if("?"!==b&&b in a.valueToId)return a.valueToId[b];var c=a.nextId++;return a.valueToId[b]=c,console.debug("Assigning id "+c+" to value "+b),c},i=function(a,b){return{data:{id:a,name:b},classes:"background"}},j=function(a,b){return{data:{id:a+"-"+b,source:a,target:b}}};a.search=function(){console.debug("Starting a search"),b.$broadcast("searchInitiated"),a.template="searchresults",a.disableBtns();var e=c.hash();c.hash("searchresultscontainer"),d(),c.hash(e)},a.addTriple=function(){if(console.debug("Trying to add a triple."),null!==a.triple){var c=h(a.triple.subject),d=h(a.triple.predicate),e=h(a.triple.object),f=[];null!==c&&f.push(i(c,a.triple.subject)),null!==d&&f.push(i(d,a.triple.predicate)),null!==e&&f.push(i(e,a.triple.object)),null!==c&&null!==d&&f.push(j(c,d)),null!==d&&null!==e&&f.push(j(d,e)),f.length>0&&(b.$broadcast("appChanged",f),a.searchbtnDisabled=!1),a.triple.subject="",a.triple.predicate="",a.triple.object=""}}}]),angular.module("searchInterfaceApp").controller("ScenarioThreeLandingCtrl",["$routeParams",function(a){console.debug(a.test)}]),angular.module("searchInterfaceApp").directive("goClick",["$location",function(a){return function(b,c,d){var e;d.$observe("goClick",function(a){e=a}),c.bind("click",function(){b.$apply(function(){a.path(e)})})}}]),angular.module("searchInterfaceApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html","<p>You have reached the Claremont Graduate University Search Interface Prototype by Bill Jung and Jeff Harwell</p> <p>At present this site should only be used by following a link from Amazon Mechanical Turk</p> <p>Please return to MTurk and follow the link provided to enter the test site.</p>"),a.put("views/scenariothree.html",'<div class="row"> <div class="col-md-12"> <form class="form-inline"> <div class="form-group"> <label class="sr-only" for="subject">You want</label> <input type="text" class="form-control" ng-model="triple.subject" placeholder="You want" id="subject" focus-me="focusSubject" ng-disabled="subDisabled" autofocus> </div> <div class="form-group"> <label class="sr-only" for="predicate">to find</label> <input type="text" class="form-control" ng-model="triple.predicate" placeholder="to find" id="predicate" ng-disabled="predDisabled"> </div> <div class="form-group"> <label class="sr-only" for="predicate">?</label> <input type="text" class="form-control" ng-model="triple.object" placeholder="?" id="object" ng-disabled="objDisabled"> </div> <button class="btn btn-default" type="button" ng-disabled="addbtnDisabled" ng-click="addTriple(); focusSubject=true">Add Terms!</button> <button class="btn btn-default" type="button" ng-disabled="sobtnDisabled" ng-click="reset(); focusSubject=true">Start Over</button> <button class="btn btn-default" type="button" ng-disabled="searchbtnDisabled" ng-click="search()">Search!</button> </form> </div> <!-- /.col-md-12 --> </div> <!-- // row --> <div class="row"> <div class="col-md-6"> <cytoscape-directive cy-nodes="nodes" cy-edges="edges" cy-new="newnode" cy-click="doClick(value)"></cytoscape-directive> </div> <div class="col-md-6"> <div id="searchresultscontainer"> <ng-include src="template"></ng-include> </div> </div> </div> <div class="row"> <div class="col-md-12"> <button class="btn btn-default" type="button" go-click="/scenariothreelanding">Back to Instructions</button> </div> </div> <script type="text/ng-template" id="searchresults"><h1>Results</h1>\n    <div class="row">\n        <div class="col-md-12">\n        <h4>Asthma Causes - Mayo Clinic</h4>\n        <p>Asthma triggers are different from persson to person and can include: airborn allergens, such as pollen, animal ...</p>\n        <strong>www.mayoclinic.org/diseases/asthma/causes</strong>\n        </div>\n    </div>\n    <div class="row top-buffer">\n        <div class="col-md-12">\n        <h4>What Triggers or Causes Asthma? | AAFA.org</h4>\n        <p>If you have asthma, it is important to keep track of the causes or triggers that you know provoke your asthma ...</p>\n        <strong>www.aafa.org/asthma-triggers.html</strong>\n        </div>\n    </div></script>'),a.put("views/scenariothreelanding.html",'<h1>Welcome to the Claremont Graduate University Search Research Site</h1> <p>Please watch the short instructional video and then continue on to the search site</p> <p>Once you have completed a search you will be presented with a link that will take you to a short survey.</p> <p>After you have completed the survey you will be directed back to Amazon MTurk</p> <div class="row"> <div class="col-md-8"> <iframe width="560" height="315" src="https://www.youtube.com/embed/PZQYLiMbhg8" frameborder="0" allowfullscreen></iframe> </div> <div class="col-md-4"> <p>Proceed to the search site</p> <button class="btn btn-default" type="button" go-click="/scenariothree">Go To Search!</button> </div> </div>')}]);