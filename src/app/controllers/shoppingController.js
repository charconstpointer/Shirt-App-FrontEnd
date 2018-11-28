export default class ShoppingController {
  constructor($scope, $http) {
    $http.get("http://localhost:9000/shirt/ ").then(response => {
      $scope.allShirts = response.data;
      $scope.variations = [...new Set(response.data.map(item => item.color))];
    });

    $scope.availableSizes = [];
    $scope.basket = [];
    $scope.fetchSizes = color => this.fetchSizes(color, $scope);
    $scope.validateName = () => this.validateName($scope)
    $scope.validateAge = () => this.validateAge($scope);
    $scope.addToBasket = () => this.addToBasket($scope)
    $scope.selectedSize = (size) => this.selectedSize($scope, size)
    $scope.placeAnOrder = () => this.placeAnOrder($scope, $http)
    $scope.removeElement = (shirt) => this.removeElement(shirt, $scope)
    $scope.isAgeValid = true;
    $scope.isNameValid = null;
    $scope.client = null
    $scope.selectedShirt = {
      shirtId: null,
      color: null,
      size: null,
    }
  }
  fetchSizes(color, $scope) {
    $scope.availableSizes = [];
    $scope.available = $scope.allShirts.filter(shirt => shirt.color === color);

    for (let shirt of $scope.available) {
      $scope.availableSizes.push(shirt.size);
    }
    $scope.selectedShirt.color = color
  }

  removeElement(shirt, $scope) {
    $scope.basket.splice($scope.basket.indexOf(shirt), 1)
  }

  selectedSize($scope, size) {
    $scope.selectedShirt.size = size
  }

  placeAnOrder($scope, $http) {
    let order = {
      name: $scope.client.name,
      age: $scope.client.age,
      date: "2019-01-01",
      shirts: []
    }
    for (let shirt of $scope.basket) {
      order.shirts.push(angular.copy(shirt))
    }

    $http({
      method: 'POST',
      url: 'http://localhost:9000/order/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        "$$hashKey": "object:92",
        "age": parseInt($scope.client.age),
        "date": "TUDEJ",
        "name": $scope.client.name,
        "shirts": $scope.basket
      }
    }).then(res => {
      $scope.client.age = null
      $scope.client.name = null
      $scope.basket = []
    })
  }

  addToBasket($scope) {
    let shirt = $scope.allShirts.filter(shirt =>
      shirt.color === $scope.selectedShirt.color
      &&
      shirt.size === $scope.selectedShirt.size)
    if (shirt[0].shirtId > 0) {
      $scope.selectedShirt.shirtId = shirt[0].shirtId;
      $scope.basket.push(shirt[0])
    }
  }

  validateAge($scope) {
    //18-100
    if ($scope.client.age >= 18 && $scope.client.age <= 100) {
      $scope.isAgeValid = true;
    } else {
      $scope.isAgeValid = false;
    }
  }
  validateName($scope) {
    // One word, starts with a capital letter, no numbers and special chars
    let expression = new RegExp('([A-Z]{1}[a-zA-Z]+$)')
    $scope.isNameValid = expression.test($scope.client.name)
  }
}
