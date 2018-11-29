export default class OrdersController {
  constructor($scope, $http) {
    $http.get("http://localhost:9000/order/").then(response => {
      $scope.orders = response.data;
    });
  }
}
