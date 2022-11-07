var data = JSON.parse(localStorage.getItem("UserData"));
var userid = localStorage.getItem("User Id");
var index;

data.forEach(element => {
    if(userid == element.id){
     document.getElementById("userdetail").innerHTML = element.username;
     document.getElementById("usertype").innerHTML = element.role;   
    }
});

// var actions = '<button class="btn btn-primary onClick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
// var options =[email,username,mobile,action];

data.forEach(element => {
    var content = document.getElementById("tbody");
    var newrow = content.insertRow();
    //  Print Register Data
    var cell = newrow.insertCell(0);
    cell.innerHTML = element.id;
    var cell = newrow.insertCell(1);
    cell.innerHTML = element.email;
    var cell = newrow.insertCell(2);
    cell.innerHTML = element.username;
    var cell = newrow.insertCell(3);
    cell.innerHTML = element.mobileno;
    var cell = newrow.insertCell(4);
    cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
});

onShow = () =>{
    // document.getElementsByClassName("pagination").style.display = "block";
    document.getElementById("table").style.visibility = "visible";
} 

onHidden = () => document.getElementById("action").style.display = "none";

onEdit = (row) => {
    // document.getElementById("divtable").style.display = "none";
    document.getElementById("action").style.display = "block";
    var data = JSON.parse(localStorage.getItem("UserData"));
    index = row.parentElement.parentElement.rowIndex;
    console.log("Index: ",index);
    // alert("Index");
    idinput = document.getElementById("table").rows[index].cells[0].innerHTML;
    data.forEach(element => {
        if (idinput == element.id) {
            console.log("Good");
            document.getElementById("email").value = element.email;
            document.getElementById("username").value = element.username;
            document.getElementById("phno").value = element.mobileno;
            console.log("Edit User id: ",element.id);
        }
    });
}

onUpdate = () => {
    var data = JSON.parse(localStorage.getItem("UserData"));
    var emailupdate = document.getElementById("email").value.trim();
    var nameupdate = document.getElementById("username").value.trim();
    var noupdate = document.getElementById("phno").value.trim();
    var regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var emailexists=0, userexists=0, storing=0,key=0;
    
    //  Email Validation
    if(emailupdate === ""){
        SetError(email,"Plz fill the email address");
    }else if(!regExp.test(emailupdate)){
        SetError(email,"Plz fill the valid email address");
    }else{
        SetError(email,"");
        key++;
    }
    // Username Validation
    if(nameupdate === ""){
        SetError(username,"Plz enter the user name");
    }else if(nameupdate.length < 7){
        SetError(username,"User name atleast 7 character");
    }else{
        SetError(username,"");
        key++;
    }
    // Mobileno Validation
    if(noupdate === ""){
        SetError(phno,"Plz enter the mobile number");
    }else if(isNaN(noupdate) || noupdate.length != 10){
        SetError(phno,"Invalid mobile number");
    }else{
        SetError(phno,"");
        key++;
    }


    if(key === 3){
        data.forEach(element => {
            if( emailupdate === element.email) emailexists++;
            if(nameupdate === element.username) userexists++;              
        });

        if(emailexists != 0) SetError(email,"Email address already exists");
        else{
            SetError(email,"");
            storing++;
        }
        if(userexists != 0) SetError(username,"User name already exists");
        else{
            SetError(username,"");
            storing++;
        }
    }else{
        return true;
    }

    if(storing === 2){
        data.forEach(element => {
            if(idinput == element.id){
                console.log("Object id: ",element.id);
                element.email = emailupdate;
                element.username = nameupdate;
                element.mobileno = noupdate;
                var changes = document.getElementById("table").rows[index].cells;
                changes[0].innerHTML = element.id;
                changes[1].innerHTML = element.email;
                changes[2].innerHTML = element.username;
                changes[3].innerHTML = element.mobileno;
                // Updating the changes in local storage
                localStorage.setItem("UserData",JSON.stringify(data));
                alert("Updates Successfully !");
                document.getElementById("action").style.display ="none";
            }else console.log("Try");
        });
    }else{
        return false;
    }
}

