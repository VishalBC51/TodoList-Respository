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
var li;
var inputValue;
var t;
var idno;
var boolean = false;
var obj;

function addnewElement() {
    var itm = JSON.parse(localStorage.getItem("todo"));
    if (itm != null && itm.length != 0) {
        renderall();
        i = itm.length;
    }

    li = document.createElement("li");
    inputValue = document.getElementById("myInput").value;
    if (inputValue != '') {
        // alert("You must write something!");

        idno = "item" + i++;
        li.setAttribute('id', idno);
        li.className = "listItem";
        li.setAttribute('draggable', true);
        li.setAttribute('ondragend', "dragEnd()");
        li.setAttribute('ondragover', "dragOver(event)");
        li.setAttribute('ondragstart', "dragStart(event)");
        t = document.createTextNode(inputValue);
        var p= document.createElement("P");
        p.appendChild(t);
        li.appendChild(p);
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


    // id = "item" + i++;
    // var obj=todoconstructor(id,inputValue,false);

    createobject(idno, inputValue, boolean)

    closeButton();
    // dragfunction();
    updatedom();
}

function createobject(idno, inputValue, boolean) {
    let obj = {
        todoId: idno,
        todoText: inputValue,
        todoboolean: boolean
    };
    arr.push(obj);
    addToLocalStorage();
    updatedom();
}


function addToLocalStorage() {
    // console.log(arr);
    localStorage.setItem('todo', JSON.stringify(arr));
    updatedom();
}


function closeButton() {
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(e) {
            // var div = this.parentElement;
            // div.style.display = "none";
            var div = e.target.parentNode;
            // console.log(div.id);
            div.remove();

            var itm = JSON.parse(localStorage.getItem("todo"));
            for (var j = 0; j < itm.length; j++) {
                if (itm[j].todoId == div.id) {
                    // console.log(div.firstElementChild.idno+" "+itm[j].todoId);
                    arr.splice(j, 1);
                    addToLocalStorage();
                    break;

                }
            }
            renderall();
            addToLocalStorage();
            updatedom();


        }
    }

}



var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    var checkvar = ev.target;
    if (checkvar.tagName === 'LI') {
        checkvar.classList.toggle('checked');
        console.log(checkvar.className);
        var itm = JSON.parse(localStorage.getItem("todo"));
        if (checkvar.className === 'listItem checked') {
            for (var j = 0; j < itm.length; j++) {
                if (itm[j].todoId == checkvar.id) {
                    // checkvar.todoboolean=true;
                    //  arr.splice(j,1);
                    // createobject(itm[j].todoId,itm[j].todoText,true)
                    var tempobj = arr[j];
                    tempobj.todoboolean = true;
                    arr[j] = tempobj;
                    addToLocalStorage(obj);
                    break;
                }
            }
            // addnewElement();

        } else {
            for (var j = 0; j < itm.length; j++) {
                if (itm[j].todoId == checkvar.id) {
                    // checkvar.todoboolean=true;
                    var tempobj = arr[j];
                    tempobj.todoboolean = false;
                    arr[j] = tempobj;
                    addToLocalStorage(obj);
                    break;
                }
            }


        }
        // addToLocalStorage();
    }progressbar();
    updatedom();
});



//this
var _el;
var sorpos;
var desposb;
var desposa;
var holdsource;

function dragOver(e) {

    var mainTag;
    if (e.target.tagName == 'SPAN'||e.target.tagName=='P') {
        mainTag = e.target.parentNode;
    } else {
        mainTag = e.target;
    }
    // console.log(mainTag.tagName);
    if (isBefore(_el, e.target)) {
        mainTag.parentNode.insertBefore(_el, mainTag);
        // var itm = JSON.parse(localStorage.getItem("todo"));
        // for (desposb = 0; desposb <itm.length; desposb++) {
        //           if(itm[desposb].todoId==mainTag.id){
        //                  var temp=arr[desposb];
        //                  arr[desposb]= arr[sorpos]
        //                  arr[sorpos]=arr[temp]
        //                  sorpos--;
        //                 // var tempobj=arr[sorpos];
        //             //   arr.splice(despos,0,holdsource);
        // //               arr.splice(despos,0,tempobj)

        // //               // arr[sorpos]=tempobj;
        // //               // addToLocalStorage(obj);
        //                break;
        //     }
        //  } addToLocalStorage();

    } else {
        mainTag.parentNode.insertBefore(_el, mainTag.nextSibling);
        //   var itm = JSON.parse(localStorage.getItem("todo"));
        // for (desposa = 0; desposa <itm.length; desposa++) {
        //           if(itm[desposa].todoId==mainTag.id){
        //                  var temp=arr[desposa];
        //                  arr[desposa]= arr[sorpos]
        //                  arr[sorpos]=arr[temp]

        //                 // var tempobj=arr[sorpos];
        //             //   arr.splice(despos,0,holdsource);
        // //               arr.splice(despos,0,tempobj)

        // //               // arr[sorpos]=tempobj;
        // //               // addToLocalStorage(obj);
        //                break;
        //     }
        //  }

    }
}

