(function() {
    "use strict";

    define(

        [
            'exports',
            'underscore',
            'utils'
        ],

        function( exports, _, Utils ) {
            var Database = {};
            var storage = chrome.storage.local; // >= Chrome 20

            Database.key = {
                schemeVersion: 'DATABASE_SCHEME_VERSION',
                contestList: 'CONTEST_LIST'
            };

            // async.jsの関数で利用できるような形式で書くこと
            Database.init = function InitDatabase( callback ) {
                Database.checkSchemeVersion(function( version ) {
                    // 未定義のときは新しく定義、定義済みのときはアップグレードが必要か調べる
                    if ( version === false ) {
                        Database.defineScheme[Database.key.schemeVersion](function() {
                            callback();
                        });
                    } else {
                        if ( true || version !== DATABASE_SCHEME_VERSION ) {
                            // TODO: 定義をアップグレードするための処理を書く
                            Database.defineScheme[DATABASE_SCHEME_VERSION](function() {
                                callback();
                            });
                        } else {
                            callback();
                        }
                    }
                });
            };

            Database.checkSchemeVersion = function CheckDatabaseSchemeVersion( callback ) {
                storage.get(
                    [
                        Database.key.schemeVersion
                    ],
                    function(items) {
                        var version = items[Database.key.schemeVersion];
                        if ( Utils.isUndefined(version) )
                            callback(false);
                        else
                            callback(version);
                    }
                );
            };

            Database.defineScheme = {
                // app version <= 0.0.0
                "0": function DefineDatabaseScheme( callback ) {
                    console.log('@Database::defineScheme: version: 0');
                    var data = {};
                    data[Database.key.schemeVersion] = DATABASE_SCHEME_VERSION;
                    data[Database.key.contestList] = {};

                    storage.set(
                        data,
                        function() {
                            callback();
                        }
                    );
                }
            };

            Database.set = function( key, value, callback ) {
                var data = {};
                data[key] = value;
                storage.set(data, function() {
                    callback();
                });
            };

            Database.get = function( key, callback ) {
                storage.get(key, function( items ) {
                    callback(items[key]);
                })
            };

            _(exports).extend(Database);
        }

    );

}).call();
