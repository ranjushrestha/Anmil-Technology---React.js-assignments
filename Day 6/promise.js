
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function runTask() {
  console.log("Loading game assets...");

  await delay(5000); 

  console.log("Game ready to play!");
}

runTask();
