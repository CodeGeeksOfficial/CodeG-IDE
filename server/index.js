const express = require('express');
const executeCpp = require('./executeCPP');
const generateFile = require('./generateFile');

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/run',async(req,res)=>{
    let language = req.body.language || "cpp" 
    let code = req.body.code

    //TODO: throw error when language not received

    if (code === undefined){
        return res.status(400).json({language:language, error: "Code not received"});
    }

    try{
        const filename = await generateFile(language,code)
        const output = await executeCpp(filename)
        return res.json({filename, output});
    } catch(err){
        res.status(500).json({err})
    }
});

app.listen(5000, ()=>{
    console.log(`Listening on port ${PORT}`);
});