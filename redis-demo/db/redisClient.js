/**
 * Created by butwhole on 10/10/2016.
 */
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var redis = require("redis");

const PORT = 15762;
const ENDPOINT = "redis-15762.c10.us-east-1-2.ec2.cloud.redislabs.com";
const PASSWORD = 292335668076;

var client = redis.createClient(PORT, ENDPOINT, {no_ready_check: true});
client.auth(PASSWORD, function (err) {
    if (err) {
        console.log(err);
    }
});
module.exports = client;
