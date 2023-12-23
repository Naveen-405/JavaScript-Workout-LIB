function validateform() {
    const name = document.forms.myform.name.value
    const age = document.forms.myform.age.value
    const email = document.forms.myform.email.value
    const cmnts = document.forms.myform.cmnt.value

    if(name ===""){
        window.alert("please fill the Name section");
        return false;
    }
    else if(email ==""){
        window.alert("please fill the Email section");
        return false;
    }
    else if(age ==""){
        window.alert("please fill the Age section");
        return false;
    }
    else if(cmnts=="" || cmnts.length>30){
        window.alert(` 1.Write Your Comments \n 2.Within Given format \n 3.Rewrite your comments within 30words`)
        return false;
    }
    return true;
}
let input_btn = document.forms.myform.input_btn

function check() {
    if (validateform() === true) {
        alert("Successfull✅😍");    
    }
    else{
        return false;
    }
}
  

