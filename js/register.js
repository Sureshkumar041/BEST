const form = document.getElementById("form");

form.addEventListener('submit', e => {
    e.preventDefault();
    InputValidation();
});

const InputValidation = () => {
    // Removing space from user input
    const roleinput = document.getElementById("role").value;
    var emailinput = document.getElementById("email").value.trim();
    var usernameinput = document.getElementById("username").value.trim();
    var mobilenoinput = document.getElementById("phno").value.trim();
    var pswdinput = document.getElementById("pswd").value.trim();
    var repswdinput = document.getElementById("repswd").value.trim();
    var regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var pswdExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;
    var key = 0;

    // Input Validation
    if(emailinput === ""){
        SetError(email,"Plz fill the email address");
    }else if(!regExp.test(emailinput)){
        SetError(email,"Plz fill the valid email address");
    }else{
        SetError(email,"");
        key++;
    }

    if(usernameinput === ""){
        SetError(username,"Plz enter the user name");
    }else if(usernameinput.length < 7){
        SetError(username,"User name atleast 7 character");
    }else{
        SetError(username,"");
        key++;
    }
   
    if(mobilenoinput === ""){
        SetError(phno,"Plz enter the mobile number");
    }else if(isNaN(mobilenoinput) || mobilenoinput.length != 10){
        SetError(phno,"Invalid mobile number");
    }else{
        SetError(phno,"");
        key++;
    }

    if(pswdinput === ""){
        SetError(pswd,"Plz fill the password");
    }else if(!pswdExp.test(pswdinput)){
        SetError(pswd,"Plz enter the strong password");
    }else{
        SetError(pswd,"");
        key++;
    }

    if(repswdinput === ""){
        SetError(repswd,"Plz enter the confirm password")
    }else if(repswdinput != pswdinput){
        SetError(repswd,"Password must same");
    }else{
        SetError(repswd,"");
        key++;
        store(roleinput,emailinput,usernameinput,mobilenoinput,pswdinput,key);
    }   
}

SetError=(input,message)=>{
    const field = input.parentElement;
    const paragraph= field.querySelector("p");
    paragraph.innerText = message;
}

store=(roleinput,emailinput,usernameinput,mobilenoinput,pswdinput,key)=>{
    console.log("KEY VALUE: ",key);
    var emailexists = 0,userexists =0,storing =0;
    var data = JSON.parse(localStorage.getItem("UserData"));

    if(key === 5){
        if(data === null){
            var data = [];
            var user = {
                id: 1,
                role: roleinput,
                email: emailinput,
                username: usernameinput,
                mobileno: mobilenoinput,
                pswd: pswdinput
            };
            data.push(user);
            localStorage.setItem("UserData",JSON.stringify(data));
            alert("Registered Successfully !");
            window.location.href="login.html";
        }else{
            data.forEach(element => {
                if(emailinput === element.email) emailexists++;
                if(usernameinput === element.username) userexists++;              
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

            if(storing === 2){
                var idinput = data.length +1;
                console.log("Id: ",idinput);
                var  user = {
                    id: idinput,
                    role: roleinput,
                    email: emailinput,
                    username: usernameinput,
                    mobileno: mobilenoinput,
                    pswd: pswdinput
                };
                data.push(user);
                localStorage.setItem("UserData",JSON.stringify(data));
                alert("Registered Successfully !");
                window.location.href="login.html";
            }else{
                return false;
            }
        }
    }else{
        console.log("Try Again");
    }
}