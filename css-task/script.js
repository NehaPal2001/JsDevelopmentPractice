function openVideo(videoUrl) {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    videoFrame.src = videoUrl; 
    modal.style.display = "block"; 
  }
  
  function closeModal() {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    modal.style.display = "none"; 
    videoFrame.src = ""; 
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById("videoModal");
    if (event.target == modal) {
      closeModal();
    }
  };
  