/* ==========================================================================
   ARC EDITZ - PHONE SECURITY & VULNERABILITY INSPECTOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('sec-quiz-form');
    const resultBox = document.getElementById('sec-result');
    const scoreVal = document.getElementById('score-val');
    const scoreText = document.getElementById('score-text');
    const recsBox = document.getElementById('sec-recommendations');
    const scoreCircle = document.getElementById('score-circle');

    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const os = document.getElementById('sec-os').value;
            const apk = document.getElementById('sec-apk').value;
            const links = document.getElementById('sec-links').value;
            const tfa = document.getElementById('sec-2fa').value;

            let score = 100;
            let recs = [];

            if (apk === 'yes') {
                score -= 35;
                recs.push('⚠️ Avoid downloading APKs or apps outside the official Play/App Store without malware scanning.');
            }
            if (links === 'yes') {
                score -= 30;
                recs.push('⚠️ Phishing links in SMS/WhatsApp are the #1 way phone banking details & credentials get stolen.');
            }
            if (tfa === 'no') {
                score -= 25;
                recs.push('⚠️ Enable Two-Factor Authentication (2FA) immediately on WhatsApp, Gmail, and financial apps.');
            }
            if (os === 'android') {
                recs.push('ℹ️ Ensure Play Protect is enabled and your device receives monthly Android security patches.');
            } else {
                recs.push('ℹ️ Keep iOS updated to the latest version to prevent zero-day exploit vulnerabilities.');
            }

            if (score === 100) {
                recs.push('🎉 Excellent! Your security habits are strong. Keep your OS updated daily.');
            }

            scoreVal.textContent = `${score}%`;
            
            if (score >= 80) {
                scoreCircle.style.borderColor = '#10b981';
                scoreText.textContent = 'SECURE (Low Risk)';
                scoreText.style.color = '#10b981';
            } else if (score >= 50) {
                scoreCircle.style.borderColor = '#f59e0b';
                scoreText.textContent = 'MODERATE VULNERABILITY';
                scoreText.style.color = '#f59e0b';
            } else {
                scoreCircle.style.borderColor = '#ef4444';
                scoreText.textContent = 'HIGH HACKING RISK!';
                scoreText.style.color = '#ef4444';
            }

            let recsHTML = '<ul>' + recs.map(r => `<li>${r}</li>`).join('') + '</ul>';
            recsBox.innerHTML = recsHTML;

            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Tips accordion
    const tipItems = document.querySelectorAll('.tip-item');
    tipItems.forEach(item => {
        item.addEventListener('click', function() {
            tipItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
