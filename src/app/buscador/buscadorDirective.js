import './style.scss';
let searchDirective = () => {
    return {
        restrict: 'E',
        template: require('./index.html'),
        scope: {
            placeholder: '@'
        },
    }
};
export default searchDirective;