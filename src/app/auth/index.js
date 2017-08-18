class authCtrl {
    constructor($scope, $rootScope, $location, SpotifyFactory, authService) {
        $scope.showLogin = true;
        $scope.$on('AUTH_UNAUTHORIZED', () => {
            $scope.showLogin = true;
        });
        ($scope._showLogin = () => {
            $scope.showLogin = authService.getAccessToken() === ''
        })();

        $scope.openLogin = () => {
            authService.openLogin();
        }

        let parameter = {};
        let _param = [];
        $location.hash().split('&').map(item => {
            _param = item.split('=');
            parameter[_param[0]] = _param[1];
        });

        if (parameter.access_token) {
            authService.setAccessToken(parameter.access_token, parameter.expires_in);
            SpotifyFactory.getUser(parameter.access_token).then(response => {
                console.log('HEY desde el promisse');
                authService.setUsername(response.data.display_name);
                authService.setUserCountry(response.data.country);
                window.onunload = function() {
                    window.opener.location.reload();
                };
                window.close();
            });
        }

    }
}

export default authCtrl;