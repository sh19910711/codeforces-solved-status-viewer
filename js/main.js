(function( global ) {
    'use strict';

    requirejs(
        {
            "paths": {
                "jquery": 'components/jquery/jquery',
                "underscore": 'components/underscore/underscore',
                "common": 'application/common',
                "utils": 'application/utils'
            }
        }
    );

    requirejs.config(
        {
            "shim": {
                "underscore": {
                    "exports": '_'
                }
            }
        }
    );

    require(

        [
            'jquery',
            'underscore',
            'common',
            'utils'
        ],

        function( $, _, Common, Utils ) {
            _(window).extend(Common);

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
                body_header.attr('id', 'title');
                body_header.text(MANIFEST.name);
                body.append(body_header);
            }

            $.when
            .apply(
                $.when,
                [
                    Utils.load_manifest_json()
                ]
            )
            .done(function() {
                init_html();
            });
        }

    );

}).call(this, window);
