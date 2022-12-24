var express = require('express');
const groupsRouter  = require('./routes/groupRoutes');
const app = express();


app.get('/', (req: any, res:any) => {
    res.json({status: "working"})
})

app.use(groupsRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
