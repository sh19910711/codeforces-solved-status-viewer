(function( global ) {
    'use strict';

    define(

        [
            'exports',
            'jquery'
        ],

        function( exports, $ ) {

            // Example:
            //  load_manifest_json().done(callback)
            //  callback(function( json_object ) { ... })
            exports.loadManifestJSON = function load_manifest_json() {
                var deferred = new $.Deferred();

                // manifest.jsonを読み込み、取得した情報をMANIFESTに格納する
                var url = '../../manifest.json';
                $.getJSON(url, function(manifest) {
                    MANIFEST = manifest;
                    deferred.resolve(MANIFEST);
                });

                return deferred.promise();
            };

        }

    );

}).call(this, window);
