const { MongoClient, ServerApiVersion } = require("mongodb");
import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());

const uri =
  "mongodb+srv://arimAbdul:3AxkwAuenHSu1KoV@cluster0.g7lvcea.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const serviceCollection = client.db("Event360").collection("services");
    app.get("/services", async (req: Request, res: Response) => {
      const result = await serviceCollection.find().toArray();
      console.log(result);
      res.json(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
