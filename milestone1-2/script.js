var toggleButton = document.getElementById('toggle-section');
var skillsContent = document.getElementById('skills-content');
toggleButton.addEventListener('click', function () {
    if (skillsContent.style.display === 'none') {
        skillsContent.style.display = 'block';
        toggleButton.innerHTML = '<b>Hide Skills</b>';
    }
    else {
        skillsContent.style.display = 'none';
        toggleButton.innerHTML = '<b>Show Skills</b>';
    }
});
