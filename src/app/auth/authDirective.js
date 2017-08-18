let authDirective = () => {
    return {
        restrict: 'E',
        controller: 'authCtrl',
        template: require('./index.html'),
    }
};

export default authDirective;