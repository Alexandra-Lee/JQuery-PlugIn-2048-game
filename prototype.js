(function ($) {
    $.fn.jqueryplug2048 = function () {
        //global variables of grid
        var grid = [];
        var i = 0;
        var j = 0;
        grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        $(document).ready(function () {
            //DRAW PAGE and GAME BOARD
            $(".image").css("width", "100%");
            $("main").css('width', '100%').css('textAlign', 'center');
            $('.top-banner').css('display', 'flex').css('justifyContent', 'center');
            $("h1").append("My Little Ponies : The 2048 Game").css("textAlign", "center");
            $('<p/>', {
                'id': 'how-play',
                'value': 'How',
                'text': 'How to play...',
                'text-decoration': 'underline',
                'textAlign': 'center',
            }).offset({ top: -10, left: -310 }).on('click', function () {
                alert("How to Play:  Use the arrow keys to move the numbered squares. The objective is to combine identical numbers to make a bigger number. Each time you press an arrow, all the numbers will shift in that direction. A new number will also appear to keep the game going. When you make a square with \"2048\", you have won the game!\n"); // myDiv
            }).appendTo('.top-banner');
            $(".top-banner").append('<input id="start-game" type="submit" value="Let\'s Go!"/>').offset({ top: 65, left: -47 }).css('height', '35px');
            // $('<p/>', {
            //     'id':'my-score',
            //     'text': 'My score: ' + myscore,
            //     'text-decoration':'underline',})
            // .appendTo('.top-banner');  
            // $('<p/>', {
            //     'id':'hi-score',
            //     'text': 'HI-SCORE: ' + hiscore,})
            //.appendTo('.top-banner');
            $(".page").append('<table id="board" style="borderSpacing:1px; padding:0px; margin:0 auto">' +
                '<tr>' + '<td class="cell0" style=" width: 100px; height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell1" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell2" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell3" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '</tr>'
                + '<tr>' + '<td class="cell4" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell5" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell6" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell7" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '</tr>'
                + '<tr>' + '<td class="cell8" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell9" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell10" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell11" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '</tr>'
                + '<tr>' + '<td class="cell12" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell13" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell14" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '<td class="cell15" style=" width: 100px;  height: 100px;   border: 1px solid #1c1c1c; ">' + '</td>' + '</tr>'
                + '</table>' + '<br/>');

            $("table").after('<form id="button" type="submit">' + '</form>');
            $("form").append('<input id="reset-game" type="submit" value="Reset"/>').css("textAlign", "center");
            // start the game button -- fills two random cells...  the number 4 will appear rarely
            $("#start-game").click(function () {
                var random_cell1 = Math.floor(Math.random() * 15) + 1;
                var random_cell2 = Math.floor(Math.random() * 15) + 1;
                var tmp1 = '.cell' + random_cell1;
                var tmp2 = '.cell' + random_cell2

                while (random_cell1 == random_cell2) {
                    random_cell1 = Math.floor(Math.random() * 15) + 1;
                    random_cell2 = Math.floor(Math.random() * 15) + 1;
                    tmp1 = '.cell' + random_cell1;
                    tmp2 = '.cell' + random_cell2

                }
                // console.log(random_cell1);
                // console.log(random_cell2);
                if (random_cell1 != random_cell2 && (random_cell2 < 5)) {
                    // console.log("case 1");
                    // console.log(tmp1); 
                    // console.log(tmp2); 
                    $(tmp1).css("background-color", "pink");
                    $(tmp2).css("background-color", "pink");
                    $(tmp1).text(2).css('font-size', '48px').css("textAlign", "center");
                    $(tmp2).text(4).css('font-size', '48px').css("textAlign", "center");
                }
                else if ((random_cell1 != random_cell2) && (random_cell2 >= 5)) {
                    // console.log("case 2");
                    // console.log(tmp1); 
                    // console.log(tmp2); 
                    $(tmp1).css("background-color", "pink");
                    $(tmp2).css("background-color", "pink");
                    $(tmp1).text(2).css('font-size', '48px').css("textAlign", "center");
                    $(tmp2).text(2).css('font-size', '48px').css("textAlign", "center");
                }

                function format(selector) {
                    selector.text(2).css('font-size', '48px').css("textAlign", "center").css("background-color", "pink");
                }

                function addToGrid() {
                    var avail_cells = [];
                    while (i < 4) {
                        while (j < 4) {
                            if (grid[i][j] === 0) {
                                
                                avail_cells.push({ x: i, y: j, });
                                j++;
                                console.log("this grid " + i + j);
                            } 
                            i++;
                            console.log("this other grid " + i + j);
                        } 
                    }
                    if (avail_cells.length > 0) {
                        var random = avail_cells[Math.floor(Math.random() * avail_cells.length)];
                        console.log("this is x" + random.x + "this is y " + random.y);
                        

                        if (random.x === 0 && random.y === 0) {
                            format($(".cell0"));
                        } else if (random.x === 0 && random.y === 1) {
                            format($(".cell1")); 
                        } else if (random.x === 0 && random.y === 2) {
                            format($(".cell2"));
                        } else if (random.x === 0 && random.y === 3) {
                            format($(".cell3"));
                        } else if (random.x === 1 && random.y === 0) {
                            format($(".cell4")); 
                        } else if (random.x === 1 && random.y === 1) {
                            format($(".cell5"));  
                        } else if (random.x === 1 && random.y === 2) {
                            format($(".cell6")); 
                        } else if (random.x === 1 && random.y === 3) {
                            format($(".cell7")); 
                        } else if (random.x === 2 && random.y === 0) {
                            format($(".cell8")); 
                        } else if (random.x === 2 && random.y === 1) {
                            format($(".cell9"));
                        } else if (random.x === 2 && random.y === 2) {
                            format($(".cell10"));
                        } else if (random.x === 2 && random.y === 3) {
                            format($(".cell11"));
                        } else if (random.x === 3 && random.y === 0) {
                            format($(".cell12"));
                        } else if (random.x === 3 && random.y === 1) {
                            format($(".cell13"));
                        } else if (random.x === 3 && random.y === 2) {
                            format($(".cell14"));
                        } else if (random.x === 3 && random.y === 3) {
                            format($(".cell15"));
                        }
                    }
                }

                $(document).on("keydown", function (event) {
                    var unicode = event.which;
                    var i = 0;
                    var j = 0;
                    if (unicode == 37) //move left
                    {
                        addToGrid();
                        moveLeft();
                    }

                    else if (unicode == 39) { //move right
                    }
                    else if (unicode == 38) { //move up
                    }
                    else if (unicode == 40) { //move down
                    }
                    else {
                        alert("Press an arrow key to move.");
                    }
                });

                function hasValue(value) {
                    return value;
                }

                function moveLeft(...array) {
                
                    var arrayVals = array.filter(hasValue);
                    //console.log(arow);
                    var emptySq = 4 - arrayVals.length;
                    var zeros = Array(emptySq).fill(0);
                    //console.log(zeros);
                    arrayVals = arrayVals.concat(zeros);
                    console.log(arrayVals);
                    return arrayVals;
                    //for (var i = 0; i < 4;) {
                      //  for (var j = 0; j < 4;) {
                            
                            //row.push({ x: i, y: j, });
                        //    j++;
                        //}
                       // i++;
                   // }
                }
                console.log("moved?");
        /*
            $(document).keydown(function (event) {
            function move(event) {
                switch(event.which) {
                    case 37: // left
                        updateBoard(left);
                        generaterandom();
                        break;
            
                    case 38: // up
                        updateBoard(up);
                        generaterandom();        
                        break;
            
                    case 39: // right
                        updateBoard(right);
                        generaterandom();
                        break;
            
                    case 40: // down
                        updateBoard(down);
                        generaterandom();
                        break;
            
                    default: 
                        return; // exit this handler for other keys
                }
                event.preventDefault(); // prevent the default action (scroll / move caret)
            
                   
                    //$("#board tr td").addEventListener("keydown", function(event) {
                      //  if ($(this).text()=="" && play) {
                      
                    }); */
            });
        });
    }
}(jQuery));

