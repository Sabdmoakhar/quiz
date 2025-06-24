//question to be added to the cards
const quizQuestions = [
    {q: '1_The first US president name?',
        answers:['John Adams','Thomas Jefferson','George Washington','James Madison'],
        key:['George Washington']
    },
    {q: '2_Who is the united states smartest president?',
        answers: ['John Quincy Adams','Hilary Clinton','Donald Trump','Barak Obama'],
        key:['John Quincy Adams']
    },
    {q: '3_Which one of these boxers won the most awards?',
        answers: ['Joe Fraser','Mohammad Ali', 'George Foreman', 'Mike Tyson'],
        key:['Mohammad Ali']
    },
    {q: '4_Which one of the following is the oldest human ancestor?',
        answers: ['Lucy','Eve','none','option 1 and 2'],
        key:['Lucy']
    },
    {q: '5_Select 2 scientists who had a battle over electricity distribution methods?',
        answers: ['Issac Newton','Nicola Tesla', 'Thomas Edison','Michael Faraday'],
        key:['Nicola Tesla','Thomas Edison'],
    }
]
$('.modal').html(`
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Dynamic Quiz</h2>
        <p><br>Test Your Knowledge</p>
      </div>
      <div class="modal-body">
        <h2>Welcome to my Quiz </h2>
         <p>Enter your name below and click on "Begin" to start.</p>
      </div>
      <div class="modal-footer">
       <div class="input-group mb-3">
  <input id="userName" type="text" class="form-control" placeholder="" aria-describedby="button-addon1">
  <button  class="btn btn-outline-secondary" type="button" id="button-addon1">Begin</button>
  
</div>
<p id="message"></p>
      </div>
    </div>
  </div>
`);
//gettin the modal and initializing it
let myModal = new bootstrap.Modal($('.modal'));
let quizePage = $('#cards-cont');
//showing the modal
myModal.show();
let userInput = '';
$("#button-addon1").on('click',function(){
    let userVal = logIn();
    if(userVal){
        answerLimit();
        myTimer();
        //getting the user input
         userInput = $('#userName').val();
        //greeting message pop up before the quiz page load
        $('#greeting').fadeIn(function(){
            $('#greeting').html(`<h1>Welcome ${userInput} and Good Luck!</h1>`);
        });
        //closing the greeting message and shwoing the quiz page after 4 seconds
        $('#greeting').fadeOut(2000,function(){
              quizePage.fadeIn(1000);
            mouseEffect();
        });
        //removinf the modal
        $('.modal').remove()
        //hidding the modal on log in
        $('.modal-backdrop').remove();
        //the page can be scrolled after modal removal
        $('.modal-open').css({
            overflow: 'scroll',
        })
    }
});

//blank input validation and creating a form
let logIn = ()=>{
    let userName = $("#userName").val().trim();
    let valid = true;
    if(userName === ""){
       $('#message').text('No name entered').css('color', 'red');
       valid = false;
        // creating a form using fo loop
    } else{
        //adding the index to the attributes so to make them unique for each question when we want to access them
        for(let i in quizQuestions){
            let holder = quizQuestions[i];
            $('.container-fluid').append(`
            <form>
    <div class="mb-3">
     <h5>${holder.q}</h5>
     <div class="form-check">
       <input class="form-check-input " type="checkbox" name="question${i}" id="flexRadioDefault1${i}" value="${holder.answers[0]}" >
       <label class="form-check-label " for="flexRadioDefault1${i}">
          ${holder.answers[0]}
          
       </label>
    </div>
    </div>
    <div class="mb-3">
      <input class="form-check-input " type="checkbox" name="question${i}" id="flexRadioDefault2${i}" value="${holder.answers[1]}" >
       <label class="form-check-label " for="flexRadioDefault2${i}">
          ${holder.answers[1]}
       </label>
    </div>
    <div class="mb-3">
       <input class="form-check-input " type="checkbox" name="question${i}" id="flexRadioDefault3${i}" value="${holder.answers[2]}" >
       <label class="form-check-label " for="flexRadioDefault3${i}">
          ${holder.answers[2]}
       </label>
    </div>
       <div class="mb-3">
       <input class="form-check-input " type="checkbox" name="question${i}" id="flexRadioDefault4${i}" value="${holder.answers[3]}" >
       <label class="form-check-label " for="flexRadioDefault4${i}">
          ${holder.answers[3]}
       </label>
    </div>
    <h4 id="hint${i}">Hint </h4>

</form>`)
        }
        return userName;
    }
}
//setting the timer to count down
// Declare variables to store the start
let startTime
let myInterval;
const myTimer = ()=>{
    let timer = 61;
    // get the start time
    startTime = Date.now();
    let countDown;
     myInterval = setInterval(()=>{
        //stops the timer once the time is 0 otherwise the time goes down to -1, -2, ....
        clearInterval(countDown);
        countDown = timer--;
        $('#theTimer').html(`${countDown} seconds`);
        if(timer === 0){
            $('#theTimer').html('Time is Up!');
            //clearInterval here prevents the countdown to display 0 secs after the Time is Up! is printed
            clearInterval(countDown);
        }
    }, 1000);
}
//calcumating the end time
let endTime;
const calculateTimeTaken = () => {
    endTime = Date.now();
    // Get the time difference this will return millisec
    let timeTaken = endTime - startTime;
    // Convert millisec to seconds and get the rounded result
    let secondsTaken = Math.floor(timeTaken / 1000);
    return secondsTaken;
};

