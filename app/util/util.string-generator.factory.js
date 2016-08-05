(function () {
  'use strict';

  var CHARS = {
    SPECIAL: ['{','|','}','~','[','\\',']','^','_','`',"'",'"'],
    NUMERIC: [
      0,1,2,3,4,5,6,7,8,9,
    ],
    UPPER: [
      'A','B','C','D','E','F','G','H','I',
      'J','K','L','M','N','O','P','Q','R',
      'S','T','U','V','W','X','Y','Z',
    ],
    LOWER: [
      'a','b','c','d','e','f','g','h','i',
      'j','k','l','m','n','o','p','q','r',
      's','t','u','v','w','x','y','z',
    ],
  };

  angular
    .module('app.util')
    .factory('StringGenerator', StringGeneratorFactory);

  /**
   * StringGenerator Factory
   *
   * @ngInject
   */
  function StringGeneratorFactory () {
    return function () {
        return new StringGenerator();
    };
  }

  function StringGenerator () {
    var generator = this;
    var characters = [];
    var defaultLength = 10;
    var use = {
      lower: true,
      upper: true,
      numeric: true,
      special: true,
    };

    generator.generate = generate;
    generator.noSpecialCharacters = noSpecialChars;
    generator.length = setLength;

    recalc();

    //////////

    function setLength (length) {
      defaultLength = length;

      return generator;
    }

    function generate (length) {
      var generated = '';
      var chars = characters.length;
      length = length || defaultLength;

      for (var i = 0; i < length; i++) {
        generated += characters[parseInt(Math.random() * 1000) % chars];
      }

      return generated;
    }

    function noSpecialChars() {
      use.special = false;

      return recalc();
    }

    function recalc() {
      characters.length = 0;
      var push = Array.prototype.push;

      push.apply(characters, use.lower ? CHARS.LOWER : []);
      push.apply(characters, use.upper ? CHARS.UPPER : []);
      push.apply(characters, use.numeric ? CHARS.NUMERIC : []);
      push.apply(characters, use.special ? CHARS.SPECIAL : []);

      return generator;
    }
  }
})();
