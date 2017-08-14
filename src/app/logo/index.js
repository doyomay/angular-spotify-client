import './style.scss';
let logoDirective = () => {
    return {
        restrict: 'E',
        template: require('./index.html'),
    }

};
export default logoDirective;