//Things I learned: How to dynamically include options into an HTML form
//Things I changed: I created two functions to handle input. One for errors. One for calculating the tip.
//I broke out the feedback into three different feeds. Before, all three would show for just one error.
//Added a validator to only calculate if feedback wasn't received.
//Added a toFixed method to the output
// Made input disappear after submitting
//Bug. I had setInterval in my code instead of setTimeout. 





(function () {



  // select options

  const services = [

    {
      value: 1,
      title: "great -20%"
    },
    {
      value: 2,
      title: "ok -10%"
    },
    {
      value: 3,
      title: 'bad -2%'
    }

  ]

  // add select options to the select element

  services.forEach(service => {

    const option = document.createElement('option');
    option.textContent = service.title;
    option.value = service.value;
    console.log(option);
    document.querySelector('#input-service').appendChild(option);
  })

  // get all the values

  const form = document.querySelector('#tip-form');

  const amount = document.querySelector('#input-bill');
  const users = document.querySelector('#input-users');
  const service = document.querySelector('#input-service');

  // customer feedback

  const feedback = document.querySelector('.feedback');
  const loader = document.querySelector('.loader');
  const results = document.querySelector('.results');

  // submit form
  form.addEventListener('submit', function (event) {

    event.preventDefault();

    let bill = amount.value;
    let people = users.value;
    let quality = service.value;

    if (bill === '' || bill <= '0' || ( people === '' || people <= '0') || quality === '0') {

      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML = `
      
      <p>please check the values</p>
      <p>bill amount cannoet be less than zero</p>
      <p>people sharing the bill cannot be less than zero</p>
      <p>service has to be selected</p>
      `;

      setTimeout(function () {

        feedback.classList.remove('showItem', 'alert-danger');
      }, 10000)
    } else {
      feedback.classList.add('showItem', 'alert-success');
      feedback.innerHTML = `<p>calculating... </p>`;
      loader.classList.add('showItem');

      setTimeout(function() {
        loader.classList.remove('showItem', 'alert-success');

        showResults(bill, people, quality);
        clearForm();
      }, 4000);
    }
  });

  // show results

  function showResults(bill, people, quality) {

    let percentage = 0;

    if(quality === '1') {
      percentage = 0.2;
    } else if (quality === '2') {
      percentage = 0.1;
    } else if (quality === "3") {
      percentage = 0.02;
    }

    // parseint ==> convert string to number

    let tipAmount = parseInt(bill) * percentage;
    let total = parseInt(bill) + tipAmount;
    let person = total / parseInt(people); 

    results.classList.add('showItem');
    document.querySelector('#tip-amount').textContent = tipAmount;
    document.querySelector('#total-amount').textContent = total;
    document.querySelector('#person-amount').textContent = person.toFixed(2);
  }

  


  // clear form

  function clearForm() {

    amount.value = '';
    users.value = '';
    service.value = '';
  }

})();




















