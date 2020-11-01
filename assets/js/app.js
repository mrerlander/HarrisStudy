document.addEventListener("DOMContentLoaded", function () {
  let checkBox = document.getElementById("consent");
  let checkBoxAlt = document.getElementById("consent-alt");
  let nextBtn = document.getElementById("submit-button");
  let nextBtnAlt = document.getElementById("submit-button-alt");
  let inst1 = document.getElementById("instructions-one");
  let inst2 = document.getElementById("instructions-two");
  let instructionsBtn = document.getElementById("instructions-button");
  let debriefBtn = document.getElementById("debrief-button");
  let debriefBtnAlt = document.getElementById("debrief-button-alt");
  let debriefText = document.getElementById("debrief-text");
  let debriefTextAlt = document.getElementById("debrief-text-alt");
  let code = document.getElementById("code");
  let codeAlt = document.getElementById("code-alt");
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

  let warrenPic = "./assets/images/Ewarren_survey.jpg";
  let harrisPic = "./assets/images/KHStudy2.jpg";
  let ricePic = "./assets/images/CR_survey.jpg";

  let faces = [
    "./assets/images/KHStudy2.jpg",
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

  let firebaseConfig = {
    apiKey: "AIzaSyBVeKr1wudvt19gzArfxquERgcWhR8pihI",
    authDomain: "harrisstudy-f96ac.firebaseapp.com",
    databaseURL: "https://harrisstudy-f96ac.firebaseio.com",
    projectId: "harrisstudy-f96ac",
    storageBucket: "harrisstudy-f96ac.appspot.com",
    messagingSenderId: "694693478982",
    appId: "1:694693478982:web:05115fb564c98cf8650047",
    measurementId: "G-WGJPHD44M0"
  };

  // Initialize Firebase
  let primaryDB = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let today = new Date();
  let todayString = today.toDateString();

  let refPrimary = primaryDB.database().ref(todayString);
  let newUserRef = refPrimary.push();
  let ratingsRef = primaryDB.database().ref(todayString + "/" + newUserRef.key + "/ratings");
  let surveyRef = primaryDB.database().ref(todayString + "/" + newUserRef.key + "/survey");

  let id = newUserRef.key;

  class FaceRating {
    constructor(face1, face2, rating, id) {
      this.firstFace = face1;
      this.secondFace = face2;
      this.rating = rating;
      this.id = id;
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
        document.getElementById("info-survey").style.display = "block";
        ewPicDiv = document.getElementById("ew-pic");
        khPicDiv = document.getElementById("kh-pic");
        crPicDiv = document.getElementById("cr-pic");
        warrenEl = document.createElement("img");
        harrisEl = document.createElement("img");
        riceEl = document.createElement("img");
        warrenEl.setAttribute("id", "warren");
        harrisEl.setAttribute("id", "harris");
        riceEl.setAttribute("id", "rice");
        warrenEl.setAttribute("src", warrenPic);
        harrisEl.setAttribute("src", harrisPic);
        riceEl.setAttribute("src", ricePic);
        warrenEl.setAttribute("class", "img-fluid mx-auto d-block");
        harrisEl.setAttribute("class", "img-fluid mx-auto d-block");
        riceEl.setAttribute("class", "img-fluid mx-auto d-block");

        ewPicDiv.appendChild(warrenEl);
        khPicDiv.appendChild(harrisEl);
        crPicDiv.appendChild(riceEl);
        buttonSubmit.disabled = false;
        break;
      }
      pairIndex = Math.floor(Math.random() * facePairs.length);
      pair = facePairs[pairIndex];
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

  let survey = document.getElementById("survey");
  let buttonContinue = document.getElementById("submit-survey-one");
  let warrenRadios = document.getElementsByName("options-1");
  let warrenAnswer;
  let harrisRadios = document.getElementsByName("options-2");
  let harrisAnswer;
  let riceRadios = document.getElementsByName("options-3");
  let riceAnswer;
  let warrenChecked = false;
  let harrisChecked = false;
  let riceChecked = false;
  let survey2 = document.getElementById("survey-two");
  let buttonContinueTwo = document.getElementById("submit-survey-two");
  let khEthRadios = document.getElementsByName("options-kh");
  let khEthAnswer;
  let ewEthRadios = document.getElementsByName("options-ew");
  let ewEthAnswer;
  let crEthRadios = document.getElementsByName("options-cr");
  let crEthAnswer;
  let warrenEthChecked = false;
  let harrisEthChecked = false;
  let riceEthChecked = false;
  let userSurvey = {};
  let survey3 = document.getElementById("survey-three");
  let buttonContinueThree = document.getElementById("submit-survey-three");
  let survey4 = document.getElementById("survey-four");
  let buttonContinueFour = document.getElementById("submit-survey-four");
  let orientationRadios = document.getElementsByName("options-pol");
  let orientationAnswer;
  let orientationChecked = false;
  let presRadios = document.getElementsByName("options-pres");
  let presAnswer;
  let presChecked = false;
  let discriminationRadios = document.getElementsByName("options-disc");
  let discriminationAnswer;
  let discriminationChecked = false;
  let angerRadios = document.getElementsByName("options-anger");
  let angerAnswer;
  let angerChecked = false;
  let desegregationRadios = document.getElementsByName("options-desegregation");
  let desegregationAnswer;
  let desegregationChecked = false;
  let rightsRadios = document.getElementsByName("options-rights");
  let rightsAnswer;
  let rightsChecked = false;
  let wantedRadios = document.getElementsByName("options-wanted");
  let wantedAnswer;
  let wantedChecked = false;
  let econRadios = document.getElementsByName("options-econ");
  let econAnswer;
  let econChecked = false;
  let respectRadios = document.getElementsByName("options-respect");
  let respectAnswer;
  let respectChecked = false;
  let survey5 = document.getElementById("survey-five");
  let buttonContinueFive = document.getElementById("submit-survey-five");
  let survey6 = document.getElementById("survey-six");
  let buttonContinueSix = document.getElementById("submit-survey-six");

  for (let i = 0; i < warrenRadios.length; i++) {
    warrenRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      warrenAnswer = this.value;
      warrenChecked = true;
      if (warrenChecked && harrisChecked && riceChecked) {
        buttonContinue.disabled = false;
      }
    });
  }

  for (let i = 0; i < harrisRadios.length; i++) {
    harrisRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      harrisAnswer = this.value;
      harrisChecked = true;
      if (warrenChecked && harrisChecked && riceChecked) {
        buttonContinue.disabled = false;
      }
    });
  }

  for (let i = 0; i < riceRadios.length; i++) {
    riceRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      riceAnswer = this.value;
      riceChecked = true;
      if (warrenChecked && harrisChecked && riceChecked) {
        buttonContinue.disabled = false;
      }
    });
  }

  survey.onsubmit = continueForm;

  function continueForm(e) {
    e.preventDefault();

    userSurvey.warrenAnswer = warrenAnswer;
    userSurvey.harrisAnswer = harrisAnswer;
    userSurvey.riceAnswer = riceAnswer;
    userSurvey.id = id;

    buttonContinue.disabled = true;
    ewEthPicDiv = document.getElementById("ew-ethnicity-pic");
    khEthPicDiv = document.getElementById("kh-ethnicity-pic");
    crEthPicDiv = document.getElementById("cr-ethnicity-pic");
    warrenEthEl = document.createElement("img");
    harrisEthEl = document.createElement("img");
    riceEthEl = document.createElement("img");
    warrenEthEl.setAttribute("id", "warrenEth");
    harrisEthEl.setAttribute("id", "harrisEth");
    riceEthEl.setAttribute("id", "riceEth");
    warrenEthEl.setAttribute("src", warrenPic);
    harrisEthEl.setAttribute("src", harrisPic);
    riceEthEl.setAttribute("src", ricePic);
    warrenEthEl.setAttribute("class", "img-fluid mx-auto d-block");
    harrisEthEl.setAttribute("class", "img-fluid mx-auto d-block");
    riceEthEl.setAttribute("class", "img-fluid mx-auto d-block");

    ewEthPicDiv.appendChild(warrenEl);
    khEthPicDiv.appendChild(harrisEl);
    crEthPicDiv.appendChild(riceEl);

    document.getElementById("info-survey").style.display = "none";
    document.getElementById("info-survey-two").style.display = "block";
    window.scrollTo(0, 0);
  }

  for (let i = 0; i < khEthRadios.length; i++) {
    khEthRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      khEthAnswer = this.value;
      harrisEthChecked = true;
      if (warrenEthChecked && harrisEthChecked && riceEthChecked) {
        buttonContinueTwo.disabled = false;
      }
    });
  }

  for (let i = 0; i < ewEthRadios.length; i++) {
    ewEthRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      ewEthAnswer = this.value;
      warrenEthChecked = true;
      if (warrenEthChecked && harrisEthChecked && riceEthChecked) {
        buttonContinueTwo.disabled = false;
      }
    });
  }

  for (let i = 0; i < crEthRadios.length; i++) {
    crEthRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      crEthAnswer = this.value;
      riceEthChecked = true;
      if (warrenEthChecked && harrisEthChecked && riceEthChecked) {
        buttonContinueTwo.disabled = false;
      }
    });
  }

  let sliders = document.getElementsByClassName("percent");

  for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("input", function (e) {
      e.preventDefault;
      output = document.getElementById(this.id + "-out");
      output.setAttribute("placeholder", this.value + "%");
    });
  }

  survey2.onsubmit = continueForm2;

  function continueForm2(e) {
    e.preventDefault();
    buttonContinueTwo.disabled = true;
    buttonContinueThree.disabled = false;
    document.getElementById("info-survey-two").style.display = "none";
    document.getElementById("info-survey-three").style.display = "block";
    let khBlackVal = document.getElementById("kh-black-range").value;
    let khWhiteVal = document.getElementById("kh-white-range").value;
    let khIndianVal = document.getElementById("kh-indian-range").value;
    let khMultiVal = document.getElementById("kh-multi-range").value;
    let ewBlackVal = document.getElementById("ew-black-range").value;
    let ewWhiteVal = document.getElementById("ew-white-range").value;
    let ewIndianVal = document.getElementById("ew-indian-range").value;
    let ewMultiVal = document.getElementById("ew-multi-range").value;
    let crBlackVal = document.getElementById("cr-black-range").value;
    let crWhiteVal = document.getElementById("cr-white-range").value;
    let crIndianVal = document.getElementById("cr-indian-range").value;
    let crMultiVal = document.getElementById("cr-multi-range").value;

    userSurvey.khEthAnswer = khEthAnswer;
    userSurvey.khBlackVal = khBlackVal;
    userSurvey.khWhiteVal = khWhiteVal;
    userSurvey.khIndianVal = khIndianVal;
    userSurvey.khMultiVal = khMultiVal;
    userSurvey.ewEthAnswer = ewEthAnswer;
    userSurvey.ewBlackVal = ewBlackVal;
    userSurvey.ewWhiteVal = ewWhiteVal;
    userSurvey.ewIndianVal = ewIndianVal;
    userSurvey.ewMultiVal = ewMultiVal;
    userSurvey.crEthAnswer = crEthAnswer;
    userSurvey.crBlackVal = crBlackVal;
    userSurvey.crWhiteVal = crWhiteVal;
    userSurvey.crIndianVal = crIndianVal;
    userSurvey.crMultiVal = crMultiVal;
  
    buttonContinueTwo.disabled = true;
    survey2.style.display = "none";
    survey3.style.display = "block";
  }

  survey3.onsubmit = continueForm3;

  function continueForm3(e) {
    e.preventDefault();
    
    let ancestryInfo = document.getElementById("ancestry-info").value;

    userSurvey.ancestryInfo = ancestryInfo;

    buttonContinueThree.disabled = true;
    buttonContinueFour.disabled = false;
    survey3.style.display = "none";
    survey4.style.display = "block";
    document.getElementById("info-survey-three").style.display = "none";
    document.getElementById("info-survey-four").style.display = "block";
  }

  let scaleSliders = document.getElementsByClassName("scale");

  for (let i = 0; i < scaleSliders.length; i++) {
    scaleSliders[i].addEventListener("input", function (e) {
      e.preventDefault;
      output = document.getElementById(this.id + "-out");
      output.setAttribute("placeholder", this.value);

    });
  }

  survey4.onsubmit = continueForm4;

  function continueForm4(e) {
    e.preventDefault();

    let ancestry = document.getElementById("ancestry").value;
    let appearance = document.getElementById("appearance").value;
    let identifies = document.getElementById("identifies").value;

    userSurvey.ancestryVal = ancestry;
    userSurvey.appearanceVal = appearance;
    userSurvey.identifiesVal = identifies;

    document.getElementById("info-survey-four").style.display = "none";
    document.getElementById("info-survey-five").style.display = "block";

    buttonContinueFour.disabled = true;
    survey4.style.display = "none";
    survey5.style.display = "block";

  }

  for (let i = 0; i < orientationRadios.length; i++) {
    orientationRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      orientationAnswer = this.value;
      orientationChecked = true;
      if (orientationChecked && presChecked) {
        buttonContinueFive.disabled = false;
      }
    });
  }

  for (let i = 0; i < presRadios.length; i++) {
    presRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      presAnswer = this.value;
      presChecked = true;
      if (orientationChecked && presChecked) {
        buttonContinueFive.disabled = false;
      }
    });
  }

  survey5.onsubmit = continueForm5;

  function continueForm5(e) {
    e.preventDefault();

    userSurvey.orientation = orientationAnswer;
    userSurvey.president =  presAnswer;

    document.getElementById("info-survey-five").style.display = "none";
    document.getElementById("info-survey-six").style.display = "block";

    buttonContinueFive.disabled = true;
    survey5.style.display = "none";
    survey6.style.display = "block";
  }

  for (let i = 0; i < discriminationRadios.length; i++) {
    discriminationRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      discriminationAnswer = this.value;
      discriminationChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < angerRadios.length; i++) {
    angerRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      angerAnswer = this.value;
      angerChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < desegregationRadios.length; i++) {
    desegregationRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      desegregationAnswer = this.value;
      desegregationChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < rightsRadios.length; i++) {
    rightsRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      rightsAnswer = this.value;
      rightsChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < wantedRadios.length; i++) {
    wantedRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      wantedAnswer = this.value;
      wantedChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < econRadios.length; i++) {
    econRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      econAnswer = this.value;
      econChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  for (let i = 0; i < respectRadios.length; i++) {
    respectRadios[i].addEventListener("click", function (e) {
      e.preventDefault;
      respectAnswer = this.value;
      respectChecked = true;
      if (
        discriminationChecked &&
        angerChecked &&
        desegregationChecked &&
        rightsChecked &&
        wantedChecked &&
        econChecked &&
        respectChecked
      ) {
        buttonContinueSix.disabled = false;
      }
    });
  }

  survey6.onsubmit = continueForm6;

  function continueForm6(e) {
    e.preventDefault();

    userSurvey.discrimination = discriminationAnswer;
    userSurvey.anger = angerAnswer;
    userSurvey.desegregation = desegregationAnswer;
    userSurvey.rights = rightsAnswer;
    userSurvey.wanted = wantedAnswer;
    userSurvey.econ = econAnswer;
    userSurvey.respect = respectAnswer;

    buttonContinue.disabled = true;
    document.getElementById("info-survey-six").style.display = "none";
    document.getElementById("info-form").style.display = "block";
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

    userSurvey.age = age;
    userSurvey.race = race;
    userSurvey.gender = gender;
    userSurvey.test = test;

    ratingsArr.forEach(function (element) {
      element.age = age;
      element.race = race;
      element.gender = gender;
      element.test = test;
    });

    buttonSubmit.addEventListener("click", writeToDBs);
    writeToDBs();
  }

  let errorCode = 2;

  function writeToDBs() {
    if (errorCode == 2) {
          ratingsRef
            .set(ratingsArr)
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Please try again. (error code 1)"
              );
              errorCode = 1;
              buttonResubmit.disabled = false;
              buttonResubmit.innerText = "Submit";
            });
          
          surveyRef
            .set(userSurvey)
            .then(function () {
              form.reset();
              window.location.href = debrief;
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Please try again. (error code 1.1)"
              );
              errorCode = 1;
              buttonResubmit.disabled = false;
              buttonResubmit.innerText = "Submit";
            });
    }

    if (errorCode == 1) {
      ratingsRef
            .set(ratingsArr)
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Please try again. (error code 1)"
              );
              errorCode = 1;
              buttonResubmit.disabled = false;
              buttonResubmit.innerText = "Submit";
            });
          
          surveyRef
            .set(userSurvey)
            .then(function () {
              form.reset();
              console.log(debrief);
              window.location.href = debrief;
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Please try again. (error code 1.1)"
              );
              errorCode = 1;
              buttonResubmit.disabled = false;
              buttonResubmit.innerText = "Submit";
            });
    }
  }

  loadFaces();
});
