
function togglePopup(){
document.getElementById("popup").classList.toggle("active");

}

function toggleRentalPopup() {
  document.getElementById("rentalDatePopup").classList.toggle("active");
}

function setRentalDates(){

  const startDate= document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  if(!startDate || !endDate){

    alert("please select both dates !");
    return;
  }

  if(new Date(startDate) > new Date(endDate)){
    alert("Start date cannot be after end date!");
    return;
  }

  //calculate days difference
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; //+1 to include both start and end day
 window.location.href = `/api/v1/cars/store-dates?start=${startDate}&end=${endDate}&days=${days}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const modelViewer = document.querySelector('model-viewer');
    const resetBtn = document.getElementById('reset-camera');
    
    
   
    
    // Model loading progress
    modelViewer.addEventListener('progress', (event) => {
      const progressBar = document.querySelector('.progress-bar');
      progressBar.style.setProperty('--progress', event.detail.totalProgress * 100+'%');
    });
    
    // Model loaded successfully
    modelViewer.addEventListener('load', () => {
      console.log('3D model loaded successfully');
      document.querySelector('.progress-bar').style.display = 'none';
    });
    
    // Error handling
    modelViewer.addEventListener('error', () => {
      console.error('Error loading 3D model');
    });
  });

  window.addEventListener("scroll", () => {
    const startY = 179.67; // Top of row 3
const endY = 1213.066666; // Top of row 6 (where second model begins)
const offset = 150;
const startAngle = -150;
const endAngle = startAngle + 300;
    const scrollRange = endY - startY;
  
    const scrollY = window.scrollY;
  
    if (scrollY < startY || scrollY > endY + 200) return;
  
    const progress = Math.min((scrollY - startY) / scrollRange, 1);
    const rotation = startAngle + progress * (endAngle - startAngle);
    const currentY = startY + progress * scrollRange;

    const leftPosition = 20 - progress * 20;
  
    const model = document.getElementById('floatingModel');
    const wrapper = document.getElementById('modelWrapper');
  
    if (model && wrapper) {
      model.setAttribute("camera-orbit", `${rotation}deg 80deg auto`);
      wrapper.style.top = `${currentY + offset}px`;
      wrapper.style.left = `${leftPosition}%`;
    }
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
  

 