onDelete=(row)=>{
    var data = JSON.parse(localStorage.getItem("UserData"));
    var index = row.parentElement.parentElement.rowIndex;
    console.log("Index For Delete: ",index);
    // var deluser = 0;
    idinput = document.getElementById("table").rows[index].cells[0].innerHTML;
    console.log("User Id: ",idinput);
    if(confirm("Do you want to delete this record ?")){
        // Delete A data From Table
        document.getElementById("table").deleteRow(index);

        var deluser = data.findIndex(i => i.id == idinput );
        //Delete a data from LocalStorage
        data.splice(deluser,1);

        // var autoid = 1;  User Id increment
        // data.forEach(element => {
        //     element.id = autoid;
        //     var changes = document.getElementById("table").rows[index].cells;
        //     changes[0].innerHTML = element.id;
        //     autoid++;
        // });
        localStorage.setItem("UserData",JSON.stringify(data));
        console.log("Local Index: ",deluser);
    }
}

onSearch=()=>{
    document.getElementById("table").style.display = "none";
    // document.getElementById("pagemove").style.visibility = "hidden";
    // alert("Search");
    var searchemail = document.getElementById("emailsearch").value;
    var searchno = document.getElementById("nosearch").value;
    var data = JSON.parse(localStorage.getItem("UserData"));
    var search =0;

    if(searchemail === "" && searchno === "") SetError(invalid,"Plz enter the data");
    else{
        SetError(invalid,"");
        if(searchemail != "" && searchno === ""){
            // alert("One Coming");
            data.forEach(element => {
                if(searchemail === element.email){
                    // document.getElementById("table").style.display = "block";
                    search++;
                    console.log("Email Address: ",element.email);
                    var showtable = document.getElementById("searchtable");
                    var newrow = showtable.insertRow();
                    //  Print Seraching Data
                    var cell = newrow.insertCell(0);
                    cell.innerHTML = element.id;
                    var cell = newrow.insertCell(1);
                    cell.innerHTML = element.email;
                    var cell = newrow.insertCell(2);
                    cell.innerHTML = element.username;
                    var cell = newrow.insertCell(3);
                    cell.innerHTML = element.mobileno;
                    var cell = newrow.insertCell(4);
                    cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
                }
                // else console.log("No matching data");
            });
    
            if(search === 0) alert("No such a data match");
            else document.getElementById("divtable").style.display = "block"; 
            // document.getElementById("pagemove").style.display = "block";
        }

        if(searchemail === "" && searchno != ""){
            // alert("One Coming");
            data.forEach(element => {
                if(searchno === element.mobileno){
                    search++;
                    console.log("Email Address: ",element.mobileno);
                    var showtable = document.getElementById("searchtable");
                    var newrow = showtable.insertRow();
                    //  Print Seraching Data
                    var cell = newrow.insertCell(0);
                    cell.innerHTML = element.id;
                    var cell = newrow.insertCell(1);
                    cell.innerHTML = element.email;
                    var cell = newrow.insertCell(2);
                    cell.innerHTML = element.username;
                    var cell = newrow.insertCell(3);
                    cell.innerHTML = element.mobileno;
                    var cell = newrow.insertCell(4);
                    cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
                }
                // else console.log("No matching data");
            });
    
            if(search === 0) alert("No such a data match");
            else document.getElementById("divtable").style.display = "block";
        }

        if(searchemail != "" && searchno != ""){
            // alert("One Coming");
            data.forEach(element => {
                if(searchemail === element.email && searchno === element.mobileno){
                    search++;
                    console.log("Email Address: ",element.mobileno);
                    var showtable = document.getElementById("searchtable");
                    var newrow = showtable.insertRow();
                    //  Print Seraching Data
                    var cell = newrow.insertCell(0);
                    cell.innerHTML = element.id;
                    var cell = newrow.insertCell(1);
                    cell.innerHTML = element.email;
                    var cell = newrow.insertCell(2);
                    cell.innerHTML = element.username;
                    var cell = newrow.insertCell(3);
                    cell.innerHTML = element.mobileno;
                    var cell = newrow.insertCell(4);
                    cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
                }
                // else console.log("No matching data");
            });
    
            if(search === 0) alert("Data not available");
            else document.getElementById("divtable").style.display = "block";
        }
    }
}

SetError=(input,message)=>{
    const field = input.parentElement;
    const paragraph= field.querySelector("p");
    paragraph.innerText = message;
}

onSearchbar=()=>{
    document.getElementById("searchbar").style.display = "block";
}

// Pagination 
var tbody = document.querySelector("tbody");
// var insidetable = document.querySelector("tbody");
var navi = document.querySelector(".pagination");
var row = tbody.querySelectorAll("tr");
console.log("Row: ",row);

