class HomeCtrl {
    constructor($scope, authService) {
        $scope.nombreUser = authService.getUsername();
    }
}

export default HomeCtrl;