/*
(function () {

  // global variables

  let inputBill = document.querySelector('#input-bill');
  let inputUsers = document.querySelector('#input-users');
  let inputService = document.querySelector('#input-service');
  console.log('check inputService: ' + inputService.value);
  let inputForms = document.querySelectorAll('.form-control');
  let button = document.querySelector('.submitBtn');

  let feedback = document.querySelector('.feedback');

  let tipAmount = document.querySelector('#tip-amount');

  // input bill / 20% || 10% || 2%
  let totalAmount = document.querySelector('#total-amount');
  // inputbill + tipamount
  let personAmount = document.querySelector('#person-amount');
  // totalamount / inputusers
  let result = document.querySelector('.results');

  const services = [{
    value: 1,
    title: 'great -20%'
  }, {
    value: 2,
    title: 'good -10%'
  }, {
    value: 3,
    title: 'bad -2%'
  }]

  // get value from the inputs

  // value inputbill

  inputBill.addEventListener('keyup', function (e) {


    let billValue = e.target.value;
    console.log('check billvalue:' + billValue);

    return inputBill;
  })

  // value inputusers

  inputUsers.addEventListener('keyup', function totalAmount(e) {

    let usersValue = e.target.value;
    console.log('check usersvalue:' + usersValue)


    return usersValue;
  })

  // value inputservice

  inputService.addEventListener('change', function (e) {

    let serviceValue = e.target.value;
    console.log('check serviceValue: ' + serviceValue);
    console.log(typeof serviceValue);
    let valueNumber = ''

    if (serviceValue === '1') {
      valueNumber = 20;
      console.log('valuenumber 1: ' + valueNumber);
    } else if (serviceValue === '2') {
      valueNumber = 10;
      console.log('valuenumber 2: ' + valueNumber);
    } else if (serviceValue === '3') {
      valueNumber = 2;
      console.log('valuenumber 3: ' + valueNumber);
    }

    return valueNumber

    console.log('return valuenumber' + valueNumber)

  })

  // add texts in feedback section

  const feedbackTextBill = document.createElement('p');
  const feedbackTextUsers = document.createElement('p');
  const feedbackTextService = document.createElement('p');

  feedbackTextBill.textContent = 'Bill Amount Cannot Be Blank';
  feedbackTextUsers.textContent = 'Number Of Users Must Be Greater Than Zero';
  feedbackTextService.textContent = 'You Must Select A Service';

  feedbackTextBill.setAttribute('id', 'feedback-bill');
  feedbackTextUsers.setAttribute('id', 'feedback-users');
  feedbackTextService.setAttribute('id', 'feedback-service');

  feedback.append(feedbackTextBill);
  feedback.append(feedbackTextUsers);
  feedback.append(feedbackTextService);

  // click event button
  button.addEventListener('click', function (e) {

    e.preventDefault();

    // show feedback

    // display feedback section for 5 sec

    feedback.classList.add('showItem');
    feedback.classList.add('alert-danger');

    setTimeout(function() {
      feedback.classList.remove('showItem');
    }, 5000)


    if(inputBill.value !== '') {
      feedbackTextBill.style.display = 'none';
      console.log('hide feedbackbill text');
    } else if (inputUsers.value !== '') {
      feedbackTextUsers.style.display = 'none';
      console.log('hide feedbacksusers text');
    }


    if (inputBill.value !== '' && inputUsers.value !== '') {
      feedbackTextBill.style.display = 'none';
      feedbackTextUsers.style.display = 'none';
    }

    if (inputService.value === '0') {
      feedbackTextService.style.display = 'block';
      console.log('display feedbackservice text');
    }  else if (inputService.value === '1' || inputService.value === '2' || inputService.value === '3') {
      feedbackTextService.style.display = 'none';
    }

    // display results for 5 sec
    result.style.display = 'block';
    //display the values in text

    tipAmount.textContent = inputBill.value ;
    totalAmount.textContent = inputUsers.value;

  })

  function calculateTip(inputBill, inputUsers, inputService) {

    console.log('this is inputvaluebill: ' + inputBill)
  }

  calculateTip(totalAmount())

  // create options element with the selected options

  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  const option3 = document.createElement('option');

  // add title in textcontent option
  option1.textContent = services[0].title;
  option2.textContent = services[1].title;
  option3.textContent = services[2].title;

  // add attribute with value in option
  option1.setAttribute('value', 1);
  option2.setAttribute('value', 2);
  option3.setAttribute('value', 3);

  // append option to select
  inputService.append(option1);
  inputService.append(option2);
  inputService.append(option3);

})();
*/
/*
(function () {

  //Set up a service array
  const services = [{
    value: 1,
    title: "great - 20%"
  }, {
    value: 2,
    title: "good - 10%"
  }, {
    value: 3,
    title: "bad - 2%"
  }]


  const validateInput = function (billAmount, numUsers, selectedService) {

    // set to false cause it doesn't have to be shown if everything has been given
    let isFeedback = false;
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = '';

    // display text for bill
    if (billAmount === "" || billAmount <= "0") {
      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML += `<p>Bill amount cannot be blank</p>`
      isFeedback = true;
    }

    // display text for users
    if (numUsers <= "0") {
      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
      isFeedback = true;
    }
    // display text for services
    if (selectedService === "0") {
      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML += `<p>You must select a Service</p>`
      isFeedback = true;
    }
    // set time out for removing feedback section after 10 sec
    setTimeout(function () {
      feedback.classList.remove('showItem', 'alert-danger');
    }, 10000);

    return isFeedback;

  }; // end validateInput



  /////////////////////////
  const calculateTip = function (billAmount, numUsers, selectedService) {

    let percentTip = '';
    if (selectedService === "1") {
      percentTip = 0.2;
    } else if (selectedService === "2") {
      percentTip = 0.1;
    } else {
      percentTip = 0.02;
    }

    const tipAmount = Number(billAmount) * percentTip;
    console.log('check tipAmount: ' + tipAmount);
    const totalAmount = Number(billAmount) + Number(tipAmount);
    console.log('check totalAmount: ' + totalAmount);
    const eachPerson = Number(totalAmount) / Number(numUsers);
    console.log('check eachPerson: ' + eachPerson);

    return [tipAmount, totalAmount, eachPerson];


  };


  //FORM SETUP - ADD SERVICES
  services.forEach(function (service) {
    //create the option element
    const option = document.createElement('option');
    option.textContent = service.title;

    option.value = service.value;

    //select the select element from the DOM
    const select = document.querySelector('#input-service');
    select.appendChild(option);
  })

   //FORM SETUP - ADD EVENT LISTENER AND FUNCTION CALLS
    const inputForm = document.querySelector('form');
    inputForm.addEventListener('submit', function(e){

    e.preventDefault();


    //grab elements from the DOM
    const inputBill = document.querySelector('#input-bill');
    const inputUsers = document.querySelector('#input-users');
    const serviceValue = document.querySelector('#input-service');

     //get values from DOM elements
    let billAmount = inputBill.value;
    let  numUsers = inputUsers.value;
    let selectedService = serviceValue.value;

    //get feedback if info is not validated
    const isFeedback = validateInput(billAmount, numUsers, selectedService);
    console.log('check isFeedback: ' + isFeedback);

     //calculated tip if info was validated
      if (!isFeedback){
          const loader = document.querySelector('.loader');
          const resultsDOM = document.querySelector('.results');
          const tipResultsDOM = document.querySelector('#tip-amount');
          const totalAmountDOM = document.querySelector('#total-amount');
          const eachPersonDOM = document.querySelector('#person-amount');

         //calculate results
          const results = calculateTip(billAmount, numUsers, selectedService);
          console.log('check results: ' + results)
         //show loader
         loader.classList.add('showItem');
         // show results after 2 seconds

         setTimeout(function(){
          loader.classList.remove('showItem');
          tipResultsDOM.textContent= `${results[0].toFixed(2)}`
          totalAmountDOM.textContent= `${results[1].toFixed(2)}`
          eachPersonDOM.textContent= `${results[2].toFixed(2)}`
          resultsDOM.classList.add('showItem');
        },2000)

        //clear values from DOM elements after 5 seconds
        setTimeout(function(){
          inputBill.value = '';
          inputUsers.value = '';
          serviceValue.value = 0;
          resultsDOM.classList.remove('showItem');
        }, 10000)


      } //end isFeedback statement

    }); //end eventListener for form


})();
*/
/*
(function() {

// array services

const services = [{
  value: 1,
  title: "great - 20%"
}, {
  value: 2,
  title: "good - 10%"
},{
  value: 3,
  title: "bad - 2%"
}]


// validateinput

const validateInput = function(billAmount, numUsers, selectedService) {

  let isFeedback = false;
  const feedback = document.querySelector('.feedback');
  feedback.innerHTML = '';

  if(billAmount === '' || billAmount <= '0') {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Bill amount cannot be blank</p>`
    isFeedback = true;
  }

  if(numUsers <= '0') {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
    isFeedback = true;
  }

  if(selectedService === '0') {
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML +=`<p>You must select a Service</p>`;
    isFeedback = true;
  }

  setTimeout(function() {
    feedback.classList.remove('showItem', 'alert-danger')
  }, 2000)

  return isFeedback;
}



  //calculatetip

  const calculateTIp = function(billAmount, numUsers, selectedService) {

    let percentTip = ''
    if(selectedService === '1') {
      percentTip = 0.2;
    } else if(selectedService === '2') {
      percentTip = 0.1;
    } else  {
      percentTip = 0.02;
    }

    const tipAmount = Number(billAmount) * percentTip;
    const totalAmount = Number(billAmount) + Number(tipAmount);
    const eachPerson = Number(totalAmount) / Number(numUsers);

    return [tipAmount, totalAmount, eachPerson]
  }

  // form setup - add services

  services.forEach( service => {

    const option = document.createElement('option');
    option.textContent = service.title;
    option.value = service.value;

    const select = document.querySelector('#input-service');
    select.appendChild(option)
  })

// form setup - add event listeners and functions

const inputForm = document.querySelector('form');
inputForm.addEventListener('submit', function(e) {

  e.preventDefault();

  // grab the elements from the dom

  const inputBill = document.querySelector('#input-bill');
  const inputUsers = document.querySelector('#input-users');
  const inputservice = document.querySelector('#input-service');

  // value from the dom elements

  const billAmount = inputBill.value;
  const numUsers = inputUsers.value;
  const  selectedService = inputservice.value;
  console.log(billAmount);
  console.log(numUsers);
  console.log(selectedService);



  const isFeedback = validateInput(billAmount, numUsers, selectedService);

  if(!isFeedback) {

    const loader = document.querySelector('.loader');
    const resultsDOM = document.querySelector('.results');
    const tipResultsDOM = document.querySelector('#tip-amount');
    const totalAmountDOM = document.querySelector('#total-amount');
    const eachPersonDOM = document.querySelector('#person-amount');

    let results = calculateTIp(billAmount, numUsers, selectedService)

    loader.classList.add('showItem');

    setTimeout(function() {
      loader.classList.remove('showItem');
      tipResultsDOM.textContent = `${results[0].toFixed(2)}`;
      totalAmountDOM.textContent = `${results[1].toFixed(2)}`;
      eachPersonDOM.textContent = `${results[2].toFixed(2)}`;
      resultsDOM.classList.add('showItem')
    }, 2000)

    setTimeout(function() {

      billValue = '';
      usersValue = '';
      serviceValue = 0;
      resultsDOM.classList.remove('showItem')
    }, 5000)
  }
})
})();

*/