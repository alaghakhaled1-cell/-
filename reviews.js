document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    // Default mock reviews
    const defaultReviews = [
        {
            id: 1,
            name: "أحمد عبدالله",
            rating: 5,
            text: "خدمة ممتازة وسريعة، فريق العمل محترف جداً في التعامل مع الأثاث وتغليفه بشكل آمن.",
            date: "15/05/2024"
        },
        {
            id: 2,
            name: "مؤسسة الأفق للتجارة",
            rating: 5,
            text: "نتعامل مع الأغا للنقل في شحن بضائعنا بشكل دوري. التزام بالمواعيد وموثوقية عالية.",
            date: "02/06/2024"
        }
    ];

    // Function to load and display reviews
    function loadReviews() {
        let storedReviews = JSON.parse(localStorage.getItem('transport_reviews'));
        
        // If no reviews in storage, use default
        if (!storedReviews || storedReviews.length === 0) {
            storedReviews = defaultReviews;
            localStorage.setItem('transport_reviews', JSON.stringify(defaultReviews));
        }

        reviewsList.innerHTML = '';

        // Reverse to show newest first
        storedReviews.slice().reverse().forEach((review, index) => {
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fas fa-star" style="color: ${i < review.rating ? '#fbbf24' : '#cbd5e1'}"></i>`
            ).join('');

            const reviewHtml = `
                <div class="review-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="review-stars">
                        ${stars}
                    </div>
                    <p>"${review.text}"</p>
                    <div class="review-author">${review.name}</div>
                    <div class="review-date">${review.date}</div>
                </div>
            `;
            reviewsList.insertAdjacentHTML('beforeend', reviewHtml);
        });
    }

    // Load reviews on page load
    if (reviewsList) {
        loadReviews();
    }

    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const ratingInput = document.querySelector('input[name="rating"]:checked');
            if (!ratingInput) {
                alert('الرجاء اختيار التقييم (عدد النجوم)');
                return;
            }

            const name = document.getElementById('reviewerName').value;
            const text = document.getElementById('reviewText').value;
            const rating = parseInt(ratingInput.value);

            const newReview = {
                id: Date.now(),
                name,
                text,
                rating,
                date: new Date().toLocaleDateString('ar-EG')
            };

            let storedReviews = JSON.parse(localStorage.getItem('transport_reviews')) || [];
            storedReviews.push(newReview);
            localStorage.setItem('transport_reviews', JSON.stringify(storedReviews));

            // Reset form and reload reviews
            reviewForm.reset();
            loadReviews();
            
            // Scroll to reviews list
            reviewsList.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
