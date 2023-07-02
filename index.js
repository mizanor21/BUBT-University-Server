const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://bubtUniversity:WzDM8iLo8TMkHTtR@cluster0.disah5t.mongodb.net/bubtDB?retryWrites=true&w=majority";

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
    const EventCollection = client.db("bubtDB").collection("event");
    const Department = client.db("bubtDB").collection("department");
    const Alumni = client.db("bubtDB").collection("alumni");
    const FacultyCollection = client.db("bubtDB").collection("faculty");

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

    app.get("/events", async (req, res) => {
      const query = {};
      const options = {
        sort: { eventId: -1 },
        projection: {
          title: true,
          eventId: true,
          eventDate: true,
          eventTime: true,
          img: true,
          createdAt: true,
        },
      };
      const cursor = EventCollection.find(query, options);
      const events = await cursor.limit(5).toArray();
      res.send(events);
    });

    app.get("/event-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const event = await EventCollection.findOne(query);
      res.send(event);
    });

    app.get("/department", async (req, res) => {
      const query = {};
      const cursor = Department.find(query);
      const department = await cursor.toArray();
      res.send(department);
    });
    app.get("/alumni", async (req, res) => {
      const query = {};
      const options = {
        sort: { embedId: 1 },
      };
      const cursor = Alumni.find(query, options);
      const alumni = await cursor.limit(4).toArray();
      res.send(alumni);
    });

    app.get("/all-stories", async (req, res) => {
      const query = {};
      const options = {
        sort: { embedId: 1 },
      };
      const cursor = Alumni.find(query, options);
      const alumni = await cursor.toArray();
      res.send(alumni);
    });

    app.get("/faculty", async (req, res) => {
      const query = {};
      const options = {
        sort: { facultyId: -1 },
        projection: {
          img: true,
          name: true,
          position: true,
          department: true,
          facultyCode: true,
        },
      };
      const cursor = FacultyCollection.find(query, options);
      const faculty = await cursor.toArray();
      res.send(faculty);
    });
    // Move app.listen here
    app.listen(port, () => {
      console.log(`Simple node server running on port ${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);
