
'use strict';
let listar_datos = async() => {
    let datos;
    await axios({
            method: 'get',
            url: "https://reqres.in/api/users?page=2",
            responseType: 'json'
        }).then(function(res) {
            datos = res.data.datos;
        })
        .catch(function(err) {
            console.log(err);
        });
    return datos;
};

'use strict';
const tbody = document.querySelector('#tbl-data tbody');
let mostrar_datos = async() => {
    let datos = await listar_datos();

    for (let i = 0; i < datos.length; i++) {
        tbody.innerHTML = '';
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = datos[i]['id'];
        fila.insertCell().innerHTML = datos[i]['email'];
        fila.insertCell().innerHTML = datos[i]['first_name'];
        fila.insertCell().innerHTML = datos[i]['last_name'];
        fila.insertCell().innerHTML = datos[i]['avatar'];
    }
};

mostrar_datos();


