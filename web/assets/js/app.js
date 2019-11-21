$(document).ready(function () {

    // index();

    // function index() {
    //     response = ajax_request("core/controller/get_index.php", "GET", { sesion: true });
    //     if (true) {
    //         $(".user-dropdown").hide();
    //         $(".btn-user-menu").hide();
    //         set_text_tag(".titulo-h1", "");
    //         $(".main-panel").load("core/view/login.html", function () {
    //             entrar();
    //         });

    //     } else {
    //         if (sessionStorage.getItem("email") == 'undefined')
    //             iniciar_sesion();
    //         $(".user-dropdown").show();
    //         $(".btn-user-menu").show();
    //         set_active_class(this);
    //         set_text_tag(".title-head", "POLARIS - Inicio");
    //         set_text_tag(".titulo-h1", "Inicio");
    //         $(".main-panel").load("core/view/inicio.html");
    //         set_text_tag(".usuario-h4", sessionStorage.getItem("email"));
    //         $(".modal-container-usuario").load("core/view/usuario.html");
    //     }
    // }

    // function entrar() {
    //     document.body.addEventListener("keydown", acceso);
    // }

    // function acceso(event) {
    //     var codigo = event.keyCode || event.wich;
    //     if (codigo == 13) {
    //         iniciar_sesion();
    //     }
    // }

    // function iniciar_sesion() {
    //     data = {
    //         email: get_value_input("#input-email"),
    //         password: get_value_input("#input-password")
    //     }
    //     respuesta = ajax_request("core/controller/get_sesion.php", "POST", data);
    //     sessionStorage.setItem("email", respuesta.email);
    //     sessionStorage.setItem("tipo", respuesta.tipo);
    //     sessionStorage.setItem("id", respuesta.id);
    //     set_text_tag(".usuario-h4", sessionStorage.getItem("email"));
    //     document.body.removeEventListener("keydown", acceso);
    //     location.href = "index.php";
    // }
    function get_proveedores() {
        return ajax_request("core/controller/get_proveedores.php", "GET", {});
    }

    function get_sucursal(){
	return ajax_request("core/controller/get_sucursal.php", "GET", {});
    }

    function get_mercancia(){
	return ajax_request("core/controller/get_mercancia.php", "GET", {});
    }

    // function get_servicios_renta_usuario(usuario_id) {
    //     return ajax_request("core/controller/get_servicios_renta_usuario.php", "GET", { usuario_id: usuario_id });
    // }

    // function get_servicios_viaje_usuario(usuario_id) {
    //     return ajax_request("core/controller/get_servicios_viaje_usuario.php", "GET", { usuario_id: usuario_id });
    // }

    function load_panel_proveedor() {
        set_active_class(this);
        $(".title-head").text("Inventario - Proveedor");
        $(".titulo-h1").text("Proveedor");
        $(".main-panel").load("core/view/proveedores.html", function () {
            //usuario_id = sessionStorage.getItem("id");
            //servicios_renta = get_servicios_renta_usuario(usuario_id);
            prov = get_proveedores();
            x = []
            for (j in prov)
            {
                y = []
                for (i in prov[j]) {
                    y.push(prov[j][i])
                    //console.log(prov);
                }
                x.push(y)
            } 
            console.log(x);
            if (prov != []) {
                $("#table-prov").DataTable({
                    destroy: true,
                    data: x,
                    columns: [{
                            title: "id"
                        },
                        {
                            title: "apellido paterno"
                        },
                        {
                            title: "apellido materno"
                        },
                        {
                            title: "nombre"
                        },
                        {
                            title: "calle"
                        },
                        {
                            title: "colonia"
                        },
                        {
                            title: "alcaldia"
                        },
                        {
                            title: "CP"
                        }
                    ]
                });
            } else {
                $("#table-viaje").DataTable({
                    destroy: true
                });
            }
        });
    }

    function eliminar_prov(){
        $.post("core/controller/del_prov.php", {"prov_id": this.id});
        load_panel_proveedor2();
    }

    function load_panel_proveedor2() {
        set_active_class(this);
        $(".title-head").text("Inventario - Proveedor");
        $(".titulo-h1").text("Proveedor");
        $(".main-panel").load("core/view/proveedores.html", function () {
            //usuario_id = sessionStorage.getItem("id");
            //servicios_renta = get_servicios_renta_usuario(usuario_id);
            provs = get_proveedores();
            prov= []
            provs.forEach(element => {
                element.option = "<button class='btn-del-prov btn btn-success btn-block' id=" + element.id + ">Eliminar</button>"
                prov.push(element);
            });

            console.log(prov);
            if (prov != []) {
                $("#table-prov").DataTable({
                    destroy: true,
                    data: prov,
                    columns: [
                        {
                            data: "id"
                        },
                        {
                            data: "apellido_paterno"
                        },
                        {
                            data: "apellido_materno"
                        },
                        {
                            data: "nombre"
                        },
                        {
                            data: "calle"
                        },
                        {
                            data: "colonia"
                        },
                        {
                            data: "alcaldia"
                        },
                        {
                            data: "cp"
                        },
                        {
                            data: "option"
                        }
                    ]
                });
            } else {
                $("#table-prov").DataTable({
                    destroy: true
                });
            }
        });
    }

    function reg_prov(){
        
        $('#form_prov').submit(function (e) { 
            e.preventDefault();
            var data = $(this).serialize();
            var $form = $( this ),
            url = $form.attr( 'action' );
            console.log(url);
            
            console.log(data);
            $.post(url, data);
            load_panel_proveedor2();

            // $.ajax({
            //     type: "post",
            //     url: url,
            //     data: data,
            //     dataType: 'json',
            //     success: function(responseData, textStatus, jqXHR) {
            //         alert("data saved");
            //     },
            //     error: function(jqXHR, textStatus, errorThrown) {
                    
            //         console.log(errorThrown);
            //     }
            // });
        });
    }

    // function load_panel_usuarios() {
    //     $(".active").removeClass("active");
    //     $(this).addClass("active");
    //     $(".title-head").text("POLARIS - Usuarios");
    //     $(".titulo-h1").text("Usuarios");
    //     $(".main-panel").load("core/view/usuarios.html", function () {
    //         usuarios = get_usuarios_all();
    //         usuarios_temp = usuarios;
    //         usuarios = [];
    //         usuarios_temp.forEach(usuario => {
    //             //usuario.rol = (usuario.rol == null ? "sin rol asignado" : usuario.rol.replace(/,/g, '<br>'));
    //             usuario.equipo = (usuario.equipo == null ? "sin equipo" : usuario.equipo.replace(/,/g, '<br>'));
    //             usuario.options = "<button class='btn-ver-usuario btn btn-success btn-block' id=" + usuario.usuario_id + ">ver perfil</button>";
    //             usuarios.push(usuario);
    //         });
    //         usuarios_temp = [];
    //         $("#table-usuarios").DataTable({
    //             paging: false,
    //             info: false,
    //             scrollX: true,
    //             data: usuarios,
    //             columns: [
    //                 { data: 'usuario' },
    //                 { data: 'nombre' },
    //                 { data: 'apellidos' },
    //                 { data: 'equipo' },
    //                 { data: 'rol' },
    //                 { data: 'options' }
    //             ]
    //         });
    //     });
    // }

    // function load_tabla(id_tabla, tabla, id_objeto, objetos, opciones) {
    //     add_options(objetos, id_objeto, opciones);
    //     tabla.data = objetos;
    //     return $(id_tabla).DataTable(tabla);
    // }

    // function load_modal_registro_usuario() {
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-registro-usuario",
    //             id_modal: "#modal-registro-usuario",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/registro_usuario.html",
    //             title: "Registrar nuevo usuario"
    //         }
    //     };
    //     load_modal(modal_options, function () { });
    // }

    // function set_usuario() {
    //     if (get_value_input(".txt-usuario-password") == get_value_input(".txt-usuario-password")) {
    //         data = {
    //             email: get_value_input(".txt-usuario-email"),
    //             nombre: get_value_input(".txt-usuario-nombre"),
    //             apellidos: get_value_input(".txt-usuario-apellidos"),
    //             contraseña: get_value_input(".txt-usuario-password")
    //         }
    //         res = ajax_request("core/controller/set_usuario.php", "POST", data);
    //         if (res.resultado == true) {
    //             alert("Exito en el registro del usuario");
    //             $("#modal-registro-usuario").modal('toggle');
    //         } else {
    //             alert("Error en el registro del usuario");
    //         }
    //     } else {
    //         alert("Las contraseñas no coinciden");
    //         return false;
    //     }
    // }

    // function get_aparatos_all() {
    //     return ajax_request("core/controller/get_aparatos_all.php", "GET", {});
    // }

    // function get_aparato(aparato_id) {
    //     return ajax_request("core/controller/get_aparato.php", "GET", {aparato_id:aparato_id});
    // }

    // function load_modal_registro_viaje() {
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-registro-viaje",
    //             id_modal: "#modal-registro-viaje",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/registro_viaje.html",
    //             title: "Registrar nuevo viaje"
    //         }
    //     };
    //     load_modal(modal_options, function () {
    //         aparatos = get_aparatos_all();
    //         add_options(aparatos, 'APARATO_ID', ["<button class='btn btn-sm btn-info btn-set-viaje' id=0 type='button'>Seleccionar</button>"]);
    //         $("#table-aparato-viaje").DataTable({
    //             destroy: true,
    //             data: aparatos,
    //             columns: [
    //                 { data: 'NUMERO_MATRICULA' },
    //                 { data: 'CODIGO_ACCESO' },
    //                 { data: 'CAPACIDAD' },
    //                 { data: 'PORCENTAJE_CARGA' },
    //                 { data: 'NOMBRE' },
    //                 { data: 'options' }
    //             ]
    //         });
    //     });
    // }

    // function load_modal_registro_aparato_viaje() {
    //     aparato_id = $(this).attr('id');
    //     aparato = get_aparato(aparato_id);
    //     if(aparato.CLAVE != 'ENSP'){
    //         alert("Este aparato no puede realizar viajes");
    //         return;
    //     }
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-registro-aparato-viaje",
    //             id_modal: "#modal-registro-aparato-viaje",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/registro_aparato_viaje.html",
    //             title: "Registrar datos de viaje"
    //         }
    //     };

    //     load_modal(modal_options, function () {
    //         date_picker_load(["#datetimepicker1"]);
    //         set_options_date_picker(["#datetimepicker1"]);
    //         set_text_tag(".h4-matricula",aparato.NUMERO_MATRICULA);
    //         set_text_tag(".h4-carga",aparato.PORCENTAJE_CARGA+"%");
    //         set_id_tag(".btn-set-viaje-commit",aparato_id);
    //     });
    // }

    // function load_modal_registro_aparato_renta() {
    //     aparato_id = $(this).attr('id');
    //     aparato = get_aparato(aparato_id);
    //     if(aparato.CLAVE != 'ENSP'){
    //         alert("Este aparato no puede ser rentado");
    //         return;
    //     }
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-registro-aparato-renta",
    //             id_modal: "#modal-registro-aparato-renta",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/registro_aparato_renta.html",
    //             title: "Registrar datos de renta"
    //         }
    //     };
    //     load_modal(modal_options, function () {
    //         set_text_tag(".h4-matricula",aparato.NUMERO_MATRICULA);
    //         set_id_tag(".btn-set-renta-commit",aparato_id);
    //     });
    // }

    // function set_viaje() {
    //     data = {
    //         usuario_id: sessionStorage.getItem("id"),
    //         fin: get_value_input(".viaje-fin"),
    //         aparato_id: get_id_tag(this)
    //     };
    //     res = ajax_request("core/controller/set_servicio_viaje_usuario.php", "POST", data);
    //     if (res.resultado == true) {
    //         alert("Exito en el registro del viaje");
    //         $("#modal-registro-aparato-viaje").modal('toggle');
    //         $("#modal-registro-viaje").modal('toggle');
    //         load_panel_servicios();
    //     } else {
    //         alert("Error en el registro del viaje");
    //     }
    // }

    // function set_renta() {
    //     data = {
    //         usuario_id: sessionStorage.getItem("id"),
    //         dias_custodio: get_value_input(".renta-dias-custodio"),
    //         direccion: get_value_input(".renta-direccion"),
    //         aparato_id: get_id_tag(this)
    //     };
    //     res = ajax_request("core/controller/set_servicio_renta_usuario.php", "POST", data);
    //     if (res.resultado == true) {
    //         alert("Exito en el registro de la renta");
    //         $("#modal-registro-aparato-renta").modal('toggle');
    //         $("#modal-registro-renta").modal('toggle');
    //         load_panel_servicios();
    //     } else {
    //         alert("Error en el registro de la renta");
    //     }
    // }

    // function get_servicio_renta_id(servicio_id){
    //     return ajax_request("core/controller/get_servicio_renta_id.php","GET",{servicio_id:servicio_id});
    // }

    // function get_servicio_viaje_id(servicio_id){
    //     return ajax_request("core/controller/get_servicio_viaje_id.php","GET",{servicio_id:servicio_id});
    // }

    // function load_modal_detalle_renta(){
    //     servicio_id = get_id_tag(this);
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-detalle-renta",
    //             id_modal: "#modal-detalle-renta",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/detalle_renta.html",
    //             title: "Detalle renta"
    //         }
    //     };

    //     load_modal(modal_options, function () {
    //         servicio = get_servicio_renta_id(servicio_id);
    //         console.log(servicio);
    //         $("#table-detalle-renta").DataTable({
    //             destroy: true,
    //             paging: false,
    //             info: false,
    //             searching: false,
    //             responsive: true,
    //             data: servicio,
    //             columns: [
    //                 { data: 'NUMERO_MATRICULA' },
    //                 { data: 'NOMBRE' },
    //                 { data: 'INICIO' },
    //                 { data: 'DIAS_CUSTODIO' },
    //                 { data: 'DIRECCION' },
    //                 { data: 'ESTADO' }
    //             ]
    //         });
    //         set_id_tag(".btn-terminar-renta",servicio_id);
    //         if(servicio[0].ESTADO != "EN SERVICIO RENTA"){
    //             $(".btn-terminar-renta").hide();
    //         }
    //     });
    // }

    // function load_modal_detalle_viaje(){
    //     servicio_id = get_id_tag(this);
    //     console.log("viaje");
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-detalle-viaje",
    //             id_modal: "#modal-detalle-viaje",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/detalle_viaje.html",
    //             title: "Detalle viaje"
    //         }
    //     };

    //     load_modal(modal_options, function () {
    //         servicio = get_servicio_viaje_id(servicio_id);
    //         console.log(servicio);
    //         $("#table-detalle-viaje").DataTable({
    //             destroy: true,
    //             paging: false,
    //             info: false,
    //             searching: false,
    //             responsive: true,
    //             data: servicio,
    //             columns: [
    //                 { data: 'NUMERO_MATRICULA' },
    //                 { data: 'NOMBRE' },
    //                 { data: 'INICIO' },
    //                 { data: 'FIN' },
    //                 { data: 'FOLIO' },
    //                 { data: 'ESTADO' }
    //             ]
    //         });
    //         set_id_tag(".btn-terminar-viaje",servicio_id);
    //         if(servicio[0].ESTADO != "EN SERVICIO VIAJE"){
    //             $(".btn-terminar-viaje").hide();
    //         }
    //     });
    // }
    // function load_modal_registro_renta() {
    //     modal_options = {
    //         tags: {
    //             div_modal: ".modal-container-registro-renta",
    //             id_modal: "#modal-registro-renta",
    //             title: ".modal-title"
    //         },
    //         data: {
    //             view_modal: "core/view/registro_renta.html",
    //             title: "Rentar aparato"
    //         }
    //     };
    //     load_modal(modal_options, function () {
    //         aparatos = get_aparatos_all();
    //         add_options(aparatos, 'APARATO_ID', ["<button class='btn btn-sm btn-info btn-set-renta' id=0 type='button'>Seleccionar</button>"]);
    //         $("#table-aparato-renta").DataTable({
    //             destroy: true,
    //             data: aparatos,
    //             columns: [
    //                 { data: 'NUMERO_MATRICULA' },
    //                 { data: 'CODIGO_ACCESO' },
    //                 { data: 'CAPACIDAD' },
    //                 { data: 'PORCENTAJE_CARGA' },
    //                 { data: 'NOMBRE' },
    //                 { data: 'options' }
    //             ]
    //         });
    //     });
    // }

    // function terminar_viaje(){
    //     servicio_id = get_id_tag(this);
    //     res = ajax_request("core/controller/terminar_servicio.php","POST",{servicio_id:servicio_id,tipo:'V'});
    //     if (res.resultado == true) {
    //         alert("Viaje terminado");
    //         $("#modal-detalle-viaje").modal('toggle');
    //         load_panel_servicios();
    //     } else {
    //         alert("Error en terminar viaje");
    //     }
    // }

    // function terminar_renta(){
    //     servicio_id = get_id_tag(this);
    //     res = ajax_request("core/controller/terminar_servicio.php","POST",{servicio_id:servicio_id,tipo:'R'});
    //     if (res.resultado == true) {
    //         alert("Renta terminada");
    //         $("#modal-detalle-renta").modal('toggle');
    //         load_panel_servicios();
    //     } else {
    //         alert("Error en terminar renta");
    //     }
    // }

    // function cerrar_sesion() {
    //     ajax_request("core/controller/cerrar_sesion.php", "GET", {});
    //     sessionStorage.clear();
    //     alert("Sesion cerrada");
    //     location.href = "index.php";
    // }
    function eliminar_merca(){
        $.post("core/controller/del_merca.php", {"prov_id": this.id});
        load_panel_proveedor2();
    }

    function update_merca_stock(id, stock)
    {
	$.post("core/controller/update_merca_stock.php",
	       {"merc_id": this.id_mercancia,
		"stock": this.stock_});
    }


    function load_panel_mercancia() {
        set_active_class(this);
        $(".title-head").text("Inventario - Mercancia");
        $(".titulo-h1").text("Mercancia");
        $(".main-panel").load("core/view/mercancia.html", function () {
            //usuario_id = sessionStorage.getItem("id");
            //servicios_renta = get_servicios_renta_usuario(usuario_id);
            provs = get_mercancia();
            prov= [];
            provs.forEach(element => {
                element.option = "<button class='btn-del-mercancia btn btn-success btn-block' id=" + element.id_mercancia + ">Eliminar</button><br><button class='btn-mod-mercancia btn btn-secondary btn-block' id=" + element.id_mercancia + ">Modificar</button>";
                prov.push(element);
            });

            console.log(prov);
            if (prov != []) {
                $("#table-merca").DataTable({
                    destroy: true,
                    data: prov,
                    columns: [
                        {
                            data: "clave_sucursal"
                        },
                        {
                            data: "nombre_sucursal"
                        },
                        {
                            data: "id_mercancia"
                        },
                        {
                            data: "nombre_mercancia"
                        },
                        {
                            data: "stock"
                        },
                        {
                            data: "precio"
                        },
                        {
                            data: "descripcion"
                        },
                        {
                            data: "option"
                        }
                    ]
                });
            } else {
                $("#table-merca").DataTable({
                    destroy: true
                });
            }
        });
    }

    function load_panel_sucursal(){
	set_active_class(this);
        $(".title-head").text("Inventario -Sucursal");
        $(".titulo-h1").text("Sucursal");
        $(".main-panel").load("core/view/sucursal.html", function () {
            //usuario_id = sessionStorage.getItem("id");
            //servicios_renta = get_servicios_renta_usuario(usuario_id);
            provs = get_sucursal();
            prov= []
            provs.forEach(element => {
                element.option = "<button class='btn-del-suc btn btn-success btn-block' id=" + element.sucursal_id + ">Eliminar</button>"
                prov.push(element);
            });

            console.log(prov);
            if (prov != []) {
                $("#table-suc").DataTable({
                    destroy: true,
                    data: prov,
                    columns: [
                        {
                            data: "sucursal_id"
                        },
                        {
                            data: "nombre_sucursal"
                        },
                        {
                            data: "clave_sucursal"
                        },
                        {
                            data: "numero_sucursal"
                        },
                        {
                            data: "calle"
                        },
                        {
                            data: "colonia"
                        },
                        {
                            data: "alcaldia"
                        },
                        {
                            data: "cp"
                        },
                        {
                            data: "option"
                        }
                    ]
                });
            } else {
                $("#table-suc").DataTable({
                    destroy: true
                });
            }
        });
    }
    function eliminar_suc(){
        $.post("core/controller/del_suc.php", {"sucursal_id": this.id});
        load_panel_sucursal();
    }
    function reg_suc(){
        
        $('#form_suc').submit(function (e) { 
            e.preventDefault();
            var data = $(this).serialize();
            var $form = $( this ),
            url = $form.attr( 'action' );
            console.log(url);
            
            console.log(data);
            $.post(url, data);
            load_panel_sucursal();
        });
    }
    // $("#wrapper").on("click", ".btn-index", index);
    $("#wrapper").on("click", ".btn-proveedores", load_panel_proveedor2);
    $("#wrapper").on("click", ".btn-registro-proveedor", reg_prov);
    $("#wrapper").on("click", ".btn-mercancia", load_panel_mercancia);
    $("#wrapper").on("click", ".btn-del-prov", eliminar_prov);
    $("#wrapper").on("click", ".btn-sucursal", load_panel_sucursal);
    $("#wrapper").on("click", ".btn-del-suc", eliminar_suc);
    $("#wrapper").on("click", ".btn-registro-sucursal", reg_suc);
    // $(".main-panel").on("click", ".btn-iniciar-sesion", iniciar_sesion);
    // $("#wrapper").on("click", ".btn-logout", cerrar_sesion);
    // $("#wrapper").on("click", ".btn-registro-usuario", load_modal_registro_usuario);
    // $("#wrapper").on("click", ".btn-set-usuario", set_usuario);
    // $("#wrapper").on("click", ".btn-registro-viaje", load_modal_registro_viaje);
    // $("#wrapper").on("click", ".btn-registro-renta", load_modal_registro_renta);
    // $("#wrapper").on("click", ".btn-set-renta", load_modal_registro_aparato_renta);
    // $("#wrapper").on("click", ".btn-set-viaje", load_modal_registro_aparato_viaje);
    // $("#wrapper").on("click", ".btn-set-viaje-commit", set_viaje);
    // $("#wrapper").on("click", ".btn-set-renta-commit", set_renta);
    // $("#wrapper").on("click", ".btn-modal-detalle-renta", load_modal_detalle_renta);
    // $("#wrapper").on("click", ".btn-modal-detalle-viaje", load_modal_detalle_viaje);
    // $("#wrapper").on("click", ".btn-terminar-viaje", terminar_viaje);
    // $("#wrapper").on("click", ".btn-terminar-renta", terminar_renta);
});
