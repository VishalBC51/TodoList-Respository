document.getElementById("addNewTask").addEventListener('click', addNewTask);
var ul = document.getElementById("task-list");

var input = document.getElementById("myInput");
var no = 1;
var id;
var counter = 0;


var itemarr=[]

input.onkeydown = function (e) {
    if (e.keyCode == 13) {
        addNewTask();
    }
};

// if (!localStorage.getItem('todo')) {
//     localStorage.setItem('todo', JSON.stringify(itemarr));
// }

function addNewTask(){

if(input==="")
	return;
else
	{var id = "item"+ (no++)
	var obj ={
		'todoid' : id,
		'todotext':input.value,
		'todoboolean':false
	}

	itemarr.push(obj);
	addToLocalStorage(itemarr);
	 input.value = "";
}
}

function addToLocalStorage(itemarr) {
    // console.log(arr);
    localStorage.setItem('todo', JSON.stringify(itemarr));
    updateDOM();

}
var itm = JSON.parse(localStorage.getItem('todo'));

 window.onload=updateDOM();
function updateDOM(){

	var myNode = document.getElementById("task-list");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}   
	 itm = JSON.parse(localStorage.getItem('todo'));
	for(var i=0;i<itm.length;i++)
	{
		var tempid=itm[i].todoid;
		var temptext=itm[i].todotext;
		var tempboolean=itm[i].todoboolean;
		var li = document.createElement("LI");
		var p=document.createElement("P");
		li.id=itm[i].todoid;
		p.className="text";
		p.innerText=itm[i].todotext;
		var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.onchange = callcheckfunc;
        if(itm[i].todoboolean){
        	p.className="checked"
        	checkBox.checked=true;
        }
        else
        {
        	p.className= "unchecked"
        	checkBox.checked=false;
        }
        li.appendChild(checkBox);
        li.appendChild(p);
        li.appendChild(getSpan()).onclick = removeItem;
        li.className = "item";
        li.setAttribute("draggable", true);
        li.setAttribute("ondragstart", "dragStarted(event)");
        li.setAttribute("ondragover", "dragging(event)");
        li.setAttribute("ondrop", "dropped(event)");
        ul.appendChild(li); 
	}
}

function removeItem(){
	this.parentElement.remove();
	 itemarr = JSON.parse(localStorage.getItem('todo'));
	for(var i=0; i<itemarr.length;i++)
	{
		if(itemarr[i].todoid === this.parentNode.id){
			 itemarr.splice(i, 1);	 
        }
	} 
	addToLocalStorage(itemarr);
}


function getSpan(){
	var span = document.createElement("SPAN");
	span.innerText = "X";
    span.className = "removeBtn";
    return span;
}

function callcheckfunc(){

   itemarr = JSON.parse(localStorage.getItem("todo"));
    if (this.checked) {
        for (i = 0; i < itemarr.length; i++) {
            if (itemarr[i].todoid === this.parentElement.id) {
                itemarr[i].todoboolean = true;
            }
        }
    } else {
        for (i = 0; i < itemarr.length; i++) {
            if (itemarr[i].todoid === this.parentElement.id) {
                itemarr[i].todoboolean = false;
            }
        }
    }
   addToLocalStorage(itemarr);
}


var droppedId;
var idexs;
var _el;
var data;
var idexd;
function dragStarted(evt) {

     _el=evt.target;
    
     idexs= [..._el.parentNode.children].indexOf(_el);
   
     data=itemarr[idexs]
}

function dragging(evt) {
    
    evt.preventDefault();
}
function dropped(evt) {
    evt.preventDefault();

      _el=evt.target.parentNode;
     console.log(_el);
     idexd= [..._el.parentNode.children].indexOf(_el);
      
      itemarr.splice(idexs, 1);
     itemarr.splice(idexd, 0, data);
    addToLocalStorage(itemarr);
}