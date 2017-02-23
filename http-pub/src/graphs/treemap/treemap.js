/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['d3'], function (ignore) {
    
    function render(data, container) {
    
    
    }
    
    return render;
});

GitDasboard.drawTreeMap = function (data, ele) {

    var parent = {
        name: "Year",
        children: []
    };

    function isInChildren(arrayOfObj, key, val) {
        var isFound = null;
        arrayOfObj.forEach(function (obj, index) {
            if (obj[key] === val) {
                isFound = index;
            }
        });
        return isFound;
    }

    var month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    data.forEach(function (d) {
        d.date = new Date(d.date);

        var year = d.date.getFullYear(),
            month = d.date.getMonth(),
            day = d.date.getDate(),
            hours = d.date.getHours();

        var isYear = isInChildren(parent.children, 'name', year);

        if (isYear !== null) {
            var monthindex = isInChildren(parent.children[isYear].children, 'name', month_names[month]);

            if (monthindex !== null) {

                var dayIndex = isInChildren(parent.children[isYear].children[monthindex].children, 'name', day);

                if (dayIndex !== null) {

                    parent.children[isYear].children[monthindex].children[dayIndex].size += 1;

                } else {

                    parent.children[isYear].children[monthindex].children.push({
                        name: day,
                        size: 1
                    });
                }

            } else {
                parent.children[isYear].children.push({
                    name: month_names[month],
                    children: []
                });
            }

        } else {
            parent.children.push({
                name: year,
                children: []
            });
        }
    });

    console.log(parent);

    /*

    {
     name : 2010,
     children : [

       { name : 0, children : [ {},{},{},{}]},
       {}

     ]
    }
    */

    var diameter = 900,
        margin = 30;


    var color = d3.scale.linear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.layout.pack()
        .padding(2)
        .size([diameter - margin, diameter - margin])
        .value(function (d) {
            return d.size;
        })

    var svg = d3.select(ele).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


    var focus = parent,
        nodes = pack.nodes(parent),
        view;

    var circle = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
        })
        .style("fill", function (d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function (d) {
            if (focus !== d) zoom(d), d3.event.stopPropagation();
        });

    var text = svg.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function (d) {
            return d.parent === parent ? 1 : 0;
        })
        .style("display", function (d) {
            return d.parent === parent ? null : "none";
        })
        .text(function (d) {
            return d.name;
        });

    var node = svg.selectAll("circle,text");

    d3.select("body")
        .on("click", function () {
            zoom(parent);
        });

    zoomTo([parent.x, parent.y, parent.r * 2 + margin]);

    function zoom(d) {
        var focus0 = focus;
        focus = d;

        var transition = d3.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function (d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function (t) {
                    zoomTo(i(t));
                };
            });

        transition.selectAll("text")
            .filter(function (d) {
                return d.parent === focus || this.style.display === "inline";
            })
            .style("fill-opacity", function (d) {
                return d.parent === focus ? 1 : 0;
            })
            .each("start", function (d) {
                if (d.parent === focus) this.style.display = "inline";
            })
            .each("end", function (d) {
                if (d.parent !== focus) this.style.display = "none";
            });
    }

    function zoomTo(v) {
        var k = diameter / v[2];
        view = v;
        node.attr("transform", function (d) {
            return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
        });
        circle.attr("r", function (d) {
            return d.r * k;
        });
    }

};
