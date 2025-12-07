var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TOPページ：一覧＋投稿フォーム
router.get("/", async (req, res) => {
  const blogs = await prisma.blog.findMany({
    orderBy: { id: "desc" },
  });
  res.render("index", { blogs: blogs });
});

// 新規投稿
router.post("/", async (req, res) => {
  const { title, date, content } = req.body;

  await prisma.blog.create({
    data: {
      title: title,
      date: new Date(date),
      content: content,
    },
  });

  res.redirect("/");
});

// 検索（POSTのみ）
router.post("/search", async (req, res) => {
  const keyword = req.body.keyword;

  const results = await prisma.blog.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
      ],
    },
  });

  res.render("search", { keyword: keyword, results: results });
});

module.exports = router;
