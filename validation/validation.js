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