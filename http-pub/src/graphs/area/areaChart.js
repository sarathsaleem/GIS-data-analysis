/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['d3'], function (ignore) {

    function render(data, props) {

        var canvasWidth = props.width, //$(canvas).width(),
            canvasHeight =  props.height,
            margin =  props.margin,
            ele = props.ele;
        
        var svg = d3.select(ele).append("svg").attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight)
            .attr("preserveAspectRatio", "xMidYMid");
       


        data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        var prevDate, val;

        // var dataMap = d3.time.days(new Date(data[0].date), new Date(data[data.length-1].date));

        //TODO: filter date with day map

        data = data.filter(function (d, i) {
            d.date = new Date(d.date);
            if (d.date.getDate() === prevDate) {
                val += 1;
            } else {
                val = 1;
            }
            d.index = val;
            prevDate = d.date.getDate();

            if (data[i + 1] && data[i + 1].date) {
                var nextD = new Date(data[i + 1].date);
                if (nextD.getDate() === d.date.getDate()) {
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        });

        var marginBrush = {
                top: 10,
                right: 10,
                bottom: 100,
                left: 40
            },
            margin2 = {
                top: canvasHeight - 70,
                right: 10,
                bottom: 20,
                left: 40
            },
            width = canvasWidth - marginBrush.left - marginBrush.right,
            height = canvasHeight - marginBrush.top - marginBrush.bottom,
            height2 = canvasHeight - margin2.top - margin2.bottom;

        var parseDate = d3.time.format("%b %Y").parse;

        var x = d3.time.scale().range([0, width]),
            x2 = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]),
            y2 = d3.scale.linear().range([height2, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
            xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
            yAxis = d3.svg.axis().scale(y).orient("left");

        var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brushed);

        var area = d3.svg.area()
            .interpolate("monotone")
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.index);
            });

        var area2 = d3.svg.area()
            .interpolate("monotone")
            .x(function (d) {
                return x2(d.date);
            })
            .y0(height2)
            .y1(function (d) {
                return y2(d.index);
            });

     
        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + marginBrush.left + "," + marginBrush.top + ")");

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        x.domain(d3.extent(data.map(function (d) {
            return d.date;
        })));
        y.domain([0, d3.max(data.map(function (d) {
            return d.index;
        }))]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        focus.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        context.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area2);

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);

        function brushed() {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            focus.select(".area").attr("d", area);
            focus.select(".x.axis").call(xAxis);
        }

    }    
    
    return render;
});