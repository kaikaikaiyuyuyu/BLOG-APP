//route/create.js
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 新規作成用のフォーム表示
router.get("/", function (req, res, next) {
  res.render("create");
});

// フォーム表示提出後の処理
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.create({
      data: {
        id: Number(req.body.id),
        name: req.body.name,
        StudentNum: Number(req.body.StudentNum),
        Grade: Number(req.body.Grade),
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
});

module.exports = router;