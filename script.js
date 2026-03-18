// SYS.INIT Execution Script
document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const linksAndBtns = document.querySelectorAll('a, button, .log-entry, .folder, .stack-item, .comm-node');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    linksAndBtns.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Custom smooth scroll - Only target internal anchor links
    document.querySelectorAll('.dock-item, a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a placeholder or a download link (though selector should exclude them)
            if (!targetId || targetId === '#' || this.hasAttribute('download')) return;
            
            e.preventDefault();
            
            let targetPosition = 0;
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Small offset to account for headers
                    targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 50;
                }
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Overload (Visual simulation)
    const terminalForm = document.querySelector('.terminal-form');
    if (terminalForm) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = terminalForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending...';
            btn.style.borderColor = 'var(--accent-emerald)';
            btn.style.color = 'var(--accent-emerald)';
            
            setTimeout(() => {
                btn.innerHTML = 'Message Sent';
                terminalForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.removeAttribute('style');
                }, 3000);
            }, 1500);
        });
    }

});
