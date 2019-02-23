var x = 2;
var idNums={};
$(".addSet").click(function(){
    var v = $('#weight' + (x-1)).val();
    var y = $('#set' + (x-1)).val();
    var newWeightId = "weight" + x;
    var newSetId = "set" + x;
    var newFormId = "setForm" + x;
    $(".info").append("<div id = " + newFormId + " class = 'form-group form-inline'><h3 class = 'moveLabel'>Weight:</h3><input id = " + newWeightId + " class = 'form-control' type = 'number' name='weight' value=" + v + " style='width:25%; margin-right:25px'></input><h3 class = 'moveLabel'>Reps:</h3><input id = " + newSetId + " class = 'form-control' type = 'number' name='reps' value=" + y + " style = 'width:25%'></input></div>");
    idNums.setForm = x;
    x = x+1;
    console.log("success" + x);
});
$(".removeSet").click(function(){
    $("#" + "setForm" + idNums.setForm).remove()
    idNums.setForm = idNums.setForm-1;
    console.log(idNums.newWeightId);
});
$(".editRemoveSet").click(function(){
    $("#" + "editForm" + move.weight.length).remove()
    idNums.setForm = idNums.setForm-1;
    console.log(move.weight.length);
});