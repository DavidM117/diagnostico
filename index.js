fetch('https://reqres.in/api/users?page=2')
.then((response)=>{
    response.json().then((payload)=>{
        console.log(payload.data)
            let lista = document.getElementById("tablaid");
            payload.data.forEach(element=>{
                lista.innerHTML += 
                `<th scope="row">${element.id}</th>
                <td>${element.first_name}</td>
                <td>${element.email}</td>
                <td>${element.last_name}</td>
                <td ><img src="${element.avatar}" alt="" width=""></td>
                <td>
                <button type="button" onclick="getuser(${element.id})"
                class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUsuario">
                <b>Ver</b>
                </button>
                
                <button type="button" onclick="update(${element.id})"
                class="btn btn-primary btn-warning">
                <b>Actualizar</b>
                </button>

                <button type="button" onclick="deleteuser(${element.id})"
                class="btn btn-primary btn-danger">
                <b>Eliminar</b>
                </button>
                </td>
                `;
            }) 
    })
})
.catch((error)=>{
    console.log("Error al consultar", error)
})

function registrarUsuario(){
    fetch('https://reqres.in/api/users',{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'method': 'POST'
    }).then(response=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Codigo de estado:  ${response.status}`,
            showConfirmButton: false,
            timer: 1500
          })

    })
   
}

function getuser(id) {
    let datosIndividules = document.getElementById("cardid");
    datosIndividules.innerHTML = '';

    fetch(`https://reqres.in/api/users/${id}`)
        .then((response) => {
            response.json().then((payload) => {
                console.log(payload.data);

                datosIndividules.innerHTML += `
                    <div class="row" style="vertical-align: middle;">
                        <div class="col-4"><img src="${payload.data.avatar}" class="info" alt="..."></div>
                        <div class="col-8">
                            <br>
                            <h5><b>Nombre:</b> ${payload.data.first_name}</h5>
                            <h6><b>Email:</b> ${payload.data.email}</h6>
                        </div>
                    </div>    
                    `;
            });
        });
}

function update(id) {
    fetch(`https://reqres.in/api/users/${id}`,{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'method': 'PUT'
    })
    .then((response)=>{
        response.json().then((payload)=>{
            const createdAt = payload.updatedAt;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Se ha actualizado la fecha correctamente | Estado:  ${response.status}`,
                showConfirmButton: false,
                timer: 1500
              })
        })
        

    })
}


function deleteuser(id) {
    fetch(`https://reqres.in/api/users/${id}`,{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'method': 'DELETE'
    })
    .then((response)=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Se ha eliminado correctamente | Estado: ${response.status}`,
            showConfirmButton: false,
            timer: 1500
        })
    })
}