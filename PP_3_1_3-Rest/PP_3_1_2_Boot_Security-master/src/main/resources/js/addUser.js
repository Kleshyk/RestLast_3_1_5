 async function createNewUser(user) {
    await fetch("/api/admin",
        {method: 'POST',headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(user)})

}

async function addNewUserForm() {
    const newUserForm = document.getElementById("newUser");


    newUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = newUserForm.querySelector("#firstName").value.trim();
        const surname = newUserForm.querySelector("#lastName").value.trim();
        const age = newUserForm.querySelector("#age").value.trim();
        const email = newUserForm.querySelector("#email").value.trim();
        const password = newUserForm.querySelector("#password").value.trim();
        let roles = [];
        for (let i = 0; i < newUserForm.querySelector("#roles").options.length; i++) {
            if (newUserForm.querySelector("#roles").options[i].selected) {
                roles.push({
                    id: newUserForm.querySelector("#roles").options[i].value,
                    role: "ROLE_" + newUserForm.querySelector("#roles").options[i].text
                });
            }
        }

     /*  const rolesSelected = document.getElementById("roles");
        let allRole = await getRoles();
        let roles = [];
        for(let i = 0; i < allRole.length; i++) {
            if (rolesSelected.value === allRole[i].role) {
                roles = allRole[i].role;
            }
        }*/

console.log(roles);




        const newUserData = {
            name: name,
            surname: surname,
            age: age,
            email:email,
            password: password,
            roles: roles
        };

        await createNewUser(newUserData);
        newUserForm.reset();
        console.log(newUserData)

        document.querySelector('a#show-users-table').click();
        await fillTableOfAllUsers();
    });
}
function loadRoleForNew(){
    let rolSel = document.getElementById("roles");
    rolSel.innerHTML = "";
    fetch("http://localhost:8080/api/admin/roles",)
        .then(role=>role.json())
        .then(roles => {
        roles.forEach(role => {
            let option = document.createElement("option");
            option.text = role.role.substring(5);
            option.value = role.id;
            rolSel.appendChild(option);
            console.log(option.text);
            console.log(option.value);
        })
    })
}