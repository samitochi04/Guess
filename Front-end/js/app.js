document.addEventListener('DOMContentLoaded', () => {
    const question = document.getElementById('question');
    const timer = document.getElementById('timer');
    const options = document.querySelectorAll('button');

    let countdown = 60;

    function startGame() {
        question.textContent = "Who is the president of France?";
        startTimer();
    }

    function startTimer() {
        const interval = setInterval(() => {
            timer.textContent = `Time left: ${countdown}s`;
            countdown--;

            if (countdown < 0) {
                clearInterval(interval);
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            alert(`You selected: ${option.textContent}`);
        });
    });

    startGame();
});
