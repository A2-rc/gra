/* ==========================================================================
   ARC EDITZ - AI PROMPT ENHANCER SANDBOX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-prompt-input');
    const enhanceBtn = document.getElementById('enhance-prompt-btn');
    const outputText = document.getElementById('prompt-output-text');
    const copyBtn = document.getElementById('copy-prompt-btn');
    const presetBtns = document.querySelectorAll('.preset-btn');

    const presets = {
        design: {
            input: "Design a luxury birthday flyer for Kedia with a burgundy dress and gold details.",
            enhanced: `[ROLE]: You are ARC Solutions, a Master Graphic Designer & Art Director.\n[TASK]: Create a high-converting, HD luxury celebration poster for Kedia.\n[STYLE & COMPOSITION]:\n- Primary Color Palette: Deep Burgundy (#800020), Metallic Gold accents (#D4AF37), soft dark vignette background.\n- Subject: Elegant portrait with golden aura highlights and studio softbox illumination.\n- Typography: Calligraphic script title "Happy Birthday Kedia" + clean serif message text.\n- Quality: 8K resolution, 300 DPI print-ready, photorealistic lighting, sharp detail.`
        },
        code: {
            input: "Write a modern responsive web app for phone security tips.",
            enhanced: `[ROLE]: Senior Full-Stack Engineer & Cyber Security Specialist.\n[TASK]: Build a high-performance modern web app for phone security auditing.\n[STACK]: HTML5, Vanilla CSS3 (Glassmorphism & Cyber Neon theme), Vanilla JavaScript ES6+.\n[KEY FEATURES]:\n- Interactive Security Vulnerability Quiz with instant risk scoring.\n- Dark mode responsive grid with micro-animations & glowing HUD elements.\n- Direct WhatsApp integration links for custom cybersecurity consultation.\n- Clean modular code with zero bloated external dependencies.`
        },
        study: {
            input: "Explain Calculus differentiation for high school physics students.",
            enhanced: `[ROLE]: ARC Solutions STEM Master Tutor (Maths & Physics Specialist).\n[TASK]: Explain the derivative (differentiation) using real-world kinematic physics examples.\n[LESSON STRUCTURE]:\n1. Intuitive Concept: Rate of Change (Position s(t) -> Velocity v(t) -> Acceleration a(t)).\n2. Geometric Meaning: Slope of the tangent line on a curve.\n3. Core Formula: Limit definition f'(x) = lim_{h->0} [f(x+h) - f(x)] / h.\n4. Practice Problems with step-by-step solutions for exam success.`
        }
    };

    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const presetKey = this.getAttribute('data-preset');
            if (presets[presetKey]) {
                userInput.value = presets[presetKey].input;
                outputText.textContent = presets[presetKey].enhanced;
            }
        });
    });

    if (enhanceBtn) {
        enhanceBtn.addEventListener('click', function() {
            const rawText = userInput.value.trim();
            if (!rawText) {
                outputText.textContent = "// Please enter an idea or draft prompt above first!";
                return;
            }

            outputText.textContent = `[ROLE]: You are an Expert AI Prompt Specialist trained by ARC EDITZ.\n[USER CONTEXT]: "${rawText}"\n\n[OPTIMIZED SYSTEM PROMPT]:\nAct as a world-class professional specialist. Execute the request above with strict adherence to high-quality output standards:\n- Structural Precision: Break response into clear actionable sections.\n- Tone & Style: Authoritative, modern, innovative, and highly practical.\n- Output Requirements: Include real-world examples, step-by-step instructions, and optimal configuration settings.`;
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const textToCopy = outputText.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                alert("Failed to copy. Please select and copy manually.");
            });
        });
    }
});
