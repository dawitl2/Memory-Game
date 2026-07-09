document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'bekolo.jpg', 'coffee.png', 'doro.jpg', 'enkulal.jpg', 'kitfo.jpg',
        'kolo.jpg', 'shiro.jpg', 'tej.jpg', 'tibs.jpg', 'tire_siga.jpg',
        'bekolo.jpg', 'coffee.png', 'doro.jpg', 'enkulal.jpg', 'kitfo.jpg',
        'kolo.jpg', 'shiro.jpg', 'tej.jpg', 'tibs.jpg', 'tire_siga.jpg'
    ];
    let score = 0;
    let firstCard = null;
    let lockBoard = false;

    const gameBoard = document.querySelector('.game-board');
    const scoreBoard = document.getElementById('score-board');
    const winMessage = document.getElementById('win-message');
    const resetButtons = document.querySelectorAll('#reset-button, #play-again');

    function initializeGame() {
        gameBoard.innerHTML = '';
        score = 0;
        scoreBoard.textContent = `ውጤት: ${score}`; // score reset
        firstCard = null;
        lockBoard = true; 
        winMessage.classList.add('hidden');

        const shuffledImages = images.sort(() => Math.random() - 0.5);
        shuffledImages.forEach((img) => {
            const card = document.createElement('div');
            card.classList.add('flip-card');
            card.setAttribute('data-image', img);

            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front"></div>
                    <div class="flip-card-back" style="background-image: url('${img}')"></div>
                </div>
            `;

            gameBoard.appendChild(card);
        });

        $(document).ready(function() {
            setTimeout(function() {
                $('.flip-card').addClass('flipped'); // show
            }, 2000);

            setTimeout(function() {
                $('.flip-card').removeClass('flipped');  // hide
                lockBoard = false; 
            }, 4000);
        });

        addCardClickEvents();
    }

    // click event
    function addCardClickEvents() {
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', () => {

                if (lockBoard || card.classList.contains('matched') || $(card).hasClass('flipped')) return;

                $(card).addClass('flipped'); // flip card

                if (!firstCard) {
                    firstCard = card;
                } else {
                    let secondCard = card;
                    lockBoard = true;

                    // correct
                    if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard.style.border = '2px solid lightgreen';
                        secondCard.style.border = '2px solid lightgreen';
                        score += 10;
                        checkWinCondition();
                    }// wrong 
                    else {
                        firstCard.style.border = '2px solid red';
                        secondCard.style.border = '2px solid red';
                        setTimeout(() => {
                            $(firstCard).removeClass('flipped');
                            $(secondCard).removeClass('flipped');
                            firstCard.style.border = '';
                            secondCard.style.border = '';
                        }, 1000);
                        // score minus - 5
                        if(score>0){
                            score-=5;
                        }
                    }

                    setTimeout(() => {
                        firstCard = null;
                        secondCard=null;
                        lockBoard = false;
                    }, 1000);

                    scoreBoard.textContent = `ውጤት: ${score}`;
                }
            });
        });
    }

    function checkWinCondition() {
        if (document.querySelectorAll('.flip-card.matched').length === images.length) {
            setTimeout(() => {
                winMessage.classList.remove('hidden');
            }, 500);
        }
    }

    resetButtons.forEach(button => {
        button.addEventListener('click', initializeGame);
    });

    initializeGame();
});
