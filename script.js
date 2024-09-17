// Necessary handles
const passwordLengthText=document.getElementById("passwordLength")
const slider=document.getElementById("passwordLengthSlider")
const uppercaseCheck=document.getElementById("upperCheck")
const lowercaseCheck=document.getElementById("lowerCheck")
const numberCheck=document.getElementById("numberCheck")
const specialCheck=document.getElementById("specialCheck")
const checks=document.getElementsByClassName("check")
const strengthColor=document.getElementById("strengthColor")
const generateButton=document.getElementById("generatePasswordButton")
const copyButton=document.getElementById("copyButton")
const passwordText=document.getElementById("passwordText")
const copyMsg = document.querySelector("[data-copyMsg]");
var password=""
var passwordLength=10
var special='~`!@#$%^&*()_-+={[}]|:;"<,>.?/'
var checkCnt=0


setPasswordLength()


function setPasswordLength(){
    passwordLengthText.innerText=passwordLength
    slider.value=passwordLength
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

async function copyContent() {
    console.log("Hi")
    try {
        await navigator.clipboard.writeText(passwordText.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}


function generateRandom(min,max){
    ++max;
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return generateRandom(0,9);
}
function generateRadomUppercase(){
    var asc=generateRandom(65,90);
    return String.fromCharCode(asc);
}
function generateRandomLowercase(){
    var asc=generateRandom(97,122);
    return String.fromCharCode(asc);
}
function generateRandomSpecial(){
    var asc=generateRandom(0,special.length-1);
    return special.charAt(asc);
}
function updateCheckBoxChange(){
    checkCnt=0;
    if(uppercaseCheck.checked)++checkCnt;
    if(lowercaseCheck.checked)++checkCnt;
    if(numberCheck.checked)++checkCnt;
    if(specialCheck.checked)++checkCnt;
    if(passwordLength<checkCnt){
        passwordLength=checkCnt
        setPasswordLength()
    }
}
// Add Event Listener to all checkboxes
for(var i=0;i<checks.length;++i){
    checks[i].addEventListener('change',updateCheckBoxChange())
}

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
slider.addEventListener('input',function(e){
    console.log("Hi")
    passwordLength=e.target.value
    setPasswordLength()
})

generateButton.addEventListener('click',function(){
    // console.log("Starting")
    updateCheckBoxChange()
    if(passwordLength<checkCnt){
        passwordLength=checkCnt
        setPasswordLength()
    }
    var arr=[]
    if(uppercaseCheck.checked)arr.push(generateRadomUppercase)
    if(lowercaseCheck.checked)arr.push(generateRandomLowercase)
    if(numberCheck.checked)arr.push(generateRandomNumber)
    if(specialCheck.checked)arr.push(generateRandomSpecial)
    // console.log("Addition to array done "+arr.length)
    password=""
    // First add mandatory
    for(var i=0;i<arr.length;++i){
        password+=arr[i]()
    }
    // console.log("Mandatory generated")
    // Generate remaining
    for(var i=0;i<passwordLength-arr.length;++i){
        var rnd=generateRandom(0,arr.length-1)
        password+=arr[rnd]()
    }
    // console.log("Remaining generated")
    // Shuffle password for randomness
    password = shufflePassword(Array.from(password));
    // console.log("Shuffled "+password)
    // Set the password on the gui
    passwordText.value=password
    setStrength(arr.length)
    // console.log("Ending")
})

function setStrength(sz){
    if(passwordLength>=8){
        if(sz>=3){
            strengthColor.style.backgroundColor='green'
        }else if(sz==2){
            strengthColor.style.backgroundColor='yellow'
        }
        else{
            strengthColor.style.backgroundColor='red'
        }
    }else if(passwordLength>=6 &&sz>=3){
        strengthColor.style.backgroundColor='yellow'
    }
    else{
        strengthColor.style.backgroundColor='red'
    }
}
copyButton.addEventListener('click', () => {
    console.log("Here")
    if(passwordText.value){
        copyContent();
        console.log("Here")
    }
})
