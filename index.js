const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('halo dek')
})

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

const mhsrouter = require("./routes/ktp.js");
app.use("/api/ktp", mhsrouter);

const kkrouter = require("./routes/kk.js");
app.use("/api/kk", kkrouter);

const detailrouter = require("./routes/detail.js");
app.use("/api/detail", detailrouter);

app.listen(port, () => {
    console.log(`http:://localhost:${port}`)
})

