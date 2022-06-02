const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://nbcAc:WeyNZddR07jMnJO9@cluster0.10zxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const dailyLedger = client.db('myAccounts').collection('dailyledger');
        const categories = client.db('myAccounts').collection('categories');
        const subCategories = client.db('myAccounts').collection('subcategories');

        console.log('Mongo server connected');

        // post a item

        app.post('/dailyledger', async (req, res) => {
            const newLedger = req.body;
            console.log('Adding New Ledger', newLedger);
            const result = await dailyLedger.insertOne(newLedger);
            res.send(result)
        });

        // get with id

        app.delete('/dailyledger/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const ledger = await dailyLedger.deleteOne(query);
            console.log('para working');
            res.send(ledger);
        })
        // get with id

        app.put('/dailyledger/:id', async (req, res) => {
            const id = req.params.id;
            const expense = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: expense
            }
            const updatedLedger = await dailyLedger.updateOne(filter, updateDoc, options);
            console.log('para working');
            res.send(updatedLedger);
        })

        // get the item from db

        app.get('/dailyledger', async (req, res) => {
            const cursor = dailyLedger.find();
            const ledgers = await cursor.toArray();
            res.send(ledgers);
        })

        app.get('/categories', async (req, res) => {
            const result = await categories.find().toArray();
            res.send(result);
        })
        app.get('/subcategories', async (req, res) => {
            const result = await subCategories.find().toArray();
            res.send(result);
        });

        app.get('/todayledger', async (req, res) => {
            const date = req.query.date;
            const filter = { date: date }
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);

        })


    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Accounts Server is Running')
});


app.listen(port, () => {
    console.log('listening to port', port);
})


// nbcAc
// WeyNZddR07jMnJO9