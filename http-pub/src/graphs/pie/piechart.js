/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, d3, define, brackets: true, $, window */

define(['d3'], function (ignore) {

    function render(data, props) {

        var canvasWidth = props.width, //$(canvas).width(),
            canvasHeight = props.height,
            margin = props.margin,
            ele = props.ele,
            radius = Math.min(canvasWidth/2, canvasHeight/2) / 2;

        var svg = d3.select(ele).append("svg").attr("viewBox", "0 0 " + canvasWidth + " " + canvasHeight)
            .attr("preserveAspectRatio", "xMidYMid");

        var colors = d3.scale.category10();
        var users = [],
            commitsNumber = {};

        data.forEach(function (d, i) {
            d.date = new Date(d.date);

            if (users.indexOf(d.author_email) == -1) {
                users.push(d.author_email);
            }

            if (commitsNumber[d.author_email]) {
                commitsNumber[d.author_email] += 1;
            } else {
                commitsNumber[d.author_email] = 1;
            }
        });

        users.sort(function (a, b) {
            return commitsNumber[b] - commitsNumber[a];
        });

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return commitsNumber[d];
            });

        
        var pieChart = svg.append("g")
            .attr("transform", "translate(" + canvasWidth/2 + "," + canvasHeight/2 + ")");


        var g = pieChart.selectAll(".arc")
            .data(pie(users))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) {
                return colors(i);
            });

        var usersLabel = svg.selectAll(".users")
            .data(users)
            .enter()
            .append('g')
            .attr("transform", function (d, i) {
                return "translate("+ canvasWidth/2 +"," + (i * 30) + ")";
            });
        usersLabel.append('rect')
            .attr("width", 20)
            .attr("height", 20)
            .style('fill', function (d, i) {
                return colors(i);
            });
        usersLabel.append('text').text(function (d) {
            return d + " (" + commitsNumber[d] + ")";
        }).attr("transform", "translate(25, 15)");

    }

    return render;
});