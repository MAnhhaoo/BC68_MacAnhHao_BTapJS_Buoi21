

let ArrNhanVien = [];
console.log("heeee");

function themNhanVien() {
    let nhanVien = new NhanVien();
    let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
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
        checkEmptyValue(value,errorField);
        console.log(checkEmptyValue); 
        
    }
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
}

getLocalStorage();
renderArrNhanVien();

function renderArrNhanVien() {
    let content = "";
    for (let nhanVien of ArrNhanVien) {
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
function getLocalStorage (key= "ArrNhanVien") {
    let arrLocal =  localStorage.getItem(key);
    if (arrLocal) {
        ArrNhanVien = JSON.parse(arrLocal);
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
