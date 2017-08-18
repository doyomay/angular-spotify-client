class authCtrl {
    constructor($scope, $location, SpotifyFactory, authService) {
        $scope.showLogin = () => {
            return authService.getAccessToken() === ''
        }

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
            SpotifyFactory.getUser().then(response => {
                authService.setUsername(response.data.display_name);
                authService.setUserCountry(response.data.country);
                window.close();
            });
        }

    }
}

export default authCtrl;