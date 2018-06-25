// function todoconstructor(id1, value1, checkedboolean) {
//     this.id1 = id1;
//     this.value1 = value1;
//     this.checkedboolean = checkedboolean;
//     return this;
// }
// var id1;
// var item1;
// var checkedboolean;
//  var obj1 = new todoconstructor(0,1,true);
//  alert(obj1.id1);





var wage = document.getElementById("myInput");
wage.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) { //checks whether the pressed key is "Enter"
        addnewElement();
    }
});



var i = 0;

var arr = [];

function addnewElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
     if (inputValue != '') {
        // alert("You must write something!");
    
        
    
    li.className = "listItem";
    li.setAttribute('draggable', true);
    li.setAttribute('ondragned', "dragEnd()");
    li.setAttribute('ondragover', "dragOver(event)");
    li.setAttribute('ondragstart', "dragStart(event)");
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("ul-items").appendChild(li);
     var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

  };
    // if (inputValue === '') {
    //     alert("You must write something!");
    // } else {
    //     document.getElementById("ul-items").appendChild(li);
    // }
    // document.getElementById("myInput").value = "";

   
    id = "item" + i++;
    // var obj=todoconstructor(id,inputValue,false);
    let obj = {
        todoId: id,
        todoText: inputValue,
        todoboolean: false
    };
    arr.push(obj);
    addToLocalStorage(obj);

    closeButton();
    // dragfunction();
}


function addToLocalStorage(obj)
{
  
    
    console.log(arr);
    localStorage.setItem('todo', JSON.stringify(arr));
}


function closeButton() {
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(e) {
            // var div = this.parentElement;
            // div.style.display = "none";
            var div = e.target.parentNode;
            div.remove();
           
        }
    }addToLocalStorage();
}



var list = document.querySelector('ul');

list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        addnewElement();
    }addToLocalStorage();
});



//this
var _el;

function dragOver(e) {

    var mainTag;
    if (e.target.tagName == 'SPAN') {
        mainTag = e.target.parentNode;
    } else {
        mainTag = e.target;
    }
    // console.log(mainTag.tagName);
    if (isBefore(_el, e.target))
        mainTag.parentNode.insertBefore(_el, mainTag);
    else {
        mainTag.parentNode.insertBefore(_el, mainTag.nextSibling);
    }
   
}

function dragEnd() {
    _el = null;
     addToLocalStorage();
}

function dragStart(e) {
    // e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.setData("text/plain", null);
    _el = e.target;
    // console.log(e.target);

}

function isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode)
        for (var cur = el1.previousSibling; cur; cur = cur.previousSibling)
            if (cur === el2)
                return true;
    return false;
}

// localStorage.autoalert = "false";
// window.alert(localStorage.getItem("autoalert"));
// $("input[name='activateAutoAlert']").click(function() {
//     var activateAutoAlert = $("input[name='activateAutoAlert']").is(":checked") ? "true" : "false";
//     localStorage.autoalert = activateAutoAlert;
//     alert(localStorage.autoalert);
// });
