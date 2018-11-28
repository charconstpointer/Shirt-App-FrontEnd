export default class OrdersController {
  constructor($scope, $http) {
    this.url = "https://github.com/preboot/angular-webpack";
    $http.get("http://localhost:9000/order/").then(response => {
      $scope.orders = response.data;
    });
    $scope.sizes = ["S", "M", "L", "XL"];
  }
}