function dragEnd() {
    _el = null;
    //console.log(ul.length);
    for (var i = 0; i < list.childElementCount; i++) {
        // var list = document.querySelector('li:nth-child('+i+')');

        var mylist = list.children[i];
        console.log(mylist);
        arr[i].todoId = "item"+i;
        if (list.children[i].classList.contains("checked")) {
            arr[i].todoboolean = true;
        } else {
            arr[i].todoboolean = false;
        }
        // list=document.querySelector('#maincontainer ul li:nth-child('+i+') label')
        arr[i].todoText = mylist.textContent.substring(0,[ mylist.textContent.length-1]);

    }

    addToLocalStorage();
    updatedom();
    ;
    //    alert("HELL");
    // localStorage.clear();

}
// renderall();
//      addToLocalStorage()

function dragStart(e) {
    // e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.setData("text/plain", null);
    _el = e.target;
    // console.log(e.target);
    var itm = JSON.parse(localStorage.getItem("todo"));
    for (sorpos = 0; sorpos < itm.length; sorpos++) {
        if (itm[sorpos].todoId == _el.id) {
            // checkvar.todoboolean=true;
            //  var tempobj=arr[sorpos];
            holdsource = arr[sorpos];
            // arr.splice(sorpos,1)
            // arr[sorpos]=tempobj;
            // addToLocalStorage(obj);
            break;
        }
    }
    addToLocalStorage();
    renderall();
     addToLocalStorage();

}

function isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode)
        for (var cur = el1.previousSibling; cur; cur = cur.previousSibling)
            if (cur === el2)
                return true;
    return false;
}

//  window.onload=function onreload(){
//   i=0;
//   renderall();
//   var itm = JSON.parse(localStorage.getItem("todo"));
//        if(itm != null && itm.length != 0 ){

//   var ul = document.getElementById("ul-items");

//   for(var j=0;j<arr.length;j++)
//   {
//         var li = document.createElement("li");
//         li.setAttribute('id', itm[j].todo);
//         li.className = "listItem";
//         if(itm.todoboolean == true)
//         {
//           li.className+="checked"
//         }
//         li.setAttribute('draggable', true);
//         li.setAttribute('ondragned', "dragEnd()");
//         li.setAttribute('ondragover', "dragOver(event)");
//         li.setAttribute('ondragstart', "dragStart(event)");
//         t = document.createTextNode(itm[j].todoText);
//         li.appendChild(t);
//         document.getElementById("ul-items").appendChild(li);
//         var span = document.createElement("SPAN");
//         var txt = document.createTextNode("\u00D7");
//         span.className = "close";
//         span.appendChild(txt);
//         li.appendChild(span);
//         ul.appendChild(li);
//       }
//     } closeButton();

// };
 
function renderall() {
    var p = 0;
    var temparr = [];
   
    var itm = JSON.parse(localStorage.getItem("todo"));
    if (itm != null) {
        for (var j = 0; j < itm.length; j++) {
            var objnew = {
                todoId: "item" + j,
                todoText: itm[j].todoText,
                todoboolean: itm[j].todoboolean

            };
             

            temparr.push(objnew)
        }
        arr = temparr;
    }
    updatedom();
}


updatedom();
var ul =document.getElementById("ul-items");
function updatedom(){
  ul =document.getElementById("ul-items");
   if (arr != null) {
        for (var j = 0; j < arr.length; j++) {
            // var objnew = {
            //     todoId: "item" + j,
            //     todoText: itm[j].todoText,
            //     todoboolean: itm[j].todoboolean

            // };
                
                ul.children[j].id = arr[j].todoId;

              //  list.children[i]=mylist

}
}
}

function progressbar(){

    if ( list.childElementCount !== 0) {
        var count = 0;
        for (var i = 0; i <  list.childElementCount; i++) {
            if (list.children[i].classList.contains("checked")) {
                count++;
            }
        }
        console.log(count)
        var progress = Math.round(count / list.childElementCount * 100);

        document.querySelector(".completion").style.width = progress + "%";
        document.querySelector(".progress-text").innerHTML = progress + "%" + " completed";
        document.querySelector(".progress-text").style.color = "black";
    } else {
        document.querySelector(".completion").style.width = "0%";
        document.querySelector(".progress-text").style.color = "transparent";
    }


}

// var masterList;

// window.onload = function(){
//   masterList = JSON.parse(localStorage.getItem('todo')); //get data from storage
//   if (masterList !== null) { //if data exist (todos are in storage)
//     masterList.forEach(function(v){ //append each element into the dom
//       var task = v;
//       var entry = document.createElement('li'); //2
//       var list3 = document.getElementById(''); //2
//       entry.appendChild(document.createTextNode(task)); //2
//       list3.appendChild(entry); //2
//     })
//   } else { //if nothing exist in storage, keep todos array empty
//     masterList = [];
//   }
// }



// localStorage.autoalert = "false";
// window.alert(localStorage.getItem("autoalert"));
// $("input[name='activateAutoAlert']").click(function() {
//     var activateAutoAlert = $("input[name='activateAutoAlert']").is(":checked") ? "true" : "false";
//     localStorage.autoalert = activateAutoAlert;
//     alert(localStorage.autoalert);
// });
