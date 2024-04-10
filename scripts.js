document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const timerDisplay = document.getElementById("timer");
  const draggableLine = document.getElementById("draggableLine");

  let timerInterval;
  let currentTime = 0;
  const maxTime = 45.3;

  const updateTimerAndLine = () => {
    timerDisplay.textContent = `00 : ${currentTime.toFixed(
      1
    )} / 00 : ${maxTime}`;
    const progressPercentage = (currentTime / maxTime) * 100;
    const newPosition = `calc(${progressPercentage}% - -13px)`;
    draggableLine.style.left = newPosition;
  };

  const startTimer = () => {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        currentTime += 0.1;
        updateTimerAndLine();

        if (currentTime >= maxTime) {
          clearInterval(timerInterval);
          timerInterval = null;
          currentTime = 0;
          updateTimerAndLine();
          playButton.classList.remove("fa-pause");
          playButton.classList.add("fa-play");
        }
      }, 100);
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
    }
  };

  let isDragging = false;
  let initialX = 0;
  let initialTime = 0;

  draggableLine.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDragging = true;
    initialX = event.clientX;
    initialTime = currentTime;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  });

  const mouseMoveHandler = (event) => {
    if (isDragging) {
      const currentX = event.clientX;
      const deltaX = currentX - initialX;

      const sensitivity = 0.03; 

      const timeChange = deltaX * sensitivity;

      currentTime = Math.max(0, initialTime + timeChange);
      currentTime = Math.min(currentTime, maxTime);

      updateTimerAndLine();
    }
  };

  const mouseUpHandler = () => {
    isDragging = false;
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  playButton.addEventListener("click", () => {
    if (!timerInterval) {
      startTimer();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
    }
  });
});
