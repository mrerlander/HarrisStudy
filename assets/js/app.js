document.addEventListener("DOMContentLoaded", function () {
  let checkBox = document.getElementById("consent");
  let checkBoxAlt = document.getElementById("consent-alt");
  let nextBtn = document.getElementById("submit-button");
  let nextBtnAlt = document.getElementById("submit-button-alt");
  let inst1 = document.getElementById("instructions-one");
  let inst2 = document.getElementById("instructions-two");
  let instructionsBtn = document.getElementById("instructions-button");
  let childCountry = document.getElementById("child-country");
  let debriefBtn = document.getElementById("debrief-button");
  let debriefBtnAlt = document.getElementById("debrief-button-alt");
  let debriefText = document.getElementById("debrief-text");
  let debriefTextAlt = document.getElementById("debrief-text-alt");
  let code = document.getElementById("code");
  let codeAlt = document.getElementById("code-alt");
  let usChild = document.getElementById("child-country");
  let childZipQ = document.getElementById("child-zip");
  let oldZip = document.getElementById("old-zip");
  let city = document.getElementById("city");
  let country = document.getElementById("country");
  let cityDiv = document.getElementById("city-div");
  let countryDiv = document.getElementById("country-div");
  let subjectPool;

  if (document.URL.includes("study.html")) {
    if (!localStorage.getItem("consent")) {
      if (!localStorage.getItem("subjectPool")) {
        window.location.href = "index.html";
      } else {
        window.location.href = "consent.html";
      }
    }
  }

  if (checkBox) {
    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };
  }

  if (checkBoxAlt) {
    checkBoxAlt.onchange = function () {
      if (this.checked) {
        nextBtnAlt.disabled = false;
      } else {
        nextBtnAlt.disabled = true;
      }
    };
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (nextBtnAlt) {
    nextBtnAlt.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("subjectPool", "true");
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault;

      inst1.style.display = "none";

      if (inst2.style.display === "block") {
        window.location.href = "study.html";
      }

      inst2.style.display = "block";
    });
  }

  if (childCountry) {
    childCountry.onchange = function () {
      if (this.value === "Yes") {
        childZipQ.style.display = "block";
        countryDiv.style.display = "none";
        cityDiv.style.display = "none";
        oldZip.required = true;
        city.value = "";
        country.value = "";
        country.required = false;
        city.required = false;
      } else {
        childZipQ.style.display = "none";
        countryDiv.style.display = "block";
        cityDiv.style.display = "block";
        country.required = true;
        city.required = true;
        oldZip.required = false;
        oldZip.value = "";
      }
    };
  }

  if (debriefBtn) {
    debriefBtn.addEventListener("click", function (e) {
      e.preventDefault;
      debriefText.style.display = "none";
      code.style.display = "block";
      localStorage.removeItem("consent");
    });
  }

  if (debriefBtnAlt) {
    debriefBtnAlt.addEventListener("click", function (e) {
      e.preventDefault;
      debriefTextAlt.style.display = "none";
      codeAlt.style.display = "block";
      localStorage.removeItem("consent");
      localStorage.removeItem("subjectPool");
    });
  }

  let faces = [
    "./assets/images/PhotoshopKH2.jpg",
    "./assets/images/rsz_1bf225_2.jpg",
    "./assets/images/rsz_1bf254_2.jpg",
    "./assets/images/rsz_1bfage393_2.jpg",
    "./assets/images/rsz_1if3.jpg",
    "./assets/images/rsz_1if5.jpg",
    "./assets/images/rsz_2bf238_2.jpg",
    "./assets/images/rsz_2bfage39_3.jpg",
    "./assets/images/rsz_2if4.jpg",
    "./assets/images/rsz_3if1.jpg",
    "./assets/images/rsz_3if2.jpg",
  ];

  facePairs = [];
  facePairsOriginal = [];

  function pairs(arr) {
    let l = arr.length;

    for (let i = 0; i < l; i++) {
      for (let j = i + 1; j < l; j++) {
        facePairs.push([arr[i], arr[j]]);
        facePairsOriginal.push([arr[i], arr[j]]);
      }
    }
  }

  pairs(faces);

  let test = "harris";

  // let firebaseConfig = {
  //   apiKey: "AIzaSyCAiQq7AGfVPamHHSN_ObkAIsn8LFALkP8",
  //   authDomain: "mds-base-script.firebaseapp.com",
  //   databaseURL: "https://mds-base-script.firebaseio.com",
  //   projectId: "mds-base-script",
  //   storageBucket: "mds-base-script.appspot.com",
  //   messagingSenderId: "377022607691",
  //   appId: "1:377022607691:web:5f28b6a13b60a6168f38ce",
  //   measurementId: "G-NMTK4X8L1S",
  // };

  // let firebaseConfig2 = {
  //   apiKey: "AIzaSyARjmqlMf7UhFA8buKB5OIQ2VreaqMz4l0",
  //   authDomain: "facestudy-7aa90.firebaseapp.com",
  //   databaseURL: "https://facestudy-7aa90.firebaseio.com",
  //   projectId: "facestudy-7aa90",
  //   storageBucket: "facestudy-7aa90.appspot.com",
  //   messagingSenderId: "517061399659",
  //   appId: "1:517061399659:web:021d269da8ffd264b58d2e",
  //   measurementId: "G-TTFMER2NY5",
  // };

  // // Initialize Firebase
  // let primaryDB = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  // let secondaryDB = firebase.initializeApp(firebaseConfig2, "secondary");
  // secondaryDB.analytics();

  let today = new Date();
  let todayString = today.toDateString();

  // let refPrimary = primaryDB.database().ref(todayString);
  // let newUserRef = refPrimary.push();

  // let id = newUserRef.key;
  let id = "test";

  class FaceRating {
    constructor(face1, face2, rating, id, test) {
      this.firstFace = face1;
      this.secondFace = face2;
      this.rating = rating;
      this.id = id;
      this.test = test;
    }
  }

  let count = 0;
  let temp = [0, 0];
  let ratingsArr = [];
  let buttons = document.getElementsByClassName("rating-btn");
  let pair = [0, 0];
  let counter = 0;
  let pairIndex;

  function loadFaces() {
    faceOneDiv = document.getElementById("face-one");
    faceTwoDiv = document.getElementById("face-two");

    do {
      if (count == facePairsOriginal.length) {
        disableButtons();
        document.getElementById("study-div").style.display = "none";
        document.getElementById("info-form").style.display = "block";
        buttonSubmit.disabled = false;
        break;
      }
      pairIndex = Math.floor(Math.random() * facePairs.length);
      console.log(pairIndex);
      pair = facePairs[pairIndex];
      console.log(pair[0] + " " + temp[0] + "-----" + pair[1] + " " + temp[1]);
      counter++;
      if (facePairs.length <= 4) {
        break;
      }
    } while (pair[0] === temp[0] || pair[0] === temp[1] || pair[1] === temp[0] || pair[1] === temp[1]);

    temp = pair;
    counter = 0;

    if (!faceOneDiv.firstElementChild || !faceTwoDiv.firstElementChild) {
      faceOneEl = document.createElement("img");
      faceTwoEl = document.createElement("img");

      faceOneEl.setAttribute("id", "face-1");
      faceTwoEl.setAttribute("id", "face-2");
      faceOneEl.setAttribute("src", pair[0]);
      faceTwoEl.setAttribute("src", pair[1]);
      faceOneEl.setAttribute("class", "img-fluid mx-auto d-block");
      faceTwoEl.setAttribute("class", "img-fluid mx-auto d-block");

      faceOneDiv.appendChild(faceOneEl);
      faceTwoDiv.appendChild(faceTwoEl);
    } else {
      faceOne = document.getElementById("face-1");
      faceTwo = document.getElementById("face-2");

      faceOneEl.setAttribute("src", pair[0]);
      faceTwoEl.setAttribute("src", pair[1]);
    }

    facePairs.splice(pairIndex, 1);
  }

  function disableButtons() {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.setAttribute("disabled", true);
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.onclick = function () {
      let rating = new FaceRating(
        pair[0].substring(16),
        pair[1].substring(16),
        parseInt(button.innerHTML),
        id,
        test
      );
      ratingsArr.push(rating);

      if (count < 56) {
        count++;
        loadFaces();
      }
    };
  }

  let form = document.getElementById("form");
  let buttonSubmit = document.getElementById("submit-form-button");
  let buttonResubmit = document.getElementById("resubmit-button");
  let debrief = "debrief.html";

  form.onsubmit = submit;
  function submit(e) {
    e.preventDefault();
    let age = form.firstElementChild.lastElementChild.value;
    let race = form.children[1].lastElementChild.value;
    let gender = form.children[2].lastElementChild.value;
    let oldZip = form.children[6].lastElementChild.value;
    let childCountry = form.children[4].lastElementChild.value;
    let childCity = form.children[5].lastElementChild.value;
    let newZip = form.children[7].lastElementChild.value;

    if (!localStorage.getItem("subjectPool")) {
      subjectPool = false;
    } else {
      subjectPool = true;
      debrief = "debriefsp.html";
    }

    buttonSubmit.disabled = true;
    buttonSubmit.style.display = "none";
    buttonResubmit.style.display = "block";
    buttonResubmit.innerText = "Loading...";

    if (oldZip === "") {
      oldZip = "none";
    }

    if (childCountry === "") {
      childCountry = "United States";
    }

    if (childCity === "") {
      childCity = "none";
    }

    ratingsArr.forEach(function (element) {
      element.age = age;
      element.race = race;
      element.gender = gender;
      element.oldZip = oldZip;
      element.country = childCountry;
      element.city = childCity;
      element.newZip = newZip;
      element.test = test;
      element.subjectPool = subjectPool;
    });

    buttonSubmit.addEventListener("click", writeToDBs);
    writeToDBs();
  }

  let errorCode = 2;

  function writeToDBs() {
    if (errorCode == 2) {
      secondaryDB
        .database()
        .ref(todayString + "/" + id)
        .set(ratingsArr)
        .then(function () {
          newUserRef
            .set(ratingsArr)
            .then(function () {
              form.reset();
              console.log("boop");
              console.log(debrief);
              window.location.href = debrief;
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Please try again. (error code 1) first catch"
              );
              errorCode = 1;
              buttonResubmit.disabled = false;
              buttonResubmit.innerText = "Submit";
            });
        })
        .catch(function (error) {
          alert(
            "There was an error with your submission. Please try again. (error code 2)"
          );
          errorCode = 2;
          buttonResubmit.disabled = false;
          buttonResubmit.innerText = "Submit";
        });
    }

    if (errorCode == 1) {
      newUserRef
        .set(ratingsArr)
        .then(function () {
          form.reset();
          window.location.href = debrief;
        })
        .catch(function (error) {
          alert(
            "There was an error with your submission. Please try again. (error code 1)"
          );
          errorCode = 1;
          buttonSubmit.style.display = "block";
          buttonResubmit.style.display = "none";
        });
    }
  }

  loadFaces();
});
