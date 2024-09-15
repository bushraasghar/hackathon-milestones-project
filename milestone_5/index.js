document.addEventListener("DOMContentLoaded", () => {
  // Form and Resume elements
  const form = document.getElementById("resume-form");
  const resumeContent = document.getElementById("resume-content");
  const shareableLink = document.getElementById("shareable-link");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const downloadBtn = document.getElementById("download-btn");

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect user input data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      degree: document.getElementById("degree").value,
      school: document.getElementById("school").value,
      gradYear: parseInt(document.getElementById("gradYear").value),
      jobTitle: document.getElementById("jobTitle").value,
      company: document.getElementById("company").value,
      years: parseInt(document.getElementById("years").value),
      skills: document
        .getElementById("skills")
        .value.split(",")
        .map((skill) => skill.trim()),
    };

    // Generate the resume dynamically
    generateResume(formData);

    // Generate the unique URL
    const userName = formData.name.toLowerCase().replace(/\s+/g, "");
    const uniqueUrl = `resume-viewer.html?username=${userName}`;
    localStorage.setItem(userName, JSON.stringify(formData)); // Save data

    // Update the shareable link
    shareableLink.href = uniqueUrl;
    shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
    shareableLink.style.display = "inline"; // Make the link visible

    // Enable "Copy Link" button
    copyLinkBtn.style.display = "inline-block";
    copyLinkBtn.addEventListener("click", function () {
      copyToClipboard(`/${uniqueUrl}`);
      alert("Link copied to clipboard!");
    });
  });

  // Function to generate and display the resume (non-editable)
  function generateResume(data) {
    resumeContent.innerHTML = `
            <h3>${data.name}</h3>
            <p>Email: ${data.email}</p>
            <p>Contact: ${data.number}</p>
            <h4>Education</h4>
            <p>${data.degree} from ${data.school} (Class of ${
      data.gradYear
    })</p>
            <h4>Work Experience</h4>
            <p>${data.jobTitle} at ${data.company} (${data.years} years)</p>
            <h4>Skills</h4>
            <ul>
                ${data.skills.map((skill) => `<li>${skill}</li>`).join("")}
            </ul>
        `;
  }

  // Function to copy link to clipboard
  function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  // Download resume as PDF
  downloadBtn.addEventListener("click", function () {
    const resumeElement = document.getElementById("resume");
    const opt = {
      margin: 1,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(resumeElement).set(opt).save();
  });
});



// JavaScript to handle image upload and display
document.addEventListener('DOMContentLoaded', function() {
  // Select the input and image elements
  const imageInput = document.getElementById('imageInput');
  const profileImage = document.getElementById('profileImage');

  // Add event listener to the input element
  imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      
      // Define the onload function for the FileReader
      reader.onload = function(e) {
        // Set the image src to the data URL of the selected file
        profileImage.src = e.target.result;
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const imageInput = document.getElementById('imageInput');
  const profileImage = document.getElementById('profileImage');
  const resumeProfileImage = document.getElementById('resume-profile-image');
  const resumeContent = document.getElementById('resume-content');
  
  // Handle image upload and display
  imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImage.src = e.target.result;
        resumeProfileImage.src = e.target.result; // Update resume profile image
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const degree = document.getElementById('degree').value;
    const school = document.getElementById('school').value;
    const gradYear = document.getElementById('gradYear').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const years = document.getElementById('years').value;
    const skills = document.getElementById('skills').value;

    // Build resume content
    resumeContent.innerHTML = `
      <h2>${name}</h2>
      <p>Email: ${email}</p>
      <p>Contact: ${number}</p>
      <hr>
      <h3>Education</h3>
      <p>Degree: ${degree}</p>
      <p>School/University: ${school}</p>
      <p>Graduation Year: ${gradYear}</p>
      <hr>
      <h3>Work Experience</h3>
      <p>Job Title: ${jobTitle}</p>
      <p>Company: ${company}</p>
      <p>Years of Experience: ${years}</p>
      <hr>
      <h3>Skills</h3>
      <p>${skills}</p>
    `;
  });

  // Handle PDF download
  document.getElementById('download-btn').addEventListener('click', function() {
    const element = document.getElementById('resume-content');
    html2pdf().from(element).save('resume.pdf');
  });

  // Handle shareable link creation
  document.getElementById('copy-link-btn').addEventListener('click', function() {
    const shareableLink = document.getElementById('shareable-link');
    const resumeHTML = document.getElementById('resume').innerHTML;
    
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    shareableLink.href = url;
    shareableLink.style.display = 'inline';
    shareableLink.textContent = 'View Shareable Resume';

    navigator.clipboard.writeText(url).then(() => {
      alert('Shareable link copied to clipboard!');
    });
  });
});






