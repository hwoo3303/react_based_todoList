const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

// MySQL 설정
const db = mysql.createPool({
    host: "management-todolist.cqnxjfav3yfx.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "admin3303",
    port: "3306",
    database: "management",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT TODO_ID\
                            , TODO_TEXT\
                            , TODO_STATUS\
                            , TODO_USE_YN\
                         FROM TB_TODO_LIST";
    db.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

// Create
app.post("/api/insert", (req, res) => {
    const todoText = req.body.todoText;
    console.log("dsadsa");
    const sqlInsert = "INSERT INTO TB_TODO_LIST (TODO_TEXT, TODO_STATUS, TODO_USE_YN) VALUES (?,1,1)";
    db.query(sqlInsert, [todoText], (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

// Delete
app.delete('/api/delete/:todoID', (req, res) => {
    const todoID = req.params.todoID;
    const sqlDelete = "DELETE FROM TB_TODO_LIST WHERE TODO_ID = ?";

    db.query(sqlDelete, todoID, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

// Update
app.put('/api/update', (req, res) => {
    const modTodoText = req.body.modTodoText;
    const todoID = req.body.todoTextId;
    const sqlUpdate = "UPDATE TB_TODO_LIST SET TODO_TEXT = ? WHERE TODO_ID = ?";

    db.query(sqlUpdate, [modTodoText, todoID], (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

// server start시 log 출력
app.listen(3001, () => {
    console.log('running on port 3001');
});
