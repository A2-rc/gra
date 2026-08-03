/* ==========================================================================
   ARC EDITZ - CYBER TERMINAL COMMAND LINE INTERFACE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');

    if (!termInput || !termOutput) return;

    const commands = {
        'help': `Available System Commands:
- <span class="cmd-highlight">services</span> : View all 6 core ARC Editz tech services
- <span class="cmd-highlight">design</span>   : Show Graphic Design capabilities & catalog info
- <span class="cmd-highlight">tutoring</span> : Details on Maths, Physics & Computer Science Home Teaching
- <span class="cmd-highlight">hacking</span>  : Phone protection & anti-hack security tips
- <span class="cmd-highlight">ai</span>       : AI Prompt Engineering capabilities
- <span class="cmd-highlight">office</span>   : MS Word, Excel, PowerPoint & Access skills house
- <span class="cmd-highlight">contact</span>  : Display WhatsApp & direct line contact info
- <span class="cmd-highlight">clear</span>    : Clear terminal screen`,

        'services': `[ARC EDITZ SERVICES MATRIX]:
1. Graphic Designing (Flyers, Banners, Corporate Branding)
2. Home Teaching (Maths, Physics, & Computer Science)
3. AI Prompt Engineering (ChatGPT, Midjourney, Claude)
4. Software & Web Programming (Apps, Automation, Frontends)
5. Ethical Hacking & Phone Protection (Malware removal, 2FA)
6. Microsoft Office Skills House (Word, Excel, PPT, Access)`,

        'design': `[GRAPHIC DESIGN]: High-Impact HD Flyers, Event Posters, Fintech Branding.
Type 'contact' or click WhatsApp button to order custom designs!`,

        'tutoring': `[STEM HOME TEACHING]: High-performance 1-on-1 tutoring in Pure/Applied Maths, Physics, & Computer Science. Guaranteed grade acceleration.`,

        'hacking': `[SECURITY SHIELD]: Protect your smartphone against malware, spyware, SIM swap, and phishing. Enable 2FA on WhatsApp immediately!`,

        'ai': `[AI PROMPT LAB]: Expert prompt optimization for Midjourney, ChatGPT, Gemini, & Claude. Turn simple concepts into high-converting system prompts.`,

        'office': `[MS OFFICE SKILLS HOUSE]: Master Word documents, Excel VLOOKUP/Pivot Tables, PowerPoint pitch decks, and Access databases.`,

        'contact': `[ARC EDITZ CONTACT HUB]:
- WhatsApp: https://wa.me/237673286459
- Catalog: https://wa.me/673286459
- Phone: +237 673 286 459`
    };

    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const inputVal = termInput.value.trim().toLowerCase();
            termInput.value = '';

            // Print input prompt
            const promptLine = document.createElement('div');
            promptLine.className = 'term-line';
            promptLine.innerHTML = `<span class="term-prompt">arc-editz$&nbsp;</span> ${inputVal}`;
            termOutput.appendChild(promptLine);

            if (inputVal === 'clear') {
                termOutput.innerHTML = '';
            } else if (commands[inputVal]) {
                const resLine = document.createElement('div');
                resLine.className = 'term-line';
                resLine.innerHTML = commands[inputVal];
                termOutput.appendChild(resLine);
            } else if (inputVal !== '') {
                const errLine = document.createElement('div');
                errLine.className = 'term-line';
                errLine.style.color = '#ef4444';
                errLine.textContent = `Command not recognized: '${inputVal}'. Type 'help' for available commands.`;
                termOutput.appendChild(errLine);
            }

            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });
});
