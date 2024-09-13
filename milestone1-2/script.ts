const toggleButton = document.getElementById('toggle-section') as HTMLButtonElement;
const skillsContent = document.getElementById('skills-content') as HTMLElement;

toggleButton.addEventListener('click', () => {
    if (skillsContent.style.display === 'none') {
        skillsContent.style.display = 'block';
        toggleButton.innerHTML = '<b>Hide Skills</b>';
    } else {
        skillsContent.style.display = 'none';
        toggleButton.innerHTML = '<b>Show Skills</b>';
    }
});