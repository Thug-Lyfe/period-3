/**
 * Created by butwhole on 10/10/2016.
 */
var redis = require('redis')

var client =
    redis.createClient(15762, 'redis-15762.c10.us-east-1-2.ec2.cloud.redislabs.com',{no_ready_check : true, password : "292335668076"});
//client.set("key1", "This is cool");
//client.get("key1", function (err, reply) {
client.set("users:sess", '{"name": "lind", "planet": "lindlind", "likes": ["spice"]}')


client.get("key",function(err,reply){
    if (err) throw err;
    console.log(reply.toString());
});