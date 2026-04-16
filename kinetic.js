/**
 * Kinetic Typography Implementation
 */
function initKineticTypography() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    // Use children or childNodes to preserve the <br>
    const content = Array.from(title.childNodes);
    title.innerHTML = '';

    content.forEach((node) => {
        if (node.nodeName === 'BR') {
            title.appendChild(document.createElement('br'));
            return;
        }

        const text = node.textContent.trim();
        if (!text) return;

        const words = text.split(/\s+/);
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            wordSpan.style.marginRight = '0.3em';
            
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('highlight') || word.toLowerCase().includes('estruturamente')) {
                wordSpan.classList.add('highlight');
            }

            [...word].forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.classList.add('char');
                charSpan.style.transitionDelay = `${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
                wordSpan.appendChild(charSpan);
            });

            title.appendChild(wordSpan);
        });
    });
}

// Re-run the split on load
document.addEventListener('DOMContentLoaded', () => {
    initKineticTypography();
});
