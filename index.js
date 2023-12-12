const {ethers}=require("ethers");
const express=require("express");
require("dotenv").config();
const app=express();
app.use(express.json());
const INFURA_ID=process.env.POLYGON_MUMBAI;
const provider=new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/ed3fb7fbaa6d4deb9e8cdd64c07efc48');
const account1='0xC7C8fef4724ECC194F4b8Fb1dEe1719F4e2C409c';
const privatekey=process.env.PRIVATE_KEY;
const wallet=new ethers.Wallet(privatekey,provider);
const ERC20_ABI=[
    "function createDisease(string memory,string memory ,string memory ,string memory,string memory)public returns(uint256)",
    {
      "inputs": [],
      "name": "getDiseases",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "causes",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "effects",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symptoms",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "remedies",
              "type": "string"
            }
          ],
          "internalType": "struct Greeting.Disease[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
    
];

const address='0x54fb138d5fE2d7D6B1A9ddAcbDC920Ea6f751133';
const contract=new ethers.Contract(address,ERC20_ABI,provider)
const contractWithWallet=contract.connect(wallet);
app.get('/test',(req,res)=>{
           res.json('test ok');
})
app.post('/createdisease',async(req,res)=>{
   const{name,causes,effects,symptoms,remedies}=req.body;
   try{
          const doc=await contractWithWallet.createDisease(name,causes,effects,symptoms,remedies);
          const tx=await doc.wait();
          res.json(tx);
   }
   catch(e){
        res.json(e);
   }
})
app.get('/alldiseases',async(req,res)=>{
  try {
    const results = await contractWithWallet.getDiseases();
     const jsonResults = results.map(result => ({
            name: result[0],
            causes: result[1],
            effects: result[2], 
             symptoms: result[3],
             remedies:result[4]
        }));

        res.json(jsonResults);


} catch (error) {
if (error.reason) {
       res.send(`Revert Reason: ${error.reason}`);
} else {
    res.json(error);
}
}      
})
app.get('/alldiseases/search', async (req, res) => {
  try {
      const requestedRemedies = req.query.remedies; 

      if (!requestedRemedies) {
          return res.status(400).json({ error: 'Remedies parameter is required' });
      }

      const results = await contractWithWallet.getDiseases();
      const jsonResults = results
          .filter(result => result.remedies.includes(requestedRemedies))
          .map(result => ({
              name: result[0],
              causes: result[1],
              effects: result[2],
              symptoms: result[3],
              remedies: result[4]
          }));

      res.json(jsonResults);
  } catch (error) {
      if (error.reason) {
          res.status(500).json({ error: `Revert Reason: ${error.reason}` });
      } else {
          res.status(500).json({ error: error.message });
      }
  }
});
app.get('/alldiseases/searchs', async (req, res) => {
  try {
      const requestedSymptoms = req.query.symptoms; // Assuming symptoms are provided as a comma-separated string

      if (!requestedSymptoms) {
          return res.status(400).json({ error: 'Symptoms parameter is required' });
      }

      const results = await contractWithWallet.getDiseases();
      const jsonResults = results
          .filter(result => result.symptoms.includes(requestedSymptoms))
          .map(result => ({
              name: result[0],
              causes: result[1],
              effects: result[2],
              symptoms: result[3],
              remedies: result[4]
          }));

      res.json(jsonResults);
  } catch (error) {
      if (error.reason) {
          res.status(500).json({ error: `Revert Reason: ${error.reason}` });
      } else {
          res.status(500).json({ error: error.message });
      }
  }
});
app.get('/alldiseases/searchn', async (req, res) => {
  try {
      const requestedName = req.query.name; 

      if (!requestedName) {
          return res.status(400).json({ error: 'Name parameter is required' });
      }

      const results = await contractWithWallet.getDiseases();
      const jsonResults = results
          .filter(result => result.name.includes(requestedName))
          .map(result => ({
              name: result[0],
              causes: result[1],
              effects: result[2],
              symptoms: result[3],
              remedies: result[4]
          }));

      res.json(jsonResults);
  } catch (error) {
      if (error.reason) {
          res.status(500).json({ error: `Revert Reason: ${error.reason}` });
      } else {
          res.status(500).json({ error: error.message });
      }
  }
});


app.listen(4000);
