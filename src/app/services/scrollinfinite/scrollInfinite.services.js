let ScrollInfiniteFactory = ($rootScope, $window) => {
    let detectBottom = () => {
        if (($window.innerHeight + $window.scrollY) >= document.body.offsetHeight) {
            $rootScope.$broadcast('WINDOW_BOTTOM');
        }
    }
    let initEvent = () => {
        $window.addEventListener('scroll', detectBottom);
    }
    let stopEvent = () => {
        $window.removeEventListener('scroll', detectBottom);
    }

    return {initEvent, stopEvent};
}

export default ScrollInfiniteFactory;