(function( global ) {
    "use strict";

    global.MANIFEST = {};

    requirejs(
        {
            "paths": {
                "jquery": "components/jquery/jquery"
            }
        }
    );

    require(

        [
            "jquery"
        ],

        function( $ ) {

            function load_manifest_json() {
                var deferred = new $.Deferred();

                // manifest.jsonを読み込み、取得した情報をMANIFESTに格納する
                var url = '../../manifest.json';
                $.getJSON(url, function(manifest) {
                    MANIFEST = manifest;
                    deferred.resolve();
                });

                return deferred.promise();
            }

            function init_html() {
                // ヘッダーの準備をする
                var head = $('head');
                if ( head.children('title').size() == 0 )
                    head.append($('<title></title>'));
                var title_text = MANIFEST.name+'@'+MANIFEST.version;
                $('title').text(title_text);

                // ボディの準備をする
                var body = $('body');
                body.empty();
                var body_header = $('<h1></h1>');
                body_header.text(MANIFEST.name);
                body.append(body_header);
            }

            $.when.apply(
                $.when,
                [
                    load_manifest_json()
                ]
            ).done(function() {
                init_html();
            });
        }

    );

}).call(this, window);
