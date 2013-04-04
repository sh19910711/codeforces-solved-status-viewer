(function() {
    "use strict";

    define(

        [
            'exports',
            'underscore'
        ],

        function( exports, _ ) {
            var Database = {};

            Database.init = function InitDatabase( callback ) {
                console.log('Database.init');
                callback();
            };

            _(exports).extend(Database);
        }

    );

}).call();
