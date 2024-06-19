class NhanVien {
    constructor () {
        this.tknv = "" ;
        this.name = "" ;
        this.email = "" ;
        this.password = "" ;
        this.datepicker = "" ;
        this.luongCB = 0 ;
        this.chucvu = "" ;
        this.gioLam = 0 ;
    } ;
    tinhTongLuong() {
      let luong = 0;
      console.log(`Chức vụ: ${this.chucvu}, Lương cơ bản: ${this.luongCB}`);
      if (this.chucvu === "Sếp") {
          luong = this.luongCB * 3;
      } else if (this.chucvu === "Trưởng Phòng") {
          luong = this.luongCB * 2;
      } else if (this.chucvu === "Nhân Viên") {
          luong = this.luongCB;
      }
      return luong;
  }
    xepLoai = function () {
      let show = "";
      if (this.gioLam >= 192) {
          show = "nhân viên xuất sắc";
      } else if (this.gioLam >= 176) {
          show = "nhân viên giỏi";
      } else if (this.gioLam >= 160) {
          show = "nhân viên khá";
      } else {
          show = "nhân viên trung bình";
      }
      return show;
  }

    
}

   