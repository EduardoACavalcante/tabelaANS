<template lang="pt-BR">
<div class="container mt-100">
  <InsertForm/>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    
                    <div>
                        <h5 id="table-title">{{title}}</h5>
                        <input type="text" id="search-input" placeholder="Pesquisar">
                    </div>
                </div>
                <div class="card-advice">
                    <button type="button" id="button" v-on:click.native="toggleAddForm">+</button>
                    <span>Clique na célula para editar e pressione <b>enter</b> para salvar</span>
                </div>
                <div class="card-block">
                    
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered" id="table-registro-ans">
                                <thead>
                                    <tr>
                                    <th>Registro ANS</th>
                                    <th>CNPJ</th>
                                    <th>Razão Social</th>
                                    <th>Nome Fantasia</th>
                                    <th>Modalidade</th>
                                    <th>Logradouro</th>
                                    <th>Número</th>
                                    <th>Complemento</th>
                                    <th>Bairro</th>
                                    <th>Cidade</th>
                                    <th>UF</th>
                                    <th>CEP</th>
                                    <th>DDD</th>
                                    <th>Telefone</th>
                                    <th>Fax</th>
                                    <th>Endereço eletrônico</th>
                                    <th>Representante</th>
                                    <th>Cargo Representante</th>
                                    <th>Data Registro ANS</th>
                                    </tr>
                                </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import InsertForm from "../add-data/InsertForm.vue";
const $ = require("jquery");
window.jQuery = $;

const Papa = require("papaparse");
window.Papa = Papa;

const Tabledit = require("jquery-tabledit");
window.Tabledit = Tabledit;

const DataTable = require("datatables");
window.DataTable = DataTable;

export default {
  name: "ANS-Table",

  data() {
    return {
      title: "",
    };
  },
  created() {
    this.getCSVData();
    this.closeAddForm();
  },
  components: {
    InsertForm,
  },
  methods: {
    // Recupera dados do CSV
    getCSVData: function () {
      Papa.parse("/relatorio.csv", {
        download: true,
        config: {
          delimiter: "", // auto-detect
          newline: "", // auto-detect
          quoteChar: '"',
          escapeChar: '"',
          header: true,
          transformHeader: undefined,
          dynamicTyping: false,
          preview: 0,
          encoding: "UTF-8",
          worker: false,
          comments: false,
          step: undefined,
          complete: undefined,
          error: undefined,
          download: false,
          downloadRequestHeaders: undefined,
          downloadRequestBody: undefined,
          skipEmptyLines: false,
          chunk: undefined,
          chunkSize: undefined,
          fastMode: undefined,
          beforeFirstChunk: undefined,
          withCredentials: undefined,
          transform: undefined,
          delimitersToGuess: [
            ",",
            "\t",
            "|",
            ";",
            Papa.RECORD_SEP,
            Papa.UNIT_SEP,
          ],
        },
        complete: (data) => {
          //Define titulo da tabela
          this.title = data.data[0].join(", ");
          //Chama função de insersão de dados
          this.listData(data.data);
        },
      });
    },
    // Lista dados na tabela
    listData: function (data) {
      // Remove titulo e header
      data.splice(0, 2);
      //Instância nova tabela
      var oTable = $("#table-registro-ans").DataTable({
        responsive: true,
        bLengthChange: false,
        processing: true,
        order: [[0, "asc"]],
        language: {
          decimal: "",
          emptyTable: "Sem resultados disponíveis",
          info: "Mostrando _START_ / _END_ de _TOTAL_ registros",
          infoEmpty: "Mostranto 0 / 0 de 0 registros",
          infoFiltered: "(filtrado de _MAX_ registros)",
          infoPostFix: "",
          thousands: ".",
          lengthMenu: "Exibir _MENU_ registros",
          loadingRecords: "Carregando...",
          processing: "",
          search: "Pesquisar:",
          zeroRecords: "Sem resultados encontrados",
          paginate: {
            first: "First",
            last: "Último",
            next: "Próximo",
            previous: "Anterior",
          },
          aria: {
            sortAscending: ": ativar para ordenar column crescente",
            sortDescending: ": activate to sort column decrescente",
          },
          sDom: "t",
        },
        initComplete: () => {
          // Habilita edições de dados na tabela
          this.enableEdition();
          // Ao carregar novos dados na tabela, reexecuta a função enableEdition, habilitando edições em dados
          $("tbody").bind("DOMSubtreeModified", () => {
            setTimeout(() => {
              if ($("tbody tr:last").children().length == 19) {
                this.enableEdition();
              }
            }, 2000);
          });
        },
      });
      oTable.rows.add(data).draw();
      // Ao identificar insersão de texto na caixa de pesquisa, chama-se função de pesquisa de DataTable
      $("#search-input").keyup(function () {
        oTable.search($(this).val()).draw();
      });
    },
    // Habilita edições nos dados da tabela
    enableEdition: function () {
      $("#table-registro-ans").Tabledit({
        url: "http://localhost:3000/crud",
        editButton: false,
        deleteButton: true,
        restoreButton: false,
        //hideIdentifier: true,
        columns: {
          identifier: [0, "Registro ANS"],
          editable: [
            [1, "CNPJ"],
            [2, "Razão Social"],
            [3, "Nome Fantasia"],
            [4, "Modalidade"],
            [5, "Logradouro"],
            [6, "Número"],
            [7, "Complemento"],
            [8, "Bairro"],
            [9, "Cidade"],
            [10, "UF"],
            [11, "CEP"],
            [12, "DDD"],
            [13, "Telefone"],
            [14, "Fax"],
            [15, "Endereço eletrônico"],
            [16, "Representante"],
            [17, "Cargo Representante"],
            [18, "Data Registro ANS"],
          ],
        },
        buttons: {
          edit: {
            class: "btn btn-sm btn-default",
            html: '<span class="glyphicon glyphicon-trash">EDITAR</span>',
            action: "edit",
          },
          delete: {
            class: "btn btn-sm btn-default",
            html: '<span class="glyphicon glyphicon-trash">DELETAR</span>',
            action: "delete",
          },
        },
        onSuccess: function (data) {
          console.log(data);
        },
      });
    },
    toggleAddForm: function () {
      $(document).ready(function () {
        $("#popup-new-data").toggle();
      });
    },
    closeAddForm: function () {
      $(document).on("click", function (e) {
        var wasVisible = $("#elementXX").is(":visible");
        if (!wasVisible) {
          if ($(e.target).closest("#form-new-data").length === 0) {
            $("#popup-new-data").hide();
          }
        }
      });
    },
  },
};
</script>
<style scoped>
@import "https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css";
/*Desabilita filtros gerados automaticamente */
.container >>> .dataTables_filter {
  display: none;
}
.container >>> .card-advice {
  float: right;
  margin: 10px 0;
  text-align: end;
}
.container >>> .card-advice button {
  float: left;
  border-style: none;
  background-color: #4381bd;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.container >>> .card-header {
  padding: 1.75rem 1.25rem;
  background-color: white;
}
#search-input {
  float: right;
}
#table-title {
  float: left;
}
</style>