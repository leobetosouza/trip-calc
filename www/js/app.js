/* Véi, foca no código


        .---.
       /o   o\
    __(=  "  =)__
     //\'-=-'/\
        )   (_
       /      `"=-._
      /       \     ``"=.
     /  /   \  \         `=..--.
 ___/  /     \  \___      _,  , `\
`-----' `""""`'-----``"""`  \  \_/
                             `-`

*/

// The code below uses require.js, a module system for javscript:
// http://requirejs.org/docs/api.html#define

require.config({
    baseUrl: 'js/lib',
    paths: {'jquery':
            ['//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
             'jquery']},

});

// Include the in-app payments API, and if it fails to load handle it
// gracefully.
// https://developer.mozilla.org/en/Apps/In-app_payments
require(['https://marketplace.cdn.mozilla.net/mozmarket.js'],
        function() {},
        function(err) {
            window.mozmarket = window.mozmarket || {};
            window.mozmarket.buy = function() {
                alert('The in-app purchasing is currently unavailable.');
            };
        });



// When you write javascript in separate files, list them as
// dependencies along with jquery
define("app", function(require) {

    var $ = require('jquery');

    // If using Twitter Bootstrap, you need to require all the
    // components that you use, like so:
    // require('bootstrap/dropdown');
    // require('bootstrap/alert');


    // START HERE: Put your js code here
    var pageActive = 0, // 0 preview, 1 add, 2 config
        pageEl = $('.page'),
        pageElActive,
        heightWindow = $(window).height();

    function changeActivePage (page) {

      pageEl.removeClass('activePage');

      if (page == 0) {
        pageElActive = $('.preview');
      } else if (page == 1) {
        pageElActive = $('.add');
      } else {
        pageElActive = $('.config');
      }
      
      pageElActive.addClass('activePage');
    }

    function movePage (page) {

      if (page == pageActive) {
        return false;
      }

      pageActive = page;

      $('body').animate({
        scrollTop: (pageActive * heightWindow)
      }, 400)
    }

    // expondo a função no window só pra brincar no console
    window.movePage = movePage;

    /**
     * Object to convert values based on currency rates
     * Usage:
     * Currency.init(function() {
     *   Currency.getRate(value, currencyFrom, currencyTo);
     * });
     */
    var Currency = {
      //Rates are USD based
      rates: null,

      init: function(cb) {
          if (Currency.rates !== null) {
            cb();
            return;
          }

          $.getJSON(
              "http://openexchangerates.org/latest.json",
              function(data) {
                  Currency.rates = data.rates;
                  if (cb !== undefined) {
                    cb();
                  }
              }
          );
      },

      getRate: function(value, currencyFrom, currencyTo) {
          var dollarValue = value / Currency.rates[currencyFrom];
          var toValue = dollarValue * Currency.rates[currencyTo];
          return toValue;
      }
    };

    $(function() {
        pageEl.css({ 'height': heightWindow });
        movePage(pageActive);
    });

    // Hook up the installation button, feel free to customize how
    // this works

    var install = require('install');

    function updateInstallButton() {
        $(function() {
            var btn = $('.install-btn');
            if(install.state == 'uninstalled') {
                btn.show();
            }
            else if(install.state == 'installed' || install.state == 'unsupported') {
                btn.hide();
            }
        });
    }

    $(function() {
        $('.install-btn').click(install);
    });

    install.on('change', updateInstallButton);

    install.on('error', function(e, err) {
        // Feel free to customize this
        $('.install-error').text(err.toString()).show();
    });

    install.on('showiOSInstall', function() {
        // Feel free to customize this
        var msg = $('.install-ios-msg');
        msg.show();

        setTimeout(function() {
            msg.hide();
        }, 8000);
    });


    $(function(){
      
      $('.nav .add').on('click', function(e){
        e.preventDefault();
        movePage(1);
      });

      $('.nav .config').on('click', function(e){
        e.preventDefault();
        movePage(2);
      });

    });

});
