'use strict';

module.exports = function (source) {

    var section1 = /#/g;
    var section2 = /##/g;
    var section3 = /###/g;
    var section4 = /####/g;
    var section5 = /#####/g;

    var obj = {"section1":0,
        "section2":0,
        "section3":0,
        "section4":0,
        "section5":0}

    obj["section5"]=source.match(section5).length;
    obj["section4"]=source.match(section4).length - obj["section5"];
    obj["section3"]=source.match(section3).length - obj["section4"] -obj["section5"];
    obj["section2"]=source.match(section2).length - obj["section3"] - obj["section4"]*2 -obj["section5"]*2;
    obj["section1"]=source.match(section1).length - obj["section2"]*2 - obj["section3"]*3 - obj["section4"]*4 -obj["section5"]*5;

    //console.log("Counts: "+obj["section1"]+" "+obj["section2"]+" "+obj["section3"]+" "+obj["section4"]+" "+obj["section5"]);
    return obj;

}