var dummy = [];
var indexs = 1;
var itemperpage = 3;

row.forEach(element => {
    dummy.push(element);
});
// alert("Dummy");
console.log("DUMMY: ",dummy);

// Displaying user data in table
displaydata = (itemperpage) => {
    var i =1;
    tbody.innerHTML = "";
    dummy.forEach(element => {
        if (i <= itemperpage) {
            console.log("Times");
            tbody.appendChild(element);
            i++;
        }
    });
    var pagnum = navi.querySelectorAll(".list");
    pagnum.forEach(element => element.remove());
}
displaydata(itemperpage);

// Creating dynamic pagination
dynamicpagination=(itemperpage)=>{
    // alert("Dynamic Page");
    var total_row = dummy.length;
    console.log("ITEM PER: ",itemperpage);
    console.log("Total length: ",total_row);
    if(total_row <= itemperpage) {
        console.log("IF part"); navi.style.display = "none";
    }    
    else{
        // alert("Else part");
        navi.style.display = "flex";
        var no_page = Math.ceil(total_row/itemperpage);
        for (let index = 1; index <= no_page; index++) {
            // const element = array[index];
            var li = document.createElement("li");
            li.className ="list page-item";
            var anchor = document.createElement("a");
            anchor.href = "#";
            anchor.className ="page-link";
            anchor.innerHTML = index;
            anchor.setAttribute("datapage",index);
            li.appendChild(anchor);
            navi.insertBefore(li,navi.querySelector(".next"));            
        }
    } 
}
dynamicpagination(itemperpage);

var pageconnect = document.querySelectorAll("a");
console.log("A tag: ",pageconnect);
var lastpage = pageconnect.length-2;

// Connecting the page to another page
pageConnector=(pageconnect,itemperpage,lastpage,pagehref)=>{
    for(button of pageconnect){
        button.onclick=e=>{
            console.log("1");
            var page_no = e.target.getAttribute("datapage");
            console.log("Page no: ",page_no);
            var pagemove = e.target.getAttribute("id");
            console.log("Pagemove: ",pagemove);
            console.log("MAIN Indexs: ",indexs);
            if( page_no != null){
                indexs = page_no;
            }else{
                if( pagemove === "next"){
                    indexs++;
                    if(indexs >= lastpage){
                        indexs = lastpage;
                    }
                }else{
                    indexs--;
                    if(indexs <= 1){
                        indexs = 1;
                    }
                }
            }
            pageCreate(indexs,itemperpage,pagehref);
        }
    }
}

var pagehref = navi.querySelectorAll(".list");
console.log("PAGEHREF: ",pagehref);
pagehref[0].classList.add("active");
pageConnector(pageconnect,itemperpage,lastpage,pagehref);

// giveValue=(itemperpage)=>{
//     var pagehref = navi.querySelectorAll(".list");
//     pagehref[0].classList.add("active");
//     var pagelink = navi.querySelectorAll(".a");
//     var lastpage = pagelink.length-2;
//     console.log("Lastpage no: ",lastpage);
//     pageConnector(pagelink,itemperpage,lastpage,pagehref); 
// }

pageCreate=(indexs,itemperpage,pagehref)=>{
    var first = itemperpage*indexs;
    var final = first + itemperpage;
    var current_page = dummy.slice((first-itemperpage),(final - itemperpage));
    console.log("Dummy Array: ",dummy);
    console.log("Current Page: ",current_page);
    tbody.innerHTML ="";
    current_page.forEach(element => {
        var u =0;
        console.log(u++);
        console.log("Element: ",element);
        tbody.appendChild(element);
    });
    Array.from(pagehref).forEach((e)=>{
        e.classList.remove("active");
    });
    console.log("I: ",indexs);
    pagehref[indexs -1].classList.add("active");
    console.log("Active Page: ",pagehref);
}

console.log("Dummy: ",dummy[0].cells[0]);
onSearch=()=>{
    var input, filter, table, tr, td, i, txtValue;
    console.log("Data: ",data);
    filter = document.getElementById("emailsearch").value.toUpperCase();
    tbody.innerHTML ="";
    for (i = 0; i < dummy.length; i++) {
    td = dummy[i].cells[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tbody.appendChild(dummy[i]);
        } else {
            dummy[i].style.display = "none";
        }
      }       
    }
  }
  