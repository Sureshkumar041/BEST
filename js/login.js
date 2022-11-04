const form = document.getElementById("form");

form.addEventListener('submit', e => {
    e.preventDefault();
    login();
});

login = () => {
    var usernameinput = document.getElementById("username").value.trim();
    var pswdinput = document.getElementById("pswd").value.trim();
    var data = JSON.parse(localStorage.getItem("UserData"));
    var nameentry = 0, pswdentry = 0, loginentry = 0;

    if (usernameinput === "") SetError(username, "Plz fill the user name");
    if (pswdinput === "") SetError(pswd, "Plz fill the password");
    else {
        SetError(username,"");
        data.forEach(element => {
            if (usernameinput === element.email || usernameinput === element.username) {
                nameentry++;
                if (pswdinput === element.pswd) {
                    SetError(pswd,"");
                    var userid = element.id;
                    localStorage.setItem("User Id",userid);
                    window.location.href="dashboard.html";
                }else SetError(pswd,"Invalid password");
            }
        });
        console.log("nameentry: ",nameentry);
        if (nameentry === 0) SetError(username, "Invalid email or username");
    }
}

SetError = (input, message) => {
    const inputbox = input.parentElement;
    const paratag = inputbox.querySelector("p");
    paratag.innerHTML = message;
}