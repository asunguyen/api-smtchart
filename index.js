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
const tradingViewRouter = require("./routers/tradingViewRouter");
const bolocCophieuRouter = require("./routers/bolocCophieuRouter");
const fs = require("fs");

const { createServer } = require('node:https');
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
app.use("/v1/data", tradingViewRouter)
app.use("/v1/license", licenseRouter);
app.use("/v1/vimo", vimoRouter);
app.use("/v1/boloc", bolocCophieuRouter);

//router client
app.set("view engine", "ejs");
app.set("views", "./views");

//





const dbUrl = process.env.mongodbUrl;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const server = createServer({
    key: fs.readFileSync(path.join(__dirname, "/public", "apichartkey.key") ),
    cert: fs.readFileSync(path.join(__dirname, "/public", "apichart.pem") ),
}, app);
const io = new Server(server);



// trading view api
const TradingView = require("@mathieuc/tradingview");
let totalOnline = 0;
server.listen(5001, () => {
    mongoose.connect(dbUrl, connectionParams).then(() => {
        console.log("connect db success");
        io.on('connection', (socket) => {
            console.log("client:: ", socket.id);
            totalOnline++;
            console.log("connection + 1, totalOnline:: ", totalOnline);
            let client = new TradingView.Client(); // Creates a websocket client

            let chart = new client.Session.Chart(); // Init a Chart session
            chart.setTimezone('Asia/Ho_Chi_Minh');
            chart.setMarket("VNINDEX", {
                timeframe: "1",
                range: 20
            });
            chart.onError((...err) => { // Listen for errors (can avoid crash)
                console.error('Chart error changeSymbol:', ...err);
            });

            chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
                console.log(`Market "${chart.infos.description}" loaded !`);
            });

            chart.onUpdate(() => { // When price changes
                try {
                    if (!chart || !chart.periods[0]) return;
                    console.log("chart index update:: ", chart.infos.description);
                    let data = chart.periods;
                    data[0].symbol = chart.infos.name;
                    if (chart.infos.depay) {
                        data[0].time = data[0].time + chart.infos.depay;
                    }
                    socket.emit("onData", { chart: data[0], infos: chart.infos });
                } catch (err) {
                    console.log("update error:: ", err);
                }

            });
            socket.on("changeSymbol", (data) => {
                try {
                    console.log("changeSymbol:: ", data.symbolInfo.name);
                    let resol = "1";
                    if (data.symbolInfo.resolution.search("D") >= 0) {
                        resol = "D"
                    }
                    if (data.symbolInfo.resolution.search("W") >= 0) {
                        resol = "W"
                    }
                    if (data.symbolInfo.resolution.search("M") >= 0) {
                        resol = "M"
                    }
                    const toDate = new Date().getTime();
                    if (data.symbolInfo.type == "forex") {
                        chart.setMarket(data.symbolInfo.name, {
                            timeframe: resol,
                            to: toDate * 1000,
                            range: 5000
                        });
                    } else {
                        chart.setMarket(data.symbolInfo.exchange + ":" + data.symbolInfo.name, {
                            timeframe: resol,
                            to: toDate * 1000,
                            range: 5000
                        });
                    }
                } catch (err) {
                    console.log("changeSymbol error:: ", err);
                }

            })
            socket.on("disconnect", () => {
                totalOnline--;
                console.log("disconnect - 1, totalOnline:: ", totalOnline);
                client.end();
            });
        });
    }).catch((e) => {
        console.log("connect db error:: ", e);
    })
})

