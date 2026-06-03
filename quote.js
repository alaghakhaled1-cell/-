document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const type = document.getElementById('type').value;
            const details = document.getElementById('details').value;

            // Save to LocalStorage
            const newQuote = {
                id: Date.now(),
                name,
                phone,
                from,
                to,
                type,
                details,
                date: new Date().toLocaleDateString('ar-EG')
            };

            let quotes = JSON.parse(localStorage.getItem('transport_quotes')) || [];
            quotes.push(newQuote);
            localStorage.setItem('transport_quotes', JSON.stringify(quotes));

            // Format WhatsApp Message
            const companyPhone = "0993802757"; // Replace with real number
            const whatsappMessage = `
*طلب عرض سعر جديد - الأغا للنقل* 🚚
-------------------------
*الاسم:* ${name}
*رقم الهاتف:* ${phone}
*من:* ${from}
*إلى:* ${to}
*نوع الشحنة:* ${type}
*التفاصيل:* ${details}
            `.trim();

            const whatsappUrl = `https://wa.me/${companyPhone}?text=${encodeURIComponent(whatsappMessage)}`;

            // Show success message and redirect
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                quoteForm.reset();
                formMessage.style.display = 'none';
            }, 1500);
        });
    }
});
