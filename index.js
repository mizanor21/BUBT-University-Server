const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://bubt-university:pFULJBAgL7SQ3gJ1@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const NoticeCollection = client.db("bubtDB").collection("notice");

    app.get("/notice-general", async (req, res) => {
      const query = { category: "general" };
      const options = {
        sort: { noticeId: -1 },
        projection: { title: true, noticeId: true, createdAt: true },
      };
      const cursor = NoticeCollection.find(query, options);
      const notice = await cursor.limit(5).toArray();
      res.send(notice);
    });

    app.get("/notice-exam", async (req, res) => {
      const query = { category: "exam" };
      const options = {
        sort: { noticeId: -1 },
        projection: { title: true, noticeId: true, createdAt: true },
      };
      const cursor = NoticeCollection.find(query, options);
      const notice = await cursor.limit(5).toArray();
      res.send(notice);
    });

    app.get("/notice-class", async (req, res) => {
      const query = { category: "class" };
      const options = {
        sort: { noticeId: -1 },
        projection: { title: true, noticeId: true, createdAt: true },
      };
      const cursor = NoticeCollection.find(query, options);
      const notice = await cursor.limit(5).toArray();
      res.send(notice);
    });

    app.get("/notice-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const notice = await NoticeCollection.findOne(query);
      res.send(notice);
    });

    // Move app.listen here
    app.listen(port, () => {
      console.log(`Simple node server running on port ${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);
