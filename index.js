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
        const chequeLedger = client.db('myAccounts').collection('chequeLedger');
        const categories = client.db('myAccounts').collection('categories');
        const subCategories = client.db('myAccounts').collection('subcategories');
        const banks = client.db('myAccounts').collection('banks');
        const bankAccounts = client.db('myAccounts').collection('bankAccounts');

        console.log('Mongo server connected');

        /**
         * Daily Ledger Start
        */

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

        app.post('/categories', async (req, res) => {
            const category= req.body;
            const result = await categories.insertOne(category);
            res.send(result);
        })
        app.delete('/categories/:id', async (req, res) => {
            const id= req.params.id;
            const filter={_id: ObjectId(id)}
            const result = await categories.deleteOne(filter);
            res.send(result);
        })

        app.get('/subcategories', async (req, res) => {
            const result = await subCategories.find().toArray();
            res.send(result);
        });

        app.post('/subcategories', async (req, res) => {
            const subcategory= req.body;
            const result = await subCategories.insertOne(subcategory);
            res.send(result);
        })
        app.delete('/subcategories/:id', async (req, res) => {
            const id= req.params.id;
            const filter={_id: ObjectId(id)}
            const result = await subCategories.deleteOne(filter);
            res.send(result);
        })
        app.get('/accounts', async (req, res) => {
            const result = await bankAccounts.find().toArray();
            res.send(result);
        });

        app.post('/accounts', async (req, res) => {
            const account= req.body;
            const result = await bankAccounts.insertOne(account);
            res.send(result);
        })
        app.delete('/accounts/:id', async (req, res) => {
            const id= req.params.id;
            const filter={_id: ObjectId(id)}
            const result = await bankAccounts.deleteOne(filter);
            res.send(result);
        })
        app.get('/banks', async (req, res) => {
            const result = await banks.find().toArray();
            res.send(result);
        });

        app.post('/banks', async (req, res) => {
            const bank= req.body;
            const result = await banks.insertOne(bank);
            res.send(result);
        })
        app.delete('/banks/:id', async (req, res) => {
            const id= req.params.id;
            const filter={_id: ObjectId(id)}
            const result = await banks.deleteOne(filter);
            res.send(result);
        })

        app.get('/todayledger', async (req, res) => {
            const date = req.query.date;
            const filter = { date: date }
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);

        })

        /**
            * Daily Ledger End
           */

        /**
            * Cheque Ledger Start
           */

        // Add A Cheque

         app.post('/chequeledger', async (req, res) => {
            const newCheque = req.body;
            const result = await chequeLedger.insertOne(newCheque);
            res.send(result)
        });

        // Read A Cheque

         app.get('/chequeledger', async (req, res) => {
            const result = await chequeLedger.find().toArray();
            res.send(result);
        });

        // Update a Cheque

        app.put('/chequeledger/:id', async (req, res) => {
            const id = req.params.id;
            const cheque = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: cheque
            }
            const updateCheque = await chequeLedger.updateOne(filter, updateDoc, options);
            console.log('para working');
            res.send(updateCheque);
        })

        // delete a cheque
        
        app.delete('/chequeledger/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cheque = await chequeLedger.deleteOne(query);
            console.log('para working');
            res.send(cheque);
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