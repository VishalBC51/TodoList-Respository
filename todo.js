

var wage = document.getElementById("myInput");
wage.addEventListener("keypress", function (e) {
    if (e.keyCode == 13 ){//checks whether the pressed key is "Enter"
        addnewElement();
    }
  });




function addnewElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    li.className = "listItem";
    li.setAttribute('draggable', true);
     li.setAttribute('ondragned', "dragEnd()");
   li.setAttribute('ondragover', "dragOver(event)");
   li.setAttribute('ondragstart', "dragStart(event)");
    var t = document.createTextNode(inputValue);

    // var span = document.createElement("SPAN");
    //    var txt = document.createTextNode("\u2714");
    //    span.className = "check";
    //    span.appendChild(txt);
    //   li.appendChild(span);



    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("ul-items").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);


    closeButton();
    // dragfunction();
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
    }
}

// function checkButton(){
// var check = document.getElementsByClassName("check");
// var j;
// for (j = 0; j < check.length; j++) {
// check[j].addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// });
// }
// }

var list = document.querySelector('ul');

list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
});


//this
var _el;

function dragOver(e) {
  
  var mainTag;
  if(e.target.tagName == 'SPAN'){
    mainTag = e.target.parentNode;
  }
  else{
    mainTag = e.target;
  }
  console.log(mainTag.tagName);
  if (isBefore(_el, e.target))
    mainTag.parentNode.insertBefore(_el, mainTag);
  else{
    mainTag.parentNode.insertBefore(_el, mainTag.nextSibling);
  }
}

function dragEnd() {
  _el = null;
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
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

// function dragfunction() {


//     var listItems = document.querySelectorAll('.listItem');




//     var dragSrcEl = null;

//     function handleDragStart(e) {
//         this.className += " dragStartClass";
//         dragSrcEl = this;

//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('text/html', this.innerHTML);
//         e.dataTransfer.setDragClass("dataTransferClass");

//     }

//     function handleDragOver(e) {
//         // if (e.preventDefault) { 
//         e.preventDefault();
//         // }
//         e.dataTransfer.dropEffect = 'move'; // sets cursor
//         return false;

//     }

//     function handleDragEnter(e) {
//         // this / e.target is the current hover target.
//         this.classList.add('over');
//     }

//     function handleDragLeave(e) {
//         this.classList.remove('over'); // this / e.target is previous target element.
//     }

//     function handleDrop(e) {

//         var listItems = document.querySelectorAll('.listItem');
//         e.stopPropagation(); // stops the browser from redirecting.
//         dragSrcOrderId = parseInt(dragSrcEl.getAttribute("order-id"));
//         dragTargetOrderId = parseInt(this.getAttribute("order-id"));
//         var tempThis = this;


//         if (dragSrcEl != this) {
//             // Set the source column's HTML to the HTML of the column we dropped on.
//             var tempThis = this;

//             function makeNewOrderIds(tempThis) {
//                 // check if up or down movement

//                 dragSrcEl.setAttribute("order-id", dragTargetOrderId);
//                 tempThis.setAttribute("order-id", dragTargetOrderId);

//                 //  find divs between old and new location and set new ids - different in up or down movement (if else)
//                 if (dragSrcOrderId < dragTargetOrderId) {
//                     for (i = dragSrcOrderId + 1; i < dragTargetOrderId; i++) {
//                         listItems[i].setAttribute("order-id", i - 1);
//                         // set new id src
//                         dragSrcEl.setAttribute("order-id", dragTargetOrderId - 1);
//                     }
//                 } else {
//                     for (i = dragTargetOrderId; i < dragSrcOrderId; i++) {
//                         listItems[i].setAttribute("order-id", i + 1);
//                         // set new id src
//                         dragSrcEl.setAttribute("order-id", dragTargetOrderId);

//                     }
//                 }

//             };
//             makeNewOrderIds(tempThis);


//             dragSrcEl.classList.remove("dragStartClass");

//             reOrder(listItems);




//         } else {

//             dragSrcEl.classList.remove("dragStartClass");
//             return false;

//         }

//     };

//     function handleDragEnd(e) {

//         for (i = 0; i < listItems.length; i++) {
//             listItem = listItems[i];
//             listItem.classList.remove('over');
//         }
//         dragSrcEl.classList.remove("dragStartClass");


//     }



//     for (i = 0; i < listItems.length; i++) {
//         listItem = listItems[i];


//         listItem.setAttribute("order-id", i);



//         listItem.addEventListener('dragstart', handleDragStart, false)
//         listItem.addEventListener('dragenter', handleDragEnter, false)
//         listItem.addEventListener('dragover', handleDragOver, false)
//         listItem.addEventListener('dragleave', handleDragLeave, false)
//         listItem.addEventListener('drop', handleDrop, false)
//         listItem.addEventListener('dragend', handleDragEnd, false)
//     }

//     function reOrder(listItems) {


//         var tempListItems = listItems;
//         tempListItems = Array.prototype.slice.call(tempListItems, 0);

//         tempListItems.sort(function(a, b) {
//             return a.getAttribute("order-id") - b.getAttribute("order-id");
//         });



//         var parent = document.getElementById('ul-items');
//         parent.innerHTML = "";

//         for (var i = 0, l = tempListItems.length; i < l; i++) {
//             parent.appendChild(tempListItems[i]);
//         }
//     };
// };

// dragfunction();
