/**
* Created by Shodhan Save on Jan 23, 2018.
*/

/**
* This plug-in allows sorting of human readable time delta, viz.,
* "1 week", "2 weeks 3 days", "4 weeks 5 days 6hours", etc.
* Curently this plugin supports time range from seconds to weeks
*
*  @name Natural Time Delta
*  @summary Sort human readable time delta
*
*  @example
*    $("#example").DataTable({
*       columnDefs: [
*         { "type": "natural-time-delta", "targets": 2 }
*       ]
*    });
*/

jQuery.extend(jQuery.fn.dataTableExt.oSort,{
    "natural-time-delta-pre" : function(data){
        var result = 0;
        var pattern = /(\d+\s*weeks?\s*)?(\d+\s*days?\s*)?(\d+\s*hours?\s*)?(\d+\s*minutes?)?(\d+\s*seconds?)?/i
        var format_time_element = function(el, splitter, mul){
            if (el === undefined){
                return 0;
            }
            return parseFloat(el.split(splitter)[0].trim()) * mul;
        };

        var matches = data.match(pattern);
        matches.reverse();

        var time_elements = [
            {"splitter" : "s",  "name" : "second",  "mul" : 1},
            {"splitter" : "m",  "name" : "minute",  "mul" : 1 * 60},
            {"splitter" : "h",  "name" : "hour",    "mul" : 1 * 60 * 60},
            {"splitter" : "d",  "name" : "day",     "mul" : 1 * 60 * 60 * 24},
            {"splitter" : "w",  "name" : "week",    "mul" : 1 * 60 * 60 * 24 * 7},
        ];

        time_elements.forEach(function(el, i){
            var val = format_time_element(matches[i], el["splitter"], el["mul"]);
            result += val;
        });

        return result || -1;
    },

    "natural-time-delta-asc" : function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "natural-time-delta-desc" : function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});
