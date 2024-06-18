function checkEmptyValue(value, errorFields) {
    if (!value || value.trim() === "") {
        errorFields.forEach(errorField => {
            errorField.innerHTML = "Vui lòng không để trống";
        });
        return false;
    } else {
        errorFields.forEach(errorField => {
            errorField.innerHTML = "";
        });
        return true;
    }
}


// độ dài 
function checkLengthValue (value , errorField , min , max) {
    if (min <= value.length && value.length <= max) {
        errorField.innerHTML= "";
        return true ;
    } else {
        errorField.innerHTML = `Tài khoản tối đa ${min} - ${max} ký số`;
        return false ;
    }
}

// email 

function checkEmail (value , errorField) {
    let regexEmail =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    let isValid = regexEmail.test(value);
    if(isValid) {
        errorField.innerHTML = "";
        return true ;
    } else {
        errorField.innerHTML = ` Email phải đúng định dạng`;
        return false
    }
}
// name 

function checkName(value, errorField) {
    let name = /^[a-zA-Z\s]+$/;
    if (name.test(value)) {
        errorField.innerHTML = "";
        return true;
    } else {
        errorField.innerHTML = "Tên nhân viên phải là chữ";
        return false;
    }
}

// pass 
function checkPass(value, errorField) {
    let password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (password.test(value)) {
        errorField.innerHTML = "";
        return true;
    } else {
        errorField.innerHTML = "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        return false;
    }
}

// ngayf tháng năm 
function checkDate(value, errorField) {
    let datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    if (datePattern.test(value)) {
        let [month, day, year] = value.split('/').map(Number);
        let date = new Date(year, month - 1, day);
        if (date && (date.getMonth() + 1) === month && date.getDate() === day && date.getFullYear() === year) {
            errorField.innerHTML = "";
            return true;
        } 
    } else {
        errorField.innerHTML = "Định dạng ngày tháng phải là mm/dd/yyyy";
        return false;
    }
}

// check lương 
function checkLuong(value, errorField) {
    let luong = parseInt(value.replace(/,/g, ''));
    if (luong >= 1000000 && luong <= 20000000) {
        errorField.innerHTML = "";
        return true;
    } else {
        errorField.innerHTML = "Lương cơ bản phải từ 1 000 000 - 20 000 000";
        return false;
    }
}

// chức vụ có thể validation or k viết validation đều đc 
function checkChucVu(value, errorField) {
    let chucVu = ["Sếp", "Trưởng Phòng", "Nhân Viên"];
    if (chucVu.includes(value)) {
        errorField.innerHTML = "";
        return true;
    } else {
        errorField.innerHTML = "Chức vụ không hợp lệ";
        return false;
    }
}

// gio làm 
function checkGioLam(value, errorField) {
    let gioLam = parseInt(value);
    if (gioLam >= 80 && gioLam <= 200) {
        errorField.innerHTML = "";
        return true;
    } else {
        errorField.innerHTML = "Số giờ làm trong tháng phải từ 80 đến 200 giờ";
        return false;
    }
}