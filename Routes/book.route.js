const express = require("express");
const bookRouter = express.Router();
const { bookModel } = require("../Models/book.model");

bookRouter.post("/books", async (req, res) => {
  try {
    const data = new bookModel(req.body);
    await data.save();
    res.status(202).send({ msg: "books added" });
  } catch (error) {
    console.log({ error: error });
    res.status(500).send({ msg: error });
  }
});

bookRouter.get("/books", async (req, res) => {
  try {
    let bookData = await bookModel.find();
    res.status(200).send(bookData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: error });
  }
});

bookRouter.get("/books/:id", async (req, res) => {
  try {
    let bookData = await bookModel.findById(req.params.id);

    if (!bookData) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res.status(200).send(bookData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

bookRouter.delete("/books/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let bookData = await bookModel.findByIdAndDelete(id);

    if (!bookData) {
      return res.status(404).send({ msg: "Book not found" });
    }

    res.status(202).send({ msg: "Book has been deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

bookRouter.patch("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const bookData = await bookModel.findByIdAndUpdate(id, updateData);

    if (!bookData) {
      console.log("Book not found");
      return res.status(404).send({ msg: "Book not found" });
    }

    console.log("Book updated successfully");
    return res
      .status(200)
      .send({ msg: "Book with particular id has been updated" });
  } catch (error) {
    console.log("Error updating book:", error.message);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).send({ msg: "Invalid ID format" });
    }

    return res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = {
  bookRouter,
};
