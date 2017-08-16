import './style.scss';
let breadcrumbDirective = () => {
    return {
        restrict: 'E',
        template: require('./index.html'),
        link: (scope, element, attributes) => {},
        scope: {
            items: '='
        },
    }
};

export default breadcrumbDirective;