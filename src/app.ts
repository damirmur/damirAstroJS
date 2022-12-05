import express from 'express';
import { horoEph } from './lib/swephdata';

const app = express();
const jsonParser = express.json();
app.set("view engine", "ejs");
const publicDir = (process.cwd() + "/public");
app.use(express.static(publicDir));

app.get('/', async (request, response) => {
    response.render("index", {
        title: "Home"
    });
});
app.get('/blogs', async (request, response) => {
    response.render("blogs", {
        title: "Blog"
    });
});
app.get('/workbook', async (request, response) => {
    response.render("workbook", {
        title: "Workbook"
    });
});
app.get('/charts', async (request, response) => {
    response.render("charts", {
        title: "Forms"
    });
});
app.use("/contact", async (request, response) => {
    response.render("contact", {
        title: "MyContacts",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    });
});
app.post('/', jsonParser, async (request, response) => {
    let chart=request.body;
    response.json(horoEph(chart));
});
    app.post('/api');
const port = 3000;
app.listen(port, (): void => {
    console.log(`App is listening at http://localhost:${port}`)
})