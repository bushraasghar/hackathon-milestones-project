var resumeForm = document.getElementById("resumeForm");
var resumeDisplay = document.getElementById("display-resume");
var imageInput = document.getElementById("imageInput");
var profileImage = document.getElementById("profileImage");
var addMoreSkillsBtn = document.getElementById('addMoreSkills');
var skillSection = document.querySelector('.skill-section');
// Event listener for form submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect data from the form
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("number").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("exp").value;
    // Collect all skill inputs
    var skillInputs = document.querySelectorAll('.skill-section input');
    var skills = [];
    skillInputs.forEach(function (input) {
        var value = input.value.trim();
        if (value) {
            skills.push(value);
        }
    });
    // Validate form inputs
    var isValid = validateForm(name, email, phone);
    if (!isValid)
        return;
    // Create the resume data object
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    // Get the image source from the image input
    var imageSrc = profileImage.src;
    // Dynamically generate and display the resume with the image
    generateResume(resumeData, imageSrc);
});
function validateForm(name, email, phone) {
    var isValid = true;
    if (!name) {
        showError("name-error", "Name is required");
        isValid = false;
    }
    else {
        hideError("name-error");
    }
    if (!email || email.indexOf("@") === -1) {
        showError("email-error", "Valid email is required");
        isValid = false;
    }
    else {
        hideError("email-error");
    }
    if (!phone || phone.length < 10) {
        showError("phone-error", "Phone number must be at least 10 digits");
        isValid = false;
    }
    else {
        hideError("phone-error");
    }
    return isValid;
}
function showError(errorId, message) {
    var errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}
function hideError(errorId) {
    var errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = "";
    }
}
function generateResume(data, imageSrc) {
    var name = data.name, email = data.email, phone = data.phone, education = data.education, experience = data.experience, skills = data.skills;
    // Resume template with a background including the profile image
    var resumeHtml = "\n          <div class=\"resume-template\">\n              <img src=\"".concat(imageSrc, "\" alt=\"Profile Photo\"/>\n              <h2>Resume</h2>\n              <h3>").concat(name, "</h3>\n              <p><strong>Email:</strong> ").concat(email, "</p>\n              <p><strong>Phone:</strong> ").concat(phone, "</p>\n  \n              <h3>Education</h3>\n              <p>").concat(education, "</p>\n  \n              <h3>Experience</h3>\n              <p>").concat(experience, "</p>\n  \n              <h3>Skills</h3>\n              <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "</ul>\n          </div>\n      ");
    resumeDisplay.innerHTML = resumeHtml;
    resumeDisplay.style.display = "block";
}
function addSkillInput() {
    var skillInputs = document.querySelectorAll('.skill-section input');
    var maxSkills = 10;
    if (skillInputs.length < maxSkills) {
        // Create a new input field for skill
        var newSkillInput = document.createElement('input');
        newSkillInput.name = 'skill';
        newSkillInput.placeholder = 'Enter your skill';
        newSkillInput.required = false;
        // Add the new input field to the skill section
        skillSection.appendChild(newSkillInput);
    }
    else {
        alert('Maximum number of skills reached');
    }
}
// Event listener for the "Add more skills" button
addMoreSkillsBtn.addEventListener('click', function () {
    addSkillInput();
});
// Event listener for image file input
imageInput.addEventListener("change", function () {
    var _a;
    var file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profileImage.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
});
// Event listener for download button
var downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", function () {
    var _a;
    // Get the resume HTML content
    var resumeHtml = (_a = document.getElementById("display-resume")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (resumeHtml) {
        // Create a new window and write the resume content into it
        var printWindow = window.open("", "", "height=800,width=600");
        if (printWindow) {
            // Write the HTML structure and resume content into the new window
            printWindow.document.open();
            printWindow.document.write("\n                  <html>\n                  <head>\n                      <title>Print Resume</title>\n                      <style>\n                          body {\n                              font-family: Arial, sans-serif;\n                              margin: 0;\n                              padding: 0;\n                          }\n                          .resume-template {\n                             background-color: #1a1b1c ;\n                        /* Dark slate gray */\n                            padding: 40px;\n                            border-radius: 10px;\n                            max-width: 800px;\n                            width: 100%;\n                            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);\n                            margin-top: 20px;\n                            border: 2px solid #C8AD7F;\n                          }\n                          .resume-template h2 {\n                              font-size: 32px;\n                              color: #fda40c;\n                              text-align: center;\n                              margin-bottom: 20px;\n                              text-transform: uppercase;\n                              letter-spacing: 1.5px;\n                              border-bottom: 2px solid #B89D6B;\n                              padding-bottom: 15px;\n                          }\n                          .resume-template h3 {\n                              font-size: 24px;\n                              color: #fda40c;\n                              margin-top: 30px;\n                              text-transform: uppercase;\n                              border-bottom: 1px solid #EEEEEE;\n                              padding-bottom: 10px;\n                          }\n                          .resume-template p,\n                          .resume-template ul {\n                              font-size: 18px;\n                              line-height: 1.7;\n                              color: #EEEEEE;\n                              margin-bottom: 20px;\n                          }\n                          .resume-template ul {\n                              padding-left: 20px;\n                              list-style: none;\n                          }\n                          .resume-template ul li {\n                              margin-bottom: 10px;\n                              padding-left: 15px;\n                              position: relative;\n                          }\n                          .resume-template ul li::before {\n                              content: '\u2022';\n                              position: absolute;\n                              left: 0;\n                              color: #C8AD7F;\n                              font-size: 20px;\n                          }\n                          .resume-template img {\n                              width: 150px;\n                              height: 150px;\n                              border-radius: 50%;\n                              border: 3px solid #C8AD7F;\n                              display: block;\n                              margin: 0 auto;\n                          }\n                      </style>\n                  </head>\n                  <body>\n                      ".concat(resumeHtml, "\n                      <script>\n                          window.onload = function() {\n                              window.print();\n                              window.onafterprint = function() {\n                                  window.close();\n                              };\n                          };\n                      </script>\n                  </body>\n                  </html>\n              "));
            printWindow.document.close();
        }
    }
});