//handle the required at least one checkbox
const checkBoxHandler = () => {
    let answeredQuestions = true;

    quizQuestions.forEach((question, index) => {
        // Get the selected checkboxes for the current question
        let selectedCheckboxes = $(`input[name='question${index}']:checked`).length > 0;
        // Check if the error message exists for this question so it does not get repeated every time we press submit
        let errorMessage = $(`#error-message-${index}`);
        // If no checkboxes are checked show error message
        if (!selectedCheckboxes) {
            answeredQuestions = false;
            // If the error message does not existappend it
            if (errorMessage.length === 0) {
                $(`#flexRadioDefault1${index}`).closest('form').append(`
                    <p id="error-message-${index}" style="color: #5eff00;">Please select at least one answer for each question.</p>
                `);
            }
        } else {
            // remove the error message after checking the box
            errorMessage.remove();
        }
    });

    return answeredQuestions;
};
//mousein and out effect to provide hint to user
const mouseEffect = () => {
    // Loop through each quiz question and add a mouseover event to each hint
    quizQuestions.forEach((question, index) => {
        // Select the specific hint for the current question
        $(`#hint${index}`).mouseover(function() {
            // Append key for the current question as a hint
           $(this).append(`<span>:${question.key}</span>`).css({
               //make display none so the fade in effect can be applied
               display: 'none',
           }).fadeIn(1000).css({
               display: 'inline-block',
               border: '2px solid red',
               padding: '2px',
           });
        }).mouseout(function (){
            $(this).text('Hint').css({
                border: 'none'
            });
        })
    });
}


//getting the correct answers
const answerCalculation = () => {
    let correctAnswersCount = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
        // Get the selected values from the checkboxes (can be multiple) using map
        let selectedChecks = $(`input[name='question${i}']:checked`).map(function (){
            //returning the value and using get() to convert it into an array so we can use every(), sort()... on it
            return $(this).val()}).get();
        // Get the correct answers for this question
        let correctAnswers = quizQuestions[i].key;
        selectedChecks.sort();
        correctAnswers.sort();
        // selectedChecks.each(function() {
        //     //pushing the checkbpx values to an array
        //     radioAns.push($(this).val());
        // });
        // let answersFiltered = radioAns.filter(val =>correctAnswers.includes(val));
        // console.log(answersFiltered);
        //checking to see if the question has more than 1 correct answer/ icludes returns true if radioAns val is in the
        //correctAnswers
        // Compare selected answers with correct answers
        if (selectedChecks.length === correctAnswers.length && selectedChecks.every(value => correctAnswers.includes(value))) {
            correctAnswersCount++;
        }
    }
    //display the soce on the page
    $('#scoreAnnouncement').text(`You scored ${correctAnswersCount} out of ${quizQuestions.length}`);
    //making 2 different sets of texts for 5/5 and other scores
    let timeTaken =calculateTimeTaken();
    let resultMessage;
    let timeMessage;
    if(correctAnswersCount === quizQuestions.length){
        resultMessage = `${userInput}! <br> You scored ${correctAnswersCount} out of ${quizQuestions.length}.Perfect!`;
        timeMessage = `You finished in ${timeTaken} seconds`;
    }else{
        resultMessage = `RESULTS for ${userInput}: You scored ${correctAnswersCount} out of ${quizQuestions.length}`;
        timeMessage = `You finished in ${timeTaken} seconds`;
    }
//creating another modal to show the user score, and time took them to finish
    $('#modal2').html(`
<div class="modal modal2"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
     <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Quiz Results</h5>
          </div>
          <div class="modal-body text-center">
             <h4 id="results">${resultMessage}</h4>
             <h4 id="timeRes">${timeMessage}</h4>
          </div>
          <div class="modal-footer">
           <div class="input-group mb-3">
                <button  class="btn btn-outline-secondary" type="button" id="closeModal">close</button>
          </div>
          </div>
        </div>
  </div>
</div>
    `)

    let myModal2 = new bootstrap.Modal($('.modal'));
    $('#modal2').fadeIn(2000);
    //calling the flashing function and passing the ids and number of times we want the flash when score is 5/5
    if(correctAnswersCount === quizQuestions.length){
        flashText($('#results'),10);
        flashText($('#timeRes'),10);
    }
    myModal2.show();
    //hiding the modal when the close btn is clicked
    $('#closeModal').on('click',function() {
        myModal2.hide();
    })
}

// Function to apply flashing effect using jQuery
function flashText(element, times) {
    let counter = 0;
    let interval = setInterval(function() {
        if (counter < times) {
            //change visibility
            $(element).fadeOut(200).fadeIn(200);
            counter++;
        } else {
            // Stop the flashing after 10 times
            clearInterval(interval);
        }
        //spped of flashing
    }, 400);
}

//limitting the number of checkbox selections
const answerLimit = () => {

    quizQuestions.forEach((question, index) => {
        // gettiing  the last question
        const isLastQuestion = index === quizQuestions.length - 1;

        let currentMaxSelections;

        if (isLastQuestion) {
            //allow 2 selections for the last answer
            currentMaxSelections = 2;
        } else {
            //alow 1 for questions 1 to 4
            currentMaxSelections = 1;
        }

        // listening to the changes(checked/unchecked) of each checkbox for each question
        $(`input[name='question${index}']`).on('change', function () {
            // get the number of checkedboxes
            let checkedChecks = $(`input[name='question${index}']:checked`);

            // If the number of selected checkboxes exceeds the limit
            if (checkedChecks.length > currentMaxSelections) {
                // Uncheck the last checked box if the max is exceeded (set the checked to false)
                $(this).prop('checked', false);
            }
        });
    });

};

//submit press listener
$('#mySubBtn').on('click', function () {
    if(checkBoxHandler()){
        answerCalculation();
        //stop the clock after submit btn is pressed
        clearInterval(myInterval);
    }
})
