let authService = ($rootScope) => {
    const CLIENT_ID = '562d461bfe894fbb8d2fd2cc10e9ad2d';
    const REDIRECT_URI = 'http://localhost:8080/callback';

    let getLoginURL = scopes => {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
    }

    return {
        openLogin: () => {
            let url = getLoginURL([
                'user-read-private'
            ]);

            let width = 450,
                height = 730,
                left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

            let w = window.open(url,
                'Spotify',
                'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
            );
        },
        getAccessToken: () => {
            let expires = 0 + localStorage.getItem('pa_expires', '0');
            if ((new Date()).getTime() > expires) {
                return '';
            }
            let token = localStorage.getItem('pa_token', '');
            return token;
        },
        setAccessToken: (token, expires_in) => {
            $rootScope.$broadcast('TOKEN_UPDATE');
            localStorage.setItem('pa_token', token);
            localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
        },
        getUsername: () => {
            let username = localStorage.getItem('pa_username', '');
            return username;
        },
        setUsername: username => {
            localStorage.setItem('pa_username', username);
        },
        getUserCountry: () => {
            let userCountry = localStorage.getItem('pa_usercountry', 'US');
            return userCountry;
        },
        setUserCountry: userCountry => {
            localStorage.setItem('pa_usercountry', userCountry);
        }
    }
}

export default authService;