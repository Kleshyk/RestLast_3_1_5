async function sendDataEditUser(user) {
    await fetch("/api/admin" ,
        {method:"PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(user)} )
}

const modalEdit = document.getElementById("editModal");

async function EditModalHandler() {
    await fillModal(modalEdit);


    modalEdit.addEventListener("submit", async function (event) {
        event.preventDefault();
        let rolesEdit = [];
        for (let i = 0; i < modalEdit.querySelector("#rolesEdit").options.length; i++) {
            if (modalEdit.querySelector("#rolesEdit").options[i].selected) {
                rolesEdit.push({
                    id: modalEdit.querySelector("#rolesEdit").options[i].value,
                    role: "ROLE_" + modalEdit.querySelector("#rolesEdit").options[i].text
                });
            }
        }


        console.log(rolesEdit);

        let user = {
            id: document.getElementById("idEdit").value,
            name: document.getElementById("firstNameEdit").value,
            surname: document.getElementById("lastNameEdit").value,
            age: document.getElementById("ageEdit").value,
            email: document.getElementById("emailEdit").value,
            password: document.getElementById("passwordEdit").value,
            roles: rolesEdit
        }

        await sendDataEditUser(user);
        await fillTableOfAllUsers();

        const modalBootstrap = bootstrap.Modal.getInstance(modalEdit);
        modalBootstrap.hide();
    })
}
function loadRoleForEdit(){
    let rolSelect = document.getElementById("rolesEdit");
    rolSelect.innerHTML = "";
    fetch("http://localhost:8080/api/admin/roles",)
        .then(role=>role.json())
        .then(roles => {
            roles.forEach(role => {
                let options = document.createElement("option");
                options.text = role.role.substring(5);
                options.value = role.id;
                rolSelect.appendChild(options);
                console.log(options.text);
                console.log(options.value);
            })
        })
}