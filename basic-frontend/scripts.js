const doSomething = () => {
  let exampleInput = document.getElementById("exampleInput").value;
  document.getElementById("exampleParagraph").textContent = exampleInput;
};

document.getElementById("exampleButton").addEventListener("click", doSomething);
