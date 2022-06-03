import express from "express";
import { callCrud } from "../controller/crud.js";
import { provideCSVLink } from "../controller/provide-csv-link.js";

var router = express.Router();

router.post('/crud', function (req, res) {
    callCrud(req, res);
});

router.get('/csv-file', function (req, res) {
    provideCSVLink(req, res);
})

export { router };