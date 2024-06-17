class NhanVien {
    constructor () {
        this.tknv = "" ;
        this.name = "" ;
        this.email = "" ;
        this.password = "" ;
        this.datepicker = "" ;
        this.luongCB = "" ;
        this.chucvu = "" ;
        this.gioLam = "" ;
    } ;
    tinhTongLuong() {
        let chucvuValue = document.getElementById("chucvu").value;
        let luong = 0;
        if (chucvuValue === "Sếp") {
            luong = this.luongCB * 3;
        } else if (chucvuValue === "Trưởng phòng") {
            luong = this.luongCB * 2;
        } else if (chucvuValue === "Nhân viên") {
            luong = this.luongCB;
        }
        return Number(luong);
    };
    xepLoai() {
        let show = "";
      let gioLam = document.getElementById("gioLam").value;
      if (gioLam >= 192) {
        show = "nhân viên xuất sắc";

     } else if(gioLam >=176){
        show = "nhân viên giỏi";
      } else if (gioLam >=160) {
        show = "nhân viên khá";
      }else {
        show = "nhân viên trung bình";
      }
      return show;
    };

    
}

   