import angular from "angular";
import "bootstrap";
import ordersController from "./controllers/ordersController";
import shoppingController from "./controllers/shoppingController";

import "../style/app.css";

let app = () => {
  return {
    template: require("./app.html"),
    controller: "AppCtrl",
    controllerAs: "app"
  };
};

const MODULE_NAME = "app";

class AppCtrl {
  constructor() {}
}

angular
  .module(MODULE_NAME, [
    require("angular-route"),
    require("angular-ui-bootstrap")
  ])
  .directive("app", app)
  .config([
    "$routeProvider",
    $routeProvider => {
      $routeProvider
        .when("/home", {
          template: require("../views/home.html"),
          controller: "shoppingController"
        })
        .when("/orders", {
          template: require("../views/orders.html"),
          controller: "ordersController"
        });
    }
  ])
  .controller("AppCtrl", AppCtrl)
  .controller("ordersController", ordersController)
  .controller("shoppingController", shoppingController);

export default MODULE_NAME;
