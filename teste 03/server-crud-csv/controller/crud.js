import { editData, removeData, addData } from "../model/crud.js";

import csvdb from "csv-database";

const csvFile = "database/relatorio.csv";

export const db = await csvdb(csvFile,
    ["Registro ANS", "CNPJ", "Razão Social",
        "Nome Fantasia", "Modalidade", "Logradouro",
        "Número", "Complemento", "Bairro",
        "Cidade", "UF", "CEP", "DDD",
        "Telefone", "Fax", "Endereço eletrônico",
        "Representante", "Cargo Representante",
        "Data Registro ANS"]);

export function callCrud(req, res) {
    let reqType = req.body["action"];
    switch (reqType) {
        case "edit":
            editData(req, res);
            break
        case "delete":
            removeData(req, res);
            break
        case "add":
            addData(req, res);
            break
        case "restore":
            console.log(req.body);
            break
    }
} 