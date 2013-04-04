(function( global ) {
    'use strict';

    // パスなどの設定
    requirejs(
        {
            "paths": {
                "jquery": 'components/jquery/jquery',
                "underscore": 'components/underscore/underscore',
                "backbone": 'components/backbone/backbone',
                "asyncjs": 'components/async/lib/async',
                "common": 'application/common',
                "utils": 'application/utils',
                "database": 'application/database'
            }
        }
    );

    // 依存関係の定義
    requirejs.config(
        {
            "shim": {
                "underscore": {
                    "exports": '_'
                },
                "backbone": [
                    'underscore'
                ],
                "utils": [
                    'jquery'
                ]
            }
        }
    );

    // エントリポイント
    require(

        [
            'jquery',
            'underscore',
            'asyncjs',
            'common'
        ],

        function EntryPoint( $, _, asyncjs, Common ) {
            _(window).extend(Common);

            require(

                [
                    'utils',
                    'database'
                ],

                function( Utils, Database ) {
                    console.log(Database);

                    asyncjs.series(
                        [
                            InitHTML,
                            Database.init
                        ],
                        AfterInit
                    );

                    function AfterInit() {
                        $.when
                        .apply(
                            $.when,
                            [
                                Utils.loadManifestJSON()
                                // TODO: データベースからコンテストリストを取得
                            ]
                        )
                        .done(AfterLoading);
                    }

                    function AfterLoading() {
                        SetHTMLContent();
                    }

                }

            );
        }

    );

    function InitHTML( callback ) {
        var head = $('head');
        if ( head.children('title').size() == 0 )
            head.append($('<title></title>'));

        var body = $('body');
        body.empty();
        var body_header = $('<h1></h1>');
        body_header.attr('id', 'title');
        body.append(body_header);

        callback();
    }

    function SetHTMLContent() {
        var title_text = MANIFEST.name+'@'+MANIFEST.version;
        $('title').text(title_text);
        $('h1#title').text(MANIFEST.name);
    }

}).call(this, window);
