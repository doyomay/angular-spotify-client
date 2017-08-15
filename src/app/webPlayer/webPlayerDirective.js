import './style.scss';
let webPlayerDirective = () => {
    return {
        restrict: 'E',
        template: require('./index.html'),
        controller: 'webPlayerCtrl',
        scope: {
            data: '='
        }
    }
};
export default webPlayerDirective;