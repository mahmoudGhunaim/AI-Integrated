document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const currentSlideNum = document.getElementById('current-slide');
    const totalSlidesNum = document.getElementById('total-slides');
    let currentSlide = 0;
    
    // Set total slides count
    totalSlidesNum.textContent = slides.length;

    // Initialize slides
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
        
        // Update progress bar
        const progressPercentage = ((index) / (slides.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update slide counter
        currentSlideNum.textContent = index + 1;
        
        // Add slide-specific animations
        document.body.className = `slide-background-${index + 1}`;
    }

    // Next slide
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Initialize first slide
    showSlide(currentSlide);

    // Auto-play functionality (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                clearInterval(autoPlayInterval);
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Uncomment the line below to enable auto-play
    // startAutoPlay();
    
    // Stop auto-play on user interaction
    prevBtn.addEventListener('click', stopAutoPlay);
    nextBtn.addEventListener('click', stopAutoPlay);
    document.addEventListener('keydown', stopAutoPlay);
}); 