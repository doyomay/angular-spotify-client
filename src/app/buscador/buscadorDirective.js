import './style.scss';
let searchDirective = () => {
    return {
        restrict: 'E',
        template: require('./index.html'),
        controller: 'SearchCtrl',
        scope: {
            placeholder: '@'
        },
    }
};
export default searchDirective;