const express = require('express');

const app = express();

app.get('/', (req: any, res:any) => {
    res.json({status: "working"})
})

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
