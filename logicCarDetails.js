function togglePopup(){
document.getElementById("popup").classList.toggle("active");

}


document.addEventListener("DOMContentLoaded", function() {
    const modelViewer = document.querySelector('model-viewer');
    const resetBtn = document.getElementById('reset-camera');
    const rotateBtn = document.getElementById('toggle-rotate');
    
    // Toggle auto-rotation
    rotateBtn.addEventListener('click', () => {
      modelViewer.autoRotate = !modelViewer.autoRotate;
      rotateBtn.textContent = modelViewer.autoRotate ? 'Stop Rotation' : 'Start Rotation';
    });
    
    // Model loading progress
    modelViewer.addEventListener('progress', (event) => {
      const progressBar = document.querySelector('.progress-bar');
      progressBar.style.setProperty('--progress', event.detail.totalProgress * 100+'%');
    });
    
    // Model loaded successfully
    modelViewer.addEventListener('load', () => {
      console.log('3D model loaded successfully');
    });
    
    // Error handling
    modelViewer.addEventListener('error', () => {
      console.error('Error loading 3D model');
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.image-container img');
    const popup = document.querySelector('.popup-image');
    const popupImg = document.querySelector('.popup-image img');
    const closeBtn = document.querySelector('.popup-image span');
  
    images.forEach(img => {
      img.addEventListener('click', () => {
        popup.style.display = 'block';
        popupImg.src = img.src;
      });
    });
  
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  });
  







