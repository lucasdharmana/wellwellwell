// Character Animation Script for WELL WELL Website
// Simple fade-in transitions with fixed positioning on the section divider

(function() {
    'use strict';

    const characterImages = {
        jew: 'images/wellwell12347_jew.png',
        africa: 'images/wellwell12347_africa.png',
        india: 'images/wellwell12347_india.png'
    };

    const config = {
        initialDelay: 1000,        // 1 second initial delay
        sequenceDelay: 500,        // 0.5 seconds between each character
        fadeInDuration: 800,       // 0.8 second fade-in
        characterSize: 300,        // 50% bigger than original 200px
        mobileScale: 0.4,          // 40% size on mobile to prevent glitching
        positions: {
            jew: 0.18,             // 18% from left
            africa: 0.50,          // 50% (center)
            india: 0.78            // 78% from left
        },
        heightOffset: 0.85,        // Multiplier for positioning (0.85 = sits on line, 1.0 = below line)
        enableMobileFixed: true    // Fix position on mobile to prevent glitching
    };

    function createCharacter(imagePath, characterType, delay) {
        setTimeout(() => {
            const character = document.createElement('div');
            character.className = `character character-${characterType}`;
            
            // Find the section divider to position characters
            const divider = document.querySelector('.section-divider');
            if (!divider) {
                console.error('Section divider not found');
                return;
            }

            const dividerRect = divider.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const isMobile = screenWidth < 768;
            
            // Calculate size
            const size = isMobile ? config.characterSize * config.mobileScale : config.characterSize;
            
            // Calculate position
            const xPosition = screenWidth * config.positions[characterType];
            // Adjusted height calculation with configurable offset
            const yPosition = dividerRect.top + window.pageYOffset - (size * config.heightOffset);

            // Set initial styles with fixed positioning for mobile
            character.style.cssText = `
                position: ${isMobile && config.enableMobileFixed ? 'fixed' : 'absolute'};
                width: ${size}px;
                height: ${size}px;
                left: ${xPosition - (size / 2)}px;
                ${isMobile && config.enableMobileFixed ? 
                    `top: ${dividerRect.top - (size * config.heightOffset)}px;` : 
                    `top: ${yPosition}px;`}
                opacity: 0;
                z-index: 50;
                pointer-events: none;
                transition: opacity ${config.fadeInDuration}ms ease-in-out;
                will-change: opacity;
                transform-style: preserve-3d;
                backface-visibility: hidden;
            `;

            // Fix character directions: Jew faces left, Africa faces right, India faces right
            if (characterType === 'africa' || characterType === 'india') {
                character.style.transform = 'scaleX(-1)';
            }
            
            // Create and add image
            const img = document.createElement('img');
            img.src = imagePath;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                image-rendering: -webkit-optimize-contrast;
            `;
            
            img.onload = () => {
                // Trigger fade-in after image loads
                requestAnimationFrame(() => {
                    character.style.opacity = '1';
                });
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${imagePath}`);
                // Create placeholder if image fails
                character.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4)';
                character.style.borderRadius = '50%';
                character.style.opacity = '0.5';
            };
            
            character.appendChild(img);
            document.body.appendChild(character);

            console.log(`${characterType} character created at position ${xPosition}px, height offset: ${config.heightOffset}`);
        }, delay);
    }

    function updateCharacterPositions() {
        const divider = document.querySelector('.section-divider');
        if (!divider) return;

        const dividerRect = divider.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 768;
        const size = isMobile ? config.characterSize * config.mobileScale : config.characterSize;

        document.querySelectorAll('.character').forEach(character => {
            const characterType = character.className.split('character-')[1];
            if (characterType && config.positions[characterType]) {
                const xPosition = screenWidth * config.positions[characterType];
                
                character.style.width = `${size}px`;
                character.style.height = `${size}px`;
                character.style.left = `${xPosition - (size / 2)}px`;
                
                if (isMobile && config.enableMobileFixed) {
                    // Use fixed positioning on mobile
                    character.style.position = 'fixed';
                    character.style.top = `${dividerRect.top - (size * config.heightOffset)}px`;
                } else {
                    // Use absolute positioning on desktop
                    character.style.position = 'absolute';
                    const yPosition = dividerRect.top + window.pageYOffset - (size * config.heightOffset);
                    character.style.top = `${yPosition}px`;
                }
            }
        });
    }

    function startSequence() {
        console.log('Starting character animation sequence');
        
        // Create characters with staggered delays
        createCharacter(characterImages.jew, 'jew', config.initialDelay);
        createCharacter(characterImages.africa, 'africa', config.initialDelay + config.sequenceDelay);
        createCharacter(characterImages.india, 'india', config.initialDelay + (config.sequenceDelay * 2));
    }

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startSequence);
        } else {
            startSequence();
        }

        // Update positions on scroll and resize
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(updateCharacterPositions, 100);
        });

        window.addEventListener('resize', () => {
            updateCharacterPositions();
        });
    }

    // Initialize
    init();

    // Expose API for testing
    window.CharacterAnimation = {
        config: config,
        restart: function() {
            // Remove existing characters
            document.querySelectorAll('.character').forEach(c => c.remove());
            // Restart sequence
            startSequence();
        },
        setDelay: function(initial, sequence) {
            config.initialDelay = initial;
            config.sequenceDelay = sequence;
            this.restart();
        },
        setSize: function(size) {
            config.characterSize = size;
            updateCharacterPositions();
        },
        setHeightOffset: function(offset) {
            // Offset controls how high characters sit
            // 0.5 = halfway up their height above line
            // 0.85 = mostly on the line
            // 1.0 = bottom touches line
            config.heightOffset = offset;
            updateCharacterPositions();
            console.log('Height offset set to:', offset);
        },
        setMobileScale: function(scale) {
            config.mobileScale = scale;
            updateCharacterPositions();
        },
        toggleMobileFixed: function(enable) {
            config.enableMobileFixed = enable;
            updateCharacterPositions();
            console.log('Mobile fixed positioning:', enable ? 'enabled' : 'disabled');
        }
    };

})();