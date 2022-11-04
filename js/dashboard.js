var data = JSON.parse(localStorage.getItem("UserData"));
var userid = localStorage.getItem("User Id");

data.forEach(element => {
    if(userid == element.id){
     document.getElementById("userdetail").innerHTML = element.username;
     document.getElementById("usertype").innerHTML = element.role;   
    }
});

// var actions = '<button class="btn btn-primary onClick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
// var options =[email,username,mobile,action];

data.forEach(element => {
    var content = document.getElementById("table");
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

onShow = () => document.getElementById("table").style.visibility = "visible";

onHidden = () => document.getElementById("action").style.display = "none";

onEdit = (row) => {
    document.getElementById("divtable").style.display = "none";
    document.getElementById("action").style.display = "block";

    var data = JSON.parse(localStorage.getItem("UserData"));
    var index = row.parentElement.parentElement.rowIndex;
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
                var changes = document.getElementById("table").rows[idinput].cells;
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
    // var deluser = 0;
    idinput = document.getElementById("table").rows[index].cells[0].innerHTML;
    console.log("User Id: ",idinput);
    if(confirm("Do you want to delete this record ?")){
        // Delete A data From Table
        document.getElementById("table").deleteRow(idinput);

        var deluser = data.findIndex(i => i.id == idinput );
        //Delete a data from LocalStorage
        data.splice(deluser,1);
        var autoid = 1; // User Id increment
        data.forEach(element => {
            element.id = autoid;
            var changes = document.getElementById("table").rows[idinput].cells;
            changes[0].innerHTML = element.id;
            autoid++;
        });
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


console.log("Page start");
//  var paginationFilter=()=>{
    // alert("Pagination");
    var pagination = document.getElementById("pagination");
    var ulList = document.createElement('ul');
    var liList = document.createElement('li');
    var pageLink = document.createElement('a');
    
    pagination.setAttribute("class", "pagination");
    pageLink.setAttribute("class", "navlink");
    pageLink.setAttribute("href", "#");
    
    pagination.appendChild(ulList);
    ulList.appendChild(liList);
    liList.appendChild(pageLink);
    
    // return pagination; 
// };


// for(var i=0;Array.length;i++){
//     if(em == Array.email && pswd == Array.password)[
//         alert("Success")
//     ]else{
//         alert("Error")
//     }
// }