(function( global ) {
    'use strict';

    define(

        [
            'exports',
            'jquery',
            'underscore'
        ],

        function( exports, $, _ ) {

            var Utils = {};

            // Example:
            //  load_manifest_json().done(callback)
            //  callback(function( json_object ) { ... })
            Utils.loadManifestJSON = function LoadManifestJSON() {
                var deferred = new $.Deferred();

                // manifest.jsonを読み込み、取得した情報をMANIFESTに格納する
                var url = '../../manifest.json';
                $.getJSON(url, function(manifest) {
                    MANIFEST = manifest;
                    deferred.resolve(MANIFEST);
                });

                return deferred.promise();
            };

            _(exports).extend(Utils);

        }

    );

}).call(this, window);
