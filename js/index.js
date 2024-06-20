

let ArrNhanVien = [];
console.log("heeee");

function themNhanVien() {
    let nhanVien = new NhanVien();
    let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
    let isValid = true;
    for (let field of arrField) {
        let { value, id } = field;
        if (id === "luongCB" || id === "gioLam") {
            nhanVien[id] = parseInt(value); 
        } else {
            nhanVien[id] = value;
        }


        let parent = field.parentElement.parentElement ;  
        let errorField = parent.querySelectorAll(".sp-thongbao");
        console.log(errorField);
       let check = checkEmptyValue(value,errorField);
       if (!check) isValid = false;

       if ( check && id =="tknv") {
        let lengthValid = checkLengthValue(value, errorField[0], 4, 6);
            if (!lengthValid) isValid = false;
       }   



       if ( check && id =="email") {
        let emailValid = checkEmail(value, errorField[0]);
        if (!emailValid) isValid = false;
       }
       


       if ( check && id =="name") {
        let hoVaTen = checkName(value, errorField[0]);
        if (!hoVaTen) isValid = false;
       }


       if ( check && id =="password") {
        let Pass = checkPass(value, errorField[0]);
        if (!Pass) isValid = false;
       }


       if ( check && id =="datepicker") {
        let date = checkDate(value, errorField[0]);
        if (!date) isValid = false;
       }


       if ( check && id =="luongCB") {
        let luong = checkLuong(value, errorField[0]);
        if (!luong) isValid = false;
       }


       if ( check && id =="chucvu") {
        let chucVu = checkChucVu(value, errorField[0]);
        if (!chucVu) isValid = false;
       }



       if ( check && id =="gioLam") {
        let gioLAm = checkGioLam(value, errorField[0]);
        if (!gioLAm) isValid = false;
       }

    }

    console.log(nhanVien);

    if (!isValid) return null;
    console.log(nhanVien); 
    ArrNhanVien.push(nhanVien);
    renderArrNhanVien();
    saveLocalStorage();
    document.getElementById("formQLNV").reset();
  
        return nhanVien;
    
}



document.getElementById("formQLNV").onsubmit = function (event) {
    event.preventDefault();
    let nhanVien = themNhanVien();
    if (!nhanVien) {
        return ;
    }
    
}

getLocalStorage();
renderArrNhanVien();

function renderArrNhanVien(arr = ArrNhanVien) {
    let content = "";
    for (let nhanVien of arr) {
        let newArrNhanVien = new NhanVien();
        Object.assign(newArrNhanVien,nhanVien);
        console.log(newArrNhanVien)
        let {tknv,name,email,datepicker,chucvu} = newArrNhanVien ;
        content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${chucvu}</td>
            <td>${newArrNhanVien.tinhTongLuong()}</td>
            <td>${newArrNhanVien.xepLoai()}</td>
            <td> 
        <button onclick = "deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button>
        <button onclick = "getInfoNhanVien('${tknv}')"  class="btn btn-warning">Sửa</button>
        </td>
        </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}




// theem dữ liệu 
function saveLocalStorage (key= "ArrNhanVien", value=ArrNhanVien) {
    let stringJson = JSON.stringify(value);
    localStorage.setItem(key,stringJson)
}

// lấy dữ liệu 

function getLocalStorage(key = "ArrNhanVien") {
    let arrLocal = localStorage.getItem(key);
    if (arrLocal) {
        let arr = JSON.parse(arrLocal);
        ArrNhanVien = arr.map(item => {
            let nhanVien = new NhanVien();
            Object.assign(nhanVien, item);
            return nhanVien;
        });
        renderArrNhanVien();       
    }
}

// xoa nhan vien 
function deleteNhanVien (tKhoan) {

    console.log("dang bi xoa ne`");
    let index = ArrNhanVien.findIndex((item , index ) => {
         return item.tknv == tKhoan;

    });

    if(index != -1) {
        ArrNhanVien.splice(index , 1 )
        renderArrNhanVien();
        saveLocalStorage();
        
    }
}

function getInfoNhanVien (tKhoan) {
   
    let nhanVien = ArrNhanVien.find((item , index) => {
        return item.tknv == tKhoan;
     });
    if ( nhanVien) {
        let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
        console.log(arrField);
        for ( let field of arrField) {
            let id = field.id ;
            field.value = nhanVien[id];
        }
            document.querySelector("#tknv").readOnly = true ;
    }
}


// chức năng cặp nhật sinh viên 
function updateNhanVien () {
    let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
    let nhanVien = new NhanVien();
    for (let field of arrField) {
        let { value, id } = field ;
        nhanVien [id] = value ;
    }

    let index = ArrNhanVien.findIndex((item , index ) => {
        return item.tknv == nhanVien.tknv;

   });

   if(index != -1) {
             ArrNhanVien [index] = nhanVien ; 
             renderArrNhanVien() ;
             saveLocalStorage();
             document.getElementById("formQLNV").reset();

            document.querySelector("#tknv").readOnly = false ;

   }      
}

document.querySelector("#btnCapNhat").onclick = updateNhanVien ;


// chức năng tìm kiếm nhân viên trim() loại bỏ cách khoảng trắng ở đầu và cuối câu toLowerCase() lọc dữ liệu về chữ thường 


function searchNhanVien (event) {
 console.log(event.target.value);
 
 let newKeyWord = removeVietnameseTones (event.target.value.toLowerCase().trim());


let arrNhanVienFilter = ArrNhanVien.filter((item, index) => {
 console.log(item)
    
 let newLoaiNhanVien = removeVietnameseTones(item.xepLoai().toLowerCase().trim());
 
 return newLoaiNhanVien.includes(newKeyWord);
}) ;
    renderArrNhanVien(arrNhanVienFilter);
    console.log(renderArrNhanVien);
} ;

document.getElementById("searchName").oninput = searchNhanVien;

