const express = require('express');
const cors = require('cors')
const axios = require('axios');
const path = require('path')



const app = express();
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, "../frontend/public")));
// Step 2:



// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

  
app.listen(PORT, function(){
    console.log("Server is running on port "+ PORT)
    
});




app.post('/api/parse', async (req, res) => {
    console.log(req.body)

    const string = req.body.input
    let obj;
    try{
         obj = {parsed: JSON.parse(string), msg: 'Parsed successfully'};
    }catch(err){
         obj = {parsed: string, msg: err.message}
    }
    

  try {
    res.json({status: 'ok',
                parsed: obj.parsed,
                msg: obj.msg})
  } catch (err) {
    res.json({status: 'err', error: 'Failed'})
    
  }
  
})



app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});