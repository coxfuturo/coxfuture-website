// // ==========================================
// // Card Hover Effects Enhancement
// // ==========================================
// const serviceCards = document.querySelectorAll('.service-card');

// serviceCards.forEach(card => {
//     card.addEventListener('mouseenter', function () {
//         this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
//     });

//     card.addEventListener('mousemove', function (e) {
//         const rect = this.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;

//         const rotateX = (y - centerY) / 20;
//         const rotateY = (centerX - x) / 20;

//         this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
//     });

//     card.addEventListener('mouseleave', function () {
//         this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
//     });
// });