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




server.listen(5001, () => {
    mongoose.connect(dbUrl, connectionParams).then(() => {
        console.log("connect db success");
        io.on('connection', (socket) => {

            const client = new TradingView.Client(); // Creates a websocket client

            const chart = new client.Session.Chart(); // Init a Chart session

            
            chart.onError((...err) => { // Listen for errors (can avoid crash)
                console.error('Chart error:', ...err);
                // Do something...
            });

            chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
                console.log(`Market "${chart.infos.description}" loaded !`);
            });

            chart.onUpdate(() => { // When price changes
                if (!chart.periods[0]) return;
                // Do something...
                if(chart.periods.length > 2) {
                    socket.emit("rsBar", {chart: chart.periods, infos: chart.infos})
                } else {
                    chart.periods[0].symbol = chart.infos.name;
                    chart.periods[0].time = chart.periods[0].time + chart.periods[0].depay;
                    socket.emit("onData", {chart: chart.periods[0], infos: chart.infos});
                }
                
            });


            socket.on("searchMarket", (qrsearch) => {
                try{
                    TradingView.searchMarket(qrsearch).then((rs) => {
                        socket.emit("searchrs", rs);
                    })
                }catch(err) {
                    console.log(err);
                }
               
            })

            socket.on("addsymbol", (symbol) => {
                chart.setMarket(symbol.symbol, { // Set the market
                    timeframe: symbol.resolution,
                });
    
            })
            socket.on("getBar", (qrsearch) => {
                try{
                    let range = parseInt((qrsearch.to - qrsearch.from)/60);
                    chart.setMarket(qrsearch.symbol.name, {
                        timeframe: `${qrsearch.resolution}`,
                        to: qrsearch.to,
                        from: qrsearch.from,
                        range: range
                    })
                }catch(err) {
                    console.log("err get bar:: ", err);
                }
            })
        });
    }).catch((e) => {
        console.log("connect db error:: ", e);
    })
})

