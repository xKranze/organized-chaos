// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  // Get current day.
  var day = dayjs();

  // Set last two letters depending on the current day.
  var appendDay = 'th'
  if(day.format('D') == '1' || day.format('D') == '21' || day.format('D') == '31'){
    appendDay = 'st'
  }else if(day.format('D') == '2' || day.format('D') == '22'){
    appendDay = 'nd'
  }else if(day.format('D') == '3' || day.format('D') == '23'){
    appendDay = 'rd'
  }

  // Update the current day on the page
  $('#currentDay').text(day.format('dddd') + ", " + day.format('MMMM D') + appendDay);

  // Get current hour 24 hour format.
  var currentHour = day.format('H');

  for(var i = 9; i <= 17; i++){ 
    // Set current hour css on the page and color them corrrectly according to time.
    if(currentHour > i){
      $('#hour-' + i).addClass('past');
    }else if(currentHour == i){
      $('#hour-' + i).addClass('present');
    }else{
      $('#hour-' + i).addClass('future');
    }
    
    // Set all text areas with their locally stored data to present on planner.
    $("#ta-"+i).val(localStorage.getItem(i));
  }

  // Add event listener to all buttons
  $('.saveBtn').click(function (e) { 
    e.preventDefault();
    var id = e.target.id.split('-')[1];
    //grabs the id from event and splits it apart from "-" and using array [1] to set local storage key while also storing data grabbed from textarea to store as value.
    localStorage.setItem(id, $('#ta-' + id).val());
  });
});
