<template lang="pt-BR">
    <div id="popup-new-data">
        <form id="form-new-data" v-on:submit.prevent="onSubmit">
          <h2>
            Novo Registro
          </h2>
          <hr>
          <h5>
            Dados de Registro
          </h5>
          <hr>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <input type="hidden" name="action" value="add"/>
              <label for="">Registro ANS</label>
              <input type="number" class="form-control" name="Registro ANS" id="RegistroANS" aria-describedby="emailHelp" placeholder="Registro ANS" required>
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="">CNPJ</label>
              <input type="number" class="form-control" name="CNPJ" aria-describedby="emailHelp" placeholder="CNPJ">
            </div>
            </div>
          </div>
          <div class="row">
            
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Razão Social</label>
              <input type="text" class="form-control" name="Razão Social" placeholder="Razão Social">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Nome Fantasia</label>
              <input type="text" class="form-control" name="Nome Fantasia" placeholder="Nome Fantasia">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Modalidade</label>
              <input type="text" class="form-control" name="Modalidade" placeholder="Modalidade">
            </div>
            </div>
          </div>
          <hr>
          <h5>
            Endereço
          </h5>
          <hr>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Logradouro</label>
              <input type="text" class="form-control" name="Logradouro" placeholder="Logradouro">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Número</label>
              <input type="text" class="form-control" name="Número" placeholder="Número">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Complemento</label>
              <input type="text" class="form-control" name="Complemento" placeholder="Complemento">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Bairro</label>
              <input type="text" class="form-control" name="Bairro" placeholder="Bairro">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Cidade</label>
              <input type="text" class="form-control" name="Cidade" placeholder="Cidade">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">UF</label>
              <input type="text" class="form-control" name="UF" placeholder="UF">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">CEP</label>
              <input type="text" class="form-control" name="CEP" placeholder="CEP">
            </div>
            </div>
          </div>
          <hr>
          <h5>
            Contato
          </h5>
          <hr>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">DDD</label>
              <input type="text" class="form-control" name="DDD" placeholder="DDD">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Telefone</label>
              <input type="text" class="form-control" name="Telefone" placeholder="Telefone">
            </div>
            </div>
          </div>
          <div class="row">
            
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Fax</label>
              <input type="text" class="form-control" name="Fax" placeholder="Fax">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Endereço eletrônico</label>
              <input type="text" class="form-control" name="Endereço eletrônico" placeholder="Endereço eletrônico">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Representante</label>
              <input type="text" class="form-control" name="Representante" placeholder="Representante">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Cargo Representante</label>
              <input type="text" class="form-control" name="Cargo Representante" placeholder="Cargo Representante">
            </div>
            </div>
            <div class="col">
              <div class="form-group">
              <label for="exampleInputPassword1">Data Registro ANS</label>
              <input type="text" class="form-control" name="Data Registro ANS" placeholder="Data Registro ANS">
            </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
               <button type="submit" class="btn btn-primary" v-on:click="sendData">Enviar</button>
            </div>
            <div class="col">
            </div>
          </div>
</form>
    </div>
</template>
<script>
const $ = require("jquery");
window.jQuery = $;
export default {
  name: "Insert-Form",
  data() {
    return {};
  },
  mounted() {
    this.formSubmit;
  },
  methods: {
    sendData: function () {
      var registroANS = $("#RegistroANS").val();
      if (!registroANS) {
        console.log("não inserido");
      } else {
        var orig = $("#form-new-data").serialize();
        var withoutEmpties = orig.replace(/[^&]+=\.?(?:&|$)/g, "");
        $.ajax({
          type: "post",
          url: "http://localhost:3000/crud",
          data: withoutEmpties,
          success: function () {
            location.reload();
          },
        });
      }
    },
    formSubmit: function () {
      $("#form-new-data").submit(function (e) {
        e.preventDefault();
      });
    },
  },
};
</script>
<style scope>
#popup-new-data {
  background-color: rgba(0, 0, 0, 0.438);
  display: none;
  position: absolute;
  width: 100vw;
  height: 200vh;
  z-index: 999;
  top: 0;
  left: 0;
}
#form-new-data {
  width: 700px;
  display: block;
  margin: auto;
  background-color: white;
  padding: 10px;
}
.form-group label {
}
</style>