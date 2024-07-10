if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then((reg) => {
      console.log("Registration Successful");
    })
    .catch(() => {
      console.log("Registration Failed");
    });
}

