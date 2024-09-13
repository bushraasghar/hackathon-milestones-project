interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string[];
  }
  
  const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
  const resumeDisplay = document.getElementById("display-resume") as HTMLDivElement;
  const imageInput = document.getElementById("imageInput") as HTMLInputElement;
  const profileImage = document.getElementById("profileImage") as HTMLImageElement;
  const addMoreSkillsBtn = document.getElementById('addMoreSkills') as HTMLButtonElement;
  const skillSection = document.querySelector('.skill-section') as HTMLDivElement;
  
  // Event listener for form submission
  resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Collect data from the form
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("number") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("exp") as HTMLTextAreaElement).value;
  
    // Collect all skill inputs
    const skillInputs = document.querySelectorAll('.skill-section input');
    const skills: string[] = [];
    skillInputs.forEach(input => {
      const value = (input as HTMLInputElement).value.trim();
      if (value) {
        skills.push(value);
      }
    });
  
    // Validate form inputs
    const isValid = validateForm(name, email, phone);
    if (!isValid) return;
  
    // Create the resume data object
    const resumeData: ResumeData = {
      name,
      email,
      phone,
      education,
      experience,
      skills,
    };
  
    // Get the image source from the image input
    const imageSrc = profileImage.src;
  
    // Dynamically generate and display the resume with the image
    generateResume(resumeData, imageSrc);
  });
  
  function validateForm(name: string, email: string, phone: string): boolean {
    let isValid = true;
  
    if (!name) {
      showError("name-error", "Name is required");
      isValid = false;
    } else {
      hideError("name-error");
    }
  
    if (!email || email.indexOf("@") === -1) {
      showError("email-error", "Valid email is required");
      isValid = false;
    } else {
      hideError("email-error");
    }
  
    if (!phone || phone.length < 10) {
      showError("phone-error", "Phone number must be at least 10 digits");
      isValid = false;
    } else {
      hideError("phone-error");
    }
  
    return isValid;
  }
  
  function showError(errorId: string, message: string) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  function hideError(errorId: string) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = "";
    }
  }
  
  function generateResume(data: ResumeData, imageSrc: string) {
    const { name, email, phone, education, experience, skills } = data;
  
    // Resume template with a background including the profile image
    const resumeHtml = `
          <div class="resume-template">
              <img src="${imageSrc}" alt="Profile Photo"/>
              <h2>Resume</h2>
              <h3>${name}</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
  
              <h3>Education</h3>
              <p>${education}</p>
  
              <h3>Experience</h3>
              <p>${experience}</p>
  
              <h3>Skills</h3>
              <ul>${skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
          </div>
      `;
  
    resumeDisplay.innerHTML = resumeHtml;
    resumeDisplay.style.display = "block";
  }
  
  function addSkillInput() {
    const skillInputs = document.querySelectorAll('.skill-section input');
    const maxSkills = 10; 
  
   
    if (skillInputs.length < maxSkills) {
      // Create a new input field for skill
      const newSkillInput = document.createElement('input');
      newSkillInput.name = 'skill';
      newSkillInput.placeholder = 'Enter your skill';
      newSkillInput.required = false; 
  
      // Add the new input field to the skill section
      skillSection.appendChild(newSkillInput);
    } else {
      alert('Maximum number of skills reached');
    }
  }
  
  // Event listener for the "Add more skills" button
  addMoreSkillsBtn.addEventListener('click', function () {
    addSkillInput();
  });
  
  // Event listener for image file input
  imageInput.addEventListener("change", function () {
    const file = imageInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Event listener for download button
  const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;
  downloadBtn.addEventListener("click", function () {
    // Get the resume HTML content
    const resumeHtml = document.getElementById("display-resume")?.innerHTML;
  
    if (resumeHtml) {
      // Create a new window and write the resume content into it
      const printWindow = window.open("", "", "height=800,width=600");
  
      if (printWindow) {
        // Write the HTML structure and resume content into the new window
        printWindow.document.open();
        printWindow.document.write(`
                  <html>
                  <head>
                      <title>Print Resume</title>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              margin: 0;
                              padding: 0;
                          }
                          .resume-template {
                             background-color: #1a1b1c ;
                        /* Dark slate gray */
                            padding: 40px;
                            border-radius: 10px;
                            max-width: 800px;
                            width: 100%;
                            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
                            margin-top: 20px;
                            border: 2px solid #C8AD7F;
                          }
                          .resume-template h2 {
                              font-size: 32px;
                              color: #fda40c;
                              text-align: center;
                              margin-bottom: 20px;
                              text-transform: uppercase;
                              letter-spacing: 1.5px;
                              border-bottom: 2px solid #B89D6B;
                              padding-bottom: 15px;
                          }
                          .resume-template h3 {
                              font-size: 24px;
                              color: #fda40c;
                              margin-top: 30px;
                              text-transform: uppercase;
                              border-bottom: 1px solid #EEEEEE;
                              padding-bottom: 10px;
                          }
                          .resume-template p,
                          .resume-template ul {
                              font-size: 18px;
                              line-height: 1.7;
                              color: #EEEEEE;
                              margin-bottom: 20px;
                          }
                          .resume-template ul {
                              padding-left: 20px;
                              list-style: none;
                          }
                          .resume-template ul li {
                              margin-bottom: 10px;
                              padding-left: 15px;
                              position: relative;
                          }
                          .resume-template ul li::before {
                              content: '•';
                              position: absolute;
                              left: 0;
                              color: #C8AD7F;
                              font-size: 20px;
                          }
                          .resume-template img {
                              width: 150px;
                              height: 150px;
                              border-radius: 50%;
                              border: 3px solid #C8AD7F;
                              display: block;
                              margin: 0 auto;
                          }
                      </style>
                  </head>
                  <body>
                      ${resumeHtml}
                      <script>
                          window.onload = function() {
                              window.print();
                              window.onafterprint = function() {
                                  window.close();
                              };
                          };
                      </script>
                  </body>
                  </html>
              `);
        printWindow.document.close();
      }
    }
  });