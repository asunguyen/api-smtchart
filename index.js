const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const publicRouter = require("./routers/public");
const licenseRouter = require("./routers/licensekeyRouter");
const vimoRouter = require("./routers/vimoRouter");

const { createServer } = require('node:http');
const { Server } = require('socket.io');

dotenv.config();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//file tĩnh
app.use("/public", express.static(path.join(__dirname, "/public")));
//router api

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/chart", publicRouter);
app.use("/v1/license", licenseRouter);
app.use("/v1/vimo", vimoRouter);

//router client
app.set("view engine", "ejs");
app.set("views", "./views");

//





const dbUrl = process.env.mongodbUrl;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const server = createServer(app);
const io = new Server(server);



// trading view api
const TradingView = require("@mathieuc/tradingview");
const { symbols } = require('./controllers/chartController');




server.listen(5001, () => {
    mongoose.connect(dbUrl, connectionParams).then(() => {
        console.log("connect db success");
        io.on('connection', (socket) => {

            const client = new TradingView.Client(); // Creates a websocket client

            const chart = new client.Session.Chart(); // Init a Chart session
            let getHistory = false;
            let infoSymbol;
            socket.on("stopGetHistory", () => {
                getHistory = false;
            })
            chart.setMarket("SSI", { // Set the market
                timeframe: "D",
                range: 30
            });

            chart.onError((...err) => { // Listen for errors (can avoid crash)
                console.error('Chart error:', ...err);
                // Do something...
            });

            chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
                console.log(`Market "${chart.infos.description}" loaded !`);
            });

            chart.onUpdate(() => { // When price changes
                if (!chart.periods[0]) return;
                infoSymbol = chart.infos;
                if (getHistory) {
                    getHistory = false;
                    let dataChart = [];
                    for(var i = 0; i < chart.periods.length; i++) {
                        chart.periods[i].symbol = chart.infos.name;
                        chart.periods[i].time = chart.periods[i].time + chart.infos.depay;
                        dataChart.push(chart.periods[i]);
                    }
                    socket.emit("resHistorySymbol", { chart: dataChart, infos: chart.infos });
                } else {
                    // Do something...
                    chart.periods[0].symbol = chart.infos.name;
                    chart.periods[0].time = chart.periods[0].time + chart.infos.depay;
                    socket.emit("onData", { chart: chart.periods[0], infos: chart.infos });
                }
                

            });
            socket.on("searchSymbol",(symbolName) => {
                TradingView.searchMarket(symbolName).then((rs) => {
                    socket.emit("resSearchSymbol", rs);
                });
            });
            socket.on("activeDataHistory", (symbolName) => {
                //socket.emit("", infoSymbol);
            })
            socket.on("getHistorySymbol", (qrsearch) => {
                if (qrsearch.getHistory) {
                    getHistory = true;
                }
                const ranged = parseInt((qrsearch.to - qrsearch.from)/60);
                chart.setMarket(qrsearch.symbol, {
                    timeframe: '1',
                    range: ranged, // Can be positive to get before or negative to get after
                    to: qrsearch.to,
                    from: qrsearch.from
                  });
            })
        });
    }).catch((e) => {
        console.log("connect db error:: ", e);
    })
})

