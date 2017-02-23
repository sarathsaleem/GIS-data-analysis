/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['d3'], function (ignore) {
    
    function render(data, container) {
    
    
    }
    
    return render;
});

GitDasboard.drawScatterplot = function (data, ele) {

    var canvasWidth = 1200, //$(canvas).width(),
        canvasHeight = 600,
        margin = 30,
        width = canvasWidth - 200 - 2 * margin,
        height = canvasHeight - 2 * margin;

    var colors = d3.scale.category10();
    var users = [];


    data.forEach(function (d, i) {
        d.date = new Date(d.date);
        
        if (users.indexOf(d.author_email) == -1) {
            users.push(d.author_email);
        }
    });



    var x = d3.time.scale()
        .range([10, width]);

    var y = d3.scale.linear()
        .range([height - 10, 0]);

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.date.getHours();
    })]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(24).tickFormat(function (hours, i) {
            //it is pm if hours from 12 onwards
            var suffix = (hours >= 12) ? 'pm' : 'am';

            //only -12 from hours if it is greater than 12 (if not back at mid night)
            hours = (hours > 12) ? hours - 12 : hours;

            //if 00 then it is 12 am
            hours = (hours == '0') ? 12 : hours;

            return hours + suffix;
        });


    data.forEach(function (d) {
        d.x = x(d.date);
        d.y = y(d.date.getHours());
    });

    var svg = d3.select(ele).append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var logs = svg.selectAll(".group")
        .data(data)
        .enter()
        .append('g');

    logs.append('circle')
        .attr("r", 5)
        .style("fill", function (d, i) {
            var index = users.indexOf(d.author_email);
            return colors(index);
        });

    logs.transition().duration(1000).attr("transform", function (d) {
        return "translate(" + d.x + ", " + d.y + ")";
    });

    var usersLabel = svg.selectAll(".users")
        .data(users)
        .enter()
        .append('g')
        .attr("transform", function (d, i) {
            return "translate(1000," + (i * 30) + ")";
        });
    usersLabel.append('rect')
        .attr("width", 20)
        .attr("height", 20)
        .style('fill', function (d, i) {
            return colors(i);
        });
    usersLabel.append('text').text(function (d) {
        return d;
    }).attr("transform", "translate(25, 15)");
};



//http://bl.ocks.org/mbostock/4063318 can be next
