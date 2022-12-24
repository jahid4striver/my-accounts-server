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
        const finalDailyLedger = client.db('myAccounts').collection('finalledger');
        const chequeLedger = client.db('myAccounts').collection('chequeLedger');
        const cashLedger = client.db('myAccounts').collection('cashLedger');
        const categories = client.db('myAccounts').collection('categories');
        const subCategories = client.db('myAccounts').collection('subcategories');
        const banks = client.db('myAccounts').collection('banks');
        const bankAccounts = client.db('myAccounts').collection('bankAccounts');
        const loanAccounts = client.db('myAccounts').collection('loanAccounts');
        const loanAccountsGiven = client.db('myAccounts').collection('loanAccountsGiven');
        const advanceSalary = client.db('myAccounts').collection('advanceSalary');
        const handCash = client.db('myAccounts').collection('handCash');
        const bankDeposits = client.db('myAccounts').collection('bankDeposits');
        const profitAccounts = client.db('myAccounts').collection('profitAccounts');

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
        app.post('/deposits', async (req, res) => {
            const newLedger = req.body;
            console.log('Adding New Ledger', newLedger);
            const result = await bankDeposits.insertOne(newLedger);
            res.send(result)
        });

        // get with id

        app.delete('/deposits/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const ledger = await bankDeposits.deleteOne(query);
            console.log('para working');
            res.send(ledger);
        })
        // get with id

        app.put('/deposits/:id', async (req, res) => {
            const id = req.params.id;
            const expense = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: expense
            }
            const updatedLedger = await bankDeposits.updateOne(filter, updateDoc, options);
            console.log('para working');
            res.send(updatedLedger);
        })

        // get the item from db

        app.get('/deposits', async (req, res) => {
            const result = await bankDeposits.find().toArray();
            res.send(result);
        })

        app.get('/filteredexpense', async (req, res) => {
            const category = req.query.category;
            const subcategory = req.query.subcategory;
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const filter = { category: category, subcategory: subcategory, date: { $gte: startDate, $lte: endDate } }
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);
        })

        app.get('/categories', async (req, res) => {
            const result = await categories.find().toArray();
            res.send(result);
        })

        app.post('/categories', async (req, res) => {
            const category = req.body; 
            const result = await categories.insertOne(category);
            res.send(result);
        })
        app.delete('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await categories.deleteOne(filter);
            res.send(result);
        })

        app.get('/subcategories', async (req, res) => {
            const result = await subCategories.find().toArray();
            res.send(result);
        });

        app.post('/subcategories', async (req, res) => {
            const subcategory = req.body;
            const result = await subCategories.insertOne(subcategory);
            res.send(result);
        })
        app.delete('/subcategories/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await subCategories.deleteOne(filter);
            res.send(result);
        })
        app.get('/accounts', async (req, res) => {
            const result = await bankAccounts.find().toArray();
            res.send(result);
        });

        app.post('/accounts', async (req, res) => {
            const account = req.body;
            const result = await bankAccounts.insertOne(account);
            res.send(result);
        })
        app.delete('/accounts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await bankAccounts.deleteOne(filter);
            res.send(result);
        })
        app.get('/banks', async (req, res) => {
            const result = await banks.find().toArray();
            res.send(result);
        });

        app.post('/banks', async (req, res) => {
            const bank = req.body;
            const result = await banks.insertOne(bank);
            res.send(result);
        })
        app.delete('/banks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await banks.deleteOne(filter);
            res.send(result);
        })
        app.get('/profitAccounts', async (req, res) => {
            const result = await profitAccounts.find().toArray();
            res.send(result);
        });

        app.post('/profitAccounts', async (req, res) => {
            const bank = req.body;
            const result = await profitAccounts.insertOne(bank);
            res.send(result);
        })
        app.delete('/profitAccounts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await profitAccounts.deleteOne(filter);
            res.send(result);
        })

        app.get('/loanaccounts', async (req, res) => {
            const result = await loanAccounts.find().toArray();
            res.send(result);
        });

        app.post('/loanaccounts', async (req, res) => {
            const loan = req.body;
            const result = await loanAccounts.insertOne(loan);
            res.send(result);
        })
        app.delete('/loanaccounts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await loanAccounts.deleteOne(filter);
            res.send(result);
        })
        app.get('/loanaccountsgiven', async (req, res) => {
            const result = await loanAccountsGiven.find().toArray();
            res.send(result);
        });

        app.post('/loanaccountsgiven', async (req, res) => {
            const loan = req.body;
            const result = await loanAccountsGiven.insertOne(loan);
            res.send(result);
        })
        app.delete('/loanaccountsgiven/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await loanAccountsGiven.deleteOne(filter);
            res.send(result);
        })
        app.get('/advancesalary', async (req, res) => {
            const result = await advanceSalary.find().toArray();
            res.send(result);
        });

        app.post('/advancesalary', async (req, res) => {
            const loan = req.body;
            const result = await advanceSalary.insertOne(loan);
            res.send(result);
        })
        app.delete('/advancesalary/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await advanceSalary.deleteOne(filter);
            res.send(result);
        })


        app.get('/loangivenreturnreport', async (req, res) => {
            const expense = req.query.expense;
            const filter = { expense: expense};
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);
        })
        app.get('/loanreturnreport', async (req, res) => {
            const result = await cashLedger.find().toArray();
            res.send(result);

        })

        app.get('/todayledger', async (req, res) => {
            const date = req.query.date;
            const filter = { date: date }
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);

        })
        app.get('/onlyexpense', async (req, res) => {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const filter = { date: { $gte: startDate, $lte: endDate } }
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);

        })
        app.get('/onlyincome', async (req, res) => {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const filter = { date: { $gte: startDate, $lte: endDate } }
            const result = await cashLedger.find(filter).toArray();
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

        // Cash Section Start

        app.post('/dailycash', async (req, res) => {
            const newCash = req.body;
            const result = await cashLedger.insertOne(newCash);
            res.send(result)
        });
        app.get('/`dailycash`', async (req, res) => {
            const result = await cashLedger.find().toArray();
            res.send(result)
        });

        app.get('/todaycash', async (req, res) => {
            const date = req.query.date;
            const filter = { date: date }
            const result = await cashLedger.find(filter).toArray();
            res.send(result);

        })


        app.delete('/dailycash/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const ledger = await cashLedger.deleteOne(query);
            res.send(ledger);
        })
        // get with id

        app.put('/dailycash/:id', async (req, res) => {
            const id = req.params.id;
            const cash = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: cash
            }
            const updatedCash = await cashLedger.updateOne(filter, updateDoc, options);
            res.send(updatedCash);
        })

        // Hand Cash Calculations

        app.put('/handcash', async (req, res) => {
            const cash = req.body;
            const date = req.query.date;
            const filter = { date: date };
            const options = { upsert: true }
            const updateDoc = {
                $set: cash
            }
            const result = await handCash.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.get('/yesterdaycash', async (req, res) => {
            const date = req.query.date;
            const filter = { date: date }
            const result = await handCash.findOne(filter);
            res.send(result);

        });

        // cash and income 

        app.get('/categorywiseexpense', async (req, res) => {
            const category = req.query.category;
            const subcategory = req.query.subcategory;
            const filter = { category: category, subcategory: subcategory };
            const result = await dailyLedger.find(filter).toArray();
            res.send(result);
        })


        // app.get('/expenseamount', async (req, res) => {
        //     const category = req.query.category;
        //     const subcategory = req.query.subcategory;
        //     const filter = { category: category, subcategory: subcategory }
        //     const result = await dailyLedger.find(filter).toArray();
        //     res.send(result);
        // })
        app.get('/incomeamount', async (req, res) => {
            const chequecategory = req.query.chequecategory;
            const chequesubcategory = req.query.chequesubcategory;
            const filter = { chequecategory: chequecategory, chequesubcategory: chequesubcategory }
            const result = await chequeLedger.find(filter).toArray();
            res.send(result);
        })


        app.get('/filteredcheques', async (req, res) => {
            const chequecategory = req.query.chequecategory;
            const chequesubcategory = req.query.chequesubcategory;
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const filter = { chequecategory: chequecategory, chequesubcategory: chequesubcategory, chequedate: { $gte: startDate, $lte: endDate } }
            const result = await chequeLedger.find(filter).toArray();
            res.send(result);
        });

        app.get('/myexpenses', async(req, res)=>{
            const category= req.query.category;
            const subcategory= req.query.subcategory;
            const filter= {category: category, subcategory:subcategory};
            const result= await dailyLedger.find(filter).toArray();
            res.send(result);
        })
        app.get('/ownerexpenses', async(req, res)=>{
            const category= req.query.category;
            const filter= {category: category};
            const result= await dailyLedger.find(filter).toArray();
            res.send(result);
        })

        app.put('/finalexpense/:id', async(req, res)=>{
            const id= req.params.id;
            const data= req.body;
            const filter={_id: ObjectId(id)}
            const options= {upsert: true}
            const updateDoc={
                $set:data,
            }
            const result= await dailyLedger.updateOne(filter, updateDoc, options);
            res.send(result);

        })

        app.get('/accountsbalance', async(req,res)=>{
            const account= req.query.account;
            const filter= {account: account};
            const result= await cashLedger.find(filter).toArray();
            res.send(result)
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