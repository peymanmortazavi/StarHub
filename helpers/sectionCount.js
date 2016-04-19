'use strict';

module.exports = function (source) {
    try{
        var s = source.match(/([#])\1+/g)||[];
        var obj = {
            "#" : 0,
            "##" : 0,
            "###" : 0,
            "####" : 0,
            "#####" : 0,
            "######" : 0,
            "#######" : 0
        };

        for (var item in s){
            if(obj.hasOwnProperty(s[item])){
                obj[s[item]]++;
            }
        }
        return obj;
    } catch (error) {
        return null;
    }}
