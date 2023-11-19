const vimoController = require("../controllers/vimoController");

const router = require("express").Router();

//get all
router.get("/market", vimoController.marketTotal);
router.get("/top-10", vimoController.topTen);
router.get("/dinh-gia", vimoController.dinhGia);
router.get("/do-rong-thi-truong", vimoController.doRongThiTruong);
router.post("/viet-stock/news-new-update-paging", vimoController.newsNewUpdatePaging);
router.get("/viet-stock/report-data-by-display", vimoController.reportdatabydisplay);
router.get("/get-html", vimoController.getHtml);

router.get("/get-cafef", vimoController.getDataCafef);
router.get("/chiso-thegioi", vimoController.tcttTheGioi);
router.get("/chiso-index-vn", vimoController.tcttVietNam);
router.get("/top-10-cophieu", vimoController.top10CoPhieu);
router.get("/dinh-gia-index", vimoController.dinhGiaIndex);
router.get("/khoi-ngoai", vimoController.khoiNgoai);
router.get("/dan-dat-thi-truong", vimoController.nhomDanDatThiTruong);
router.get("/top-10-truycap", vimoController.top10TruyCap);
router.get("/dienbien-khoingoai", vimoController.dienBienGiaoDichKhoiNgoai);
router.get("/thanhkhoan-thitruong", vimoController.thanhKhoanThiTruong);
router.get("/hang-hoa", vimoController.dataHangHoa);
router.get("/giaodich-tudoanh", vimoController.giaodichTuDoanh);
router.get("/top-tudoanh", vimoController.topTuDoanh);
router.get("/dorong-thitruong", vimoController.fDoRongThiTruong);
router.get("/bando-thitruong", vimoController.bandoThitruong);
router.get("/thitruong-ngoaihoi",vimoController.thitruongNgoaiHoi);
module.exports = router;
