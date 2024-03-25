const axios = require('axios');
const bolocCophieuController = {
    GetDataByFilter: async(req, res) => {
        try{
            const response = await axios({
                method: "POST",
                url: "https://fwtapi3.fialda.com/api/services/app/Stock/GetDataByFilter",
                data: req.body
            });
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 502, error: err});
        }
        
    }
}
module.exports = bolocCophieuController;