(function( global ) {
    'use strict';

    // グローバルな変数
    var global_vars = {
        contest_names: {},
        contest_keys: []
    };

    // 読み込むスクリプトの設定
    requirejs.config(
        {
            "paths": {
                "jquery": 'components/jquery/jquery',
                "underscore": 'components/underscore/underscore',
                "backbone": 'components/backbone/backbone',
                "asyncjs": 'components/async/lib/async',
                "common": 'application/common',
                "utils": 'application/utils',
                "database": 'application/database'
            },

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
            _(window).extend(global_vars);
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
                    console.log('@AfterInit');
                    $.when
                    .apply(
                        $.when,
                        [
                            Utils.loadManifestJSON(),
                            GetContestData()
                        ]
                    )
                    .done(AfterLoading);
                }

                function AfterLoading() {
                    SetHTMLContent();
                    contest_keys.forEach(function( key ) {
                        var contest_name = contest_names[key];
                        $('body').append(contest_name+'<br>');
                    });
                }

                function SetupDatabase( callback ) {
                    // default_contest_listから追加
                    var contest_names = {};
                    var contest_keys = [];

                    $.getJSON('../../default_contest_list.json', function( contest_list ) {
                        contest_list.forEach(function( contest ) {
                            var name = contest.contest_name;
                            var url = contest.enter_url;
                            var key = url.match(/^\/contest\/([0-9]*)$/)[1];
                            contest_names[key] = name;
                            contest_keys.push(key);
                        });
                        asyncjs.parallel(
                            [
                                Database.set.bind(null, Database.key.contestNames, contest_names),
                                Database.set.bind(null, Database.key.contestKeys, contest_keys)
                            ],
                            AfterSetupDatabase
                        );
                    });

                    function AfterSetupDatabase() {
                        // TODO: 足りないコンテストリストをCodeforcesから取得する
                        callback();
                    }
                }

                function GetContestData() {
                    return $.when.apply(
                        null,
                        [
                            GetContestNamesFromDatabase(),
                            GetContestKeysFromDatabase()
                        ]
                    );
                }

                function GetContestNamesFromDatabase() {
                    var deferred = new $.Deferred();
                    Database.get(Database.key.contestNames, function( contest_names ) {
                        window.contest_names = contest_names;
                        deferred.resolve(contest_names);
                    });
                    return deferred;
                }

                function GetContestKeysFromDatabase() {
                    var deferred = new $.Deferred();
                    Database.get(Database.key.contestKeys, function( contest_keys ) {
                        window.contest_keys = contest_keys;
                        deferred.resolve(contest_keys);
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
