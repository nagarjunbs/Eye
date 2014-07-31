angular.module('eyeFilters', []).filter('stripspecialchars', function() {
  return function(input) {
    return input.replace(/[^\w\s]/gi, '');
  };
});