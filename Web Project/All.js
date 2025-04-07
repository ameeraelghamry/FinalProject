// js of verify 
 // Get the verification code from sessionStorage
 let emailVerificationCode = sessionStorage.getItem('emailVerificationCode');

 // Verifying the email code
 function verifyEmailCode() {
     const enteredCode = document.getElementById('emailCode').value;

     if (enteredCode == emailVerificationCode) {
         document.getElementById('message').textContent = 'Email verified successfully!';
         document.getElementById('errorMessage').textContent = '';
         sessionStorage.removeItem('emailVerificationCode'); // Clear the code after successful verification
     } else {
         document.getElementById('errorMessage').textContent = 'Invalid verification code.';
     }
 }
 
 //sign up js
 function validate(event) {
    event.preventDefault(); // Prevent form from submitting automatically

    const pass = document.getElementById("pass1").value;
    const confirmpassw = document.getElementById("pass2").value;

    const isValid = pass.length >= 8 &&
                    /[A-Z]/.test(pass) &&
                    /\d/.test(pass);

    if (pass === "") {
        alert("Password is Required!");
        return false; 
    }
    if (pass.length < 8) {
        alert("Password must be at least 8 characters long and contain uppercase letters and numbers.");
        return false;
    }
    if (!isValid) {
        alert("Password must contain at least one uppercase letter and one digit.");
        return false;
    }
    if (confirmpassw !== pass) {
        alert("Passwords do not match.");
        return false;
    }
      alert("Password saved successfully ");
    return true;
}

//forgot pass js 
function sendEmailCode(event)
{
   event.preventDefault();

   // Simulate generating and sending an email code
   let emailVerificationCode = Math.floor(100000 + Math.random() * 900000);
   console.log(`Email Verification Code: ${emailVerificationCode}`);

   // Store the verification code in sessionStorage
   sessionStorage.setItem('emailVerificationCode', emailVerificationCode);

   // Redirect to the verification page
   window.location.href = 'Verify.html';
}