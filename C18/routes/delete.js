var express = require("express");
var router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// 削除用フォームを表示
router.get("/", function (req, res, next) {
  res.render("delete");
});

// 1件だけ削除
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.delete({
      where: { id: Number(req.body.id) },
    });
    res.status(204).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting student");
  }
});

// ⭐ 全件削除用ルート (/delete/all)
router.get("/all", async function (req, res, next) {
  try {
    await prisma.student.deleteMany({});
    res.send("全データを削除しました！");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting all students");
  }
});

module.exports = router;
