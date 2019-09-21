const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/speak/:animal', (req, res) => {
    const animal = req.params.animal.toLowerCase();
    const sounds = {
        pig: "oink",
        cow: "mooo",
        dog: "woof woof",
        cat: "i hate you human",
        goldfish: "..."
    }
    let sound = sounds[animal]
    res.send(`${animal}'s sound is ${sound}`)
});

app.get("/repeat/:message/:times", (req, res) => {
    const message = req.params.message;
    const times = Number(req.params.times);
    let result = '';
    for (let i = 0; i < times; i++) {
       result += message 
    };
    res.send(result);
})

app.get("*", (req, res) => {
    res.send("no page here")
} )

app.listen(3030, () => {
    console.log("3030 listen")
})