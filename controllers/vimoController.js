const axios = require('axios');
const vimoController = {
    marketTotal: async (req, res) => {
        try {
            const time = req.query.time || "1D";
            const url = `https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:VNINDEX,HNX,UPCOM,VN30,VN30F1M~period:${time}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    topTen: async (req, res) => {
        try {
            const index = req.query.index || "VNIndex";
            const sort = req.query.sort || "priceChgPctCr1D";
            const url = `https://finfo-api.vndirect.com.vn/v4/top_stocks?q=index:${index}~nmVolumeAvgCr20D:gte:10000~priceChgPctCr1D:gt:0&size=10&sort=${sort}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dinhGia: async (req, res) => {
        try {
            const index = req.query.index || "VNINDEX";
            const dateReport = req.query.reportDate || "2022-12-31"
            const historyUrl = `https://finfo-api.vndirect.com.vn/v4/ratios/latest?order=reportDate&where=code:${index}~reportDate:lte:${dateReport}&filter=itemCode:81007,81008,81013,81014,81016,81017,82005,82006,82007,82008,81001,81002,81004,81005`
            const resHist = await axios.get(historyUrl);
            const nowUrl = `https://finfo-api.vndirect.com.vn/v4/ratios/latest?order=reportDate&where=code:${index}&filter=itemCode:81007,81008,81013,81014,81016,81017,82005,82006,82007,82008,81001,81002,81004,81005`
            const resNow = await axios.get(nowUrl);
            res.json({ code: 200, data: resNow.data.data, dataHistory: resHist.data.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    doRongThiTruong: async (req, res) => {
        try {
            const index = req.query.index || "VNINDEX";
            const url = `https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/gainerslosers?index=${index}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    newsNewUpdatePaging: async (req, res) => {
        try {
            const item = req.body.item;
            const row = req.body.row;
            const response = await axios.post("https://vietstock.vn/_Partials/NewsNewUpdatePaging", { item: item, row: row });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    reportdatabydisplay: async (req, res) => {
        try {
            console.log(1);
            const response = await fetch("https://finance.vietstock.vn/data/reportdatabydisplay", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "language=vi-VN; Theme=Light; AnonymousNotification=; ASP.NET_SessionId=vi43mf31yzc502kd44p3zwsj; __RequestVerificationToken=LEFBzpdwG2XSDMXApa3ihyzll-iMHzkkSTj5CNcTm2W3BkYz2a6r30SDrYsjFOgDCptJO0xS9-udgl1u8DbfCKHwP8EN5Wgzr4SPoap2JVY1; _gid=GA1.2.550632622.1699990809; _ga_EXMM0DKVEX=GS1.1.1699990808.5.1.1699991019.59.0.0; _ga=GA1.2.1632635605.1697998948; _gat_UA-1460625-2=1",
                    "Referer": "https://finance.vietstock.vn/du-lieu-vi-mo",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "type=true&__RequestVerificationToken=-Pv-9cKy9pW70oyMtxfvIOLd2hQOfEjDzuQq94zixGkg86z0P-boFFPaSRFF32nXPJLMv3NAGyYI8XeA_cgxQ4yiQqiFfdlQXijccwE2erM1",
                "method": "POST"
            });
            console.log("response:: ", response)
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    getHtml: async (req, res) => {
        try {
            const url = req.query.url;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data })
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    getDataCafef: async (req, res) => {
        try {
            const url = "https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/0/20231119/15?symbol=VNINDEX";
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    tcttTheGioi: async (req, res) => {
        try {
            const type = req.query.type || "";
            const url = "https://s.cafef.vn/ajax/mobile/smart/ajaxchisothegioi.ashx?type=" + type;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    tcttVietNam: async (req, res) => {
        try {
            const typeChart = req.query.typeChart || "";
            const index = req.query.index || "1;2;9;11;12";
            const type = req.query.type || "market";
            const floorCode = req.query.floorCode || "1";
            if (typeChart && typeChart.length > 0) {
                const urlTime = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxChartDataCenter.ashx?floorCode=${floorCode}&typeChart=${typeChart}`;
                const responseTime = await axios.get(urlTime);
                res.json({ code: 200, data: responseTime.data.Data });
            } else {
                const url = `https://s.cafef.vn/Ajax/PageNew/RealtimeChartHeader.ashx?index=${index}&type=${type}`;
                const response = await axios.get(url);
                res.json({ code: 200, data: response.data });
            }
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    top10CoPhieu: async (req, res) => {
        try {
            const centerID = req.query.centerID || "HOSE";
            const type = req.query.type || "UP";
            const url = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxTop10CP.ashx?centerID=${centerID}&type=${type}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dinhGiaIndex: async (req, res) => {
        try {
            const url = `https://s.cafef.vn/Ajax/PageNew/FinanceData/GetDataChartPE.ashx`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    khoiNgoai: async (req, res) => {
        try {
            const type = req.query.type || "buy";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxkhoingoai.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    nhomDanDatThiTruong: async (req, res) => {
        try {
            const centerId = req.query.centerId || 1;
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/MarketLeaderGroup?centerId=${centerId}&take=10`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    top10TruyCap: async (req, res) => {
        try {
            const TypeGA = req.query.TypeGA || 7;
            const url = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxTop10TraCuu.ashx?TypeGA=${TypeGA}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dienBienGiaoDichKhoiNgoai: async (req, res) => {
        try {
            const dataDate = new Date();
            const time = dataDate.getFullYear() + "" + (dataDate.getMonth() + 1) + "" + dataDate.getDate();
            const symbol = req.query.symbol || "VNINDEX";
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/0/${time}/15?symbol=${symbol}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    thanhKhoanThiTruong: async (req, res) => {
        try {
            const symbol = req.query.symbol || "HOSE"
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/Liquidity/${symbol}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dataHangHoa: async (req, res) => {
        try {
            const type = req.query.type || 1;
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxhanghoa.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    giaodichTuDoanh: async (req, res) => {
        try {
            const symbol = req.query.symbol || "VNINDEX";
            const dataDate = new Date();
            const time = dataDate.getFullYear() + "" + (dataDate.getMonth() + 1) + "" + dataDate.getDate();
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?Symbol=${symbol}&StartDate=&EndDate=&PageIndex=1&PageSize=20`;
            const response = await axios.get(url);
            const urlOver = `https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/1/${time}/20?symbol=${symbol}`
            const responseOver = await axios.get(urlOver);
            const dataRes = {
                priceHistory: response.data.Data,
                overView: responseOver.data
            }
            res.json({ code: 200, data: dataRes });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    topTuDoanh: async (req, res) => {
        try {
            const type = req.query.type || "BUYVALUE";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxgiaodichtudoanh.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    fDoRongThiTruong: async (req, res) => {
        try {
            const centerID = req.query.centerID || "HOSE";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxdorongthitruong.ashx?centerID=${centerID}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    bandoThitruong: async (req, res) => {
        try {
            const type = req.query.type || 1;
            const category = req.query.category || 0;
            const centerId = req.query.centerId || 1;
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxbandothitruong.ashx?type=${type}&category=${category}&centerId=${centerId}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    thitruongNgoaiHoi: async (req, res) => {
        try {
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxtygia.ashx`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data.Data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuTKDatLenh: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const PageIndex = req.query.PageIndex || 1;
            const PageSize = req.query.PageSize || 20;
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/ThongKeDL.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}&PageIndex=${PageIndex}&PageSize=${PageSize}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuGia: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const PageIndex = req.query.PageIndex || 1;
            const PageSize = req.query.PageSize || 20;
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}&PageIndex=${PageIndex}&PageSize=${PageSize}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuKhoiNgoai: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const PageIndex = req.query.PageIndex || 1;
            const PageSize = req.query.PageSize || 20;
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/GDKhoiNgoai.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}&PageIndex=${PageIndex}&PageSize=${PageSize}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuTuDoanh: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const PageIndex = req.query.PageIndex || 1;
            const PageSize = req.query.PageSize || 20;
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/GDTuDoanh.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}&PageIndex=${PageIndex}&PageSize=${PageSize}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuTheoPhien: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuDienBienTheoPhien: async (req, res) => {
        try {
            const symbol = req.query.symbol || "VNINDEX";
            const dateQR = req.query.date || "";
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/MatchPrice?symbol=${symbol}&date=${dateQR}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dlLichSuCoDongNoiBo: async (req, res) => {
        try {
            const symbol = req.query.Symbol || "VNINDEX";
            const StartDate = req.query.StartDate || "";
            const EndDate = req.query.EndDate || "";
            const PageIndex = req.query.PageIndex || 1;
            const PageSize = req.query.PageSize || 20;
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/GDCoDong.ashx?Symbol=${symbol}&StartDate=${StartDate}&EndDate=${EndDate}&PageIndex=${PageIndex}&PageSize=${PageSize}`;
            const response = await axios.get(url);
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    //mục lấy về
    tintucMoiCapNhat: async (req, res) => {
        try {
            const response = await axios.post("https://vietstock.vn/_Partials/NewsNewUpdatePaging", { "item": 15, "row": 1 });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dulieuVimo: async (req, res) => {
        try {
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/reportdatabydisplay",
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
                data: "type=true&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1"
            });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    dulieuTiGia: async (req, res) => {
        try {
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/getdatabynormid",
                data: {normID: 156, __RequestVerificationToken: "hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1"},
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    thongKeGia: async(req, res) => {
        try {
            const catID = req.query.catID || 1;
            const dateDt = req.query.date;
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 20;
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/KQGDThongKeGiaPaging",
                data: `page=${page}&pageSize=${pageSize}&catID=${catID}&date=${dateDt}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            });
            res.json({ code: 200, data: response.data });
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    thongkegia2: async(req, res) => {
        try {  
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 20;
            const catID = req.query.catID;
            const stockID = req.query.stockID;
            const fromDate = req.query.fromDate;
            const toDate = req.query.toDate;
            const response = await axios({
                method: "POST",
                url: `https://finance.vietstock.vn/data/KQGDThongKeGiaStockPaging`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
                data: `page=${page}&pageSize=${pageSize}&catID=${catID}&stockID=${stockID}&fromDate=${fromDate}&toDate=${toDate}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`
            });
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    chisoNganh: async(req, res) => {
        try {
            const type = req.query.type || 1;
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/sectionindex",
                data: `type=${type}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            });
            res.json({ code: 200, data: response.data });
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    ketquaKinhDoanh: async(req, res) => {
        try {
            const catID = req.query.catID || 0;
            const industryID = req.query.industryID || 0;
            const code = req.query.code || "";
            const order = req.query.order || "";
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 20;
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/allkqkdorder",
                data: `catID=${catID}&industryID=${industryID}&code=${code}&order=${order}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            });
            let dataRP = [];
            for (var i = (page - 1) * pageSize; i < page*pageSize; i++) {
                if (response.data[i]) {
                    dataRP.push(response.data[i]);
                }
            }
            res.json({ code: 200, data: dataRP });
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    macrooverviewchart: async(req, res) => {
        try {
            const type = req.query.type;
            const top = req.query.top;
            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/macrooverviewchart",
                data: `type=${type}&top=${top}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            });
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    giaodichNoiBo: async(req, res) => {
        try {
            const transferTypeID = req.query.transferTypeID;
            const stockCode = req.query.stockCode;
            const fDate = req.query.fDate;
            const tDate = req.query.tDate;
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 20;
            const orderBy = req.query.orderBy || "EventID";
            const orderDir = req.query.orderDir || "DESC";

            const response = await axios({
                method: "POST",
                url: "https://finance.vietstock.vn/data/eventstransferdata",
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
                data: `transferTypeID=${transferTypeID}&stockCode=${stockCode}&fDate=${fDate}&tDate=${tDate}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderDir=${orderDir}&__RequestVerificationToken=hGfWG4LE8eXkW4jyy24ck-OM7ncVmQVN-mTcKuxNSnYA3y9EFPOyFCbE5QAtR0U3BQ4ahvI7TfTCQ124CrtzlvED5O68FgAq56M_ajofSOU1`
            });
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    stockList: async(req, res) => {
        try {
            const catID = req.query.catID;
            const response = await axios({
                method: "GET",
                url: `https://finance.vietstock.vn/data/stocklist?catID=${catID}`,
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '__RequestVerificationToken=itgcdMQgkBrwE23iTQaHSqsHtp3oy7mZJtkaJhP_MB9yPkbWA1HrEPVYSyki9vmPjjlCz4n4TlitXwVpPMw-Sze8jP77B7Iqueof9kyzWA41;; ASP.NET_SessionId=pkvx1z40qq1f4ybslejr5sf3; language=vi-VN',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
                },
            })
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    }


}
module.exports = vimoController;