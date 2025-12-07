// route/update.js
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 編集用ののフォーム表示
router.get("/", function (req, res, next) {
  res.render("update");
});

//フォーム提出後の処理
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.update({
      where: { id: Number(req.body.id) },
      data: {
        name: req.body.name,
        StudentNum: Number(req.body.studentNum),
        Grade: Number(req.body.grade),
      },
    });
    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student");
  }
});

module.exports = router;
