var mongoAdapter = require('sails-mongo');
var redisAdapter = require('sails-redis');

module.exports = {
    mongo:{
        adapters: {
            mongo: mongoAdapter
        },
        connections: {
            connection: {
                adapter: 'mongo',
                host: 'localhost',
                database: 'testdb'
            }
        },
        defaults: {
            migrate: 'alter'
        }
    },
    redis: {

        adapters: {
            redis: redisAdapter
        },
        connections: {
            connection: {
                adapter: 'redis',
                port: 6379,
                host: 'localhost',
                options: {
                    parser: 'hiredis',
                    return_buffers: false,
                    detect_buffers: false,
                    socket_nodelay: true,
                    no_ready_check: false,
                    enable_offline_queue: true
                }
            }
        }
    },
    es: {

    }
}