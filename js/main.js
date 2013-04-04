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

                AfterSetupCommon

            );

            function AfterSetupCommon( Utils, Database ) {
                console.log(Database);

                asyncjs.series(
                    [
                        InitHTML,
                        Database.init,
                        SetupDatabase
                    ],
                    AfterInit
                );

                function AfterInit() {
                    $.when
                    .apply(
                        $.when,
                        [
                            Utils.loadManifestJSON(),
                            GetContestListFromDatabase()
                        ]
                    )
                    .done(AfterLoading);
                }

                function AfterLoading() {
                    SetHTMLContent();
                    var keys = Object.keys(contest_list);
                    keys.forEach(function( key ) {
                        var contest = contest_list[key];
                        $('body').append(contest+'<br>');
                    });
                }

                function SetupDatabase( callback ) {
                    // default_contest_listから追加
                    var data = {};
                    $.getJSON('../../default_contest_list.json', function( contest_list ) {
                        contest_list.forEach(function( contest ) {
                            var name = contest.contest_name;
                            var url = contest.enter_url;
                            data[url] = name;
                        });
                        Database.set(Database.key.contestList, data, callback);
                    });

                    // TODO: 足りないコンテストリストをCodeforcesから取得する
                }

                function GetContestListFromDatabase() {
                    var deferred = new $.Deferred();
                    Database.get(Database.key.contestList, function( contest_list ) {
                        window.contest_list = contest_list;
                        deferred.resolve(contest_list);
                    });
                    return deferred;
                }

            }

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

        }

    );

}).call(this, window);
