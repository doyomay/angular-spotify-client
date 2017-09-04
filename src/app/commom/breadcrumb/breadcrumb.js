import angular from 'angular'
import breadcrumbDirective from './breadcrumb.directive'

let breadcrumbModule = angular.module('breadcrumb', []).directive('breadcrumb', breadcrumbDirective).name;

export default breadcrumbModule;
