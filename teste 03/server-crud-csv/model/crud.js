import { db } from "../controller/crud.js"

export async function removeData(req, res) {
    let registroANS = req.body["Registro ANS"];
    db.delete({ "Registro ANS": registroANS }).then((data) => {
        res.send(data);
    });
}

export async function editData(req, res) {
    let bodyData = req.body;
    let registroANS = req.body["Registro ANS"];
    await db.edit({ "Registro ANS": registroANS }, bodyData).then((data) => {
        res.json(data)
    });
}

export async function addData(req, res) {
    let bodyData = req.body;
    delete bodyData["action"];
    await db.add(bodyData).then((data) => {
        res.json(data)
    });
}

export async function listData(req, res) {
    let registroANS = req.body["Registro ANS"];
    var getData = await db.get({ "Registro ANS": registroANS });
    res.send(getData)
}
