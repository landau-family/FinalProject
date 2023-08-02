var jobPostings;
$(document).ready(function() {
    // Function to fetch and display employee personal details and job postings
    function getEmployeeData() {
      var settings = {
        "url": "http://localhost:3000/worker",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({}),
      };
  
      $.ajax(settings).done(function (response) {
        // Populate employee personal details
        $("#employeeName").text(response.worker.name);
        $("#employeeEmail").text(response.worker.email);
        $("#employeeIDCard").text(response.worker.id);
        $("#employeeFullName").text(response.worker.name);
        
        
        
          // ... (your existing code)
        // Populate job postings
         jobPostings = response.jobPosting;
        var jobPostingsHTML = "";
        for (var i = 0; i < jobPostings.length; i++) {
          jobPostingsHTML += "<div class='jobPosting' onclick='showJobPostingDesc(" + i + ")'>";
          jobPostingsHTML += "<h3>" + jobPostings[i].dateTime + "</h3>";
          jobPostingsHTML += "<p><strong>Area:</strong> " + jobPostings[i].area + "</p>";
          jobPostingsHTML += "<p><strong>Profession:</strong> " + jobPostings[i].proffession + "</p>";
          // You can add more fields as needed
          jobPostingsHTML += "</div>";
        }
        $("#jobPostings").html(jobPostingsHTML);
       
      });
    }
   // Call the function to fetch and display employee data on page load
   getEmployeeData();

   // Update Personal Details
   $("#updateBtn").click(function() {
     // Enable input fields for editing
     $("input").prop("disabled", false);
     // Show the "Finish Update" button and hide the "Update Personal Details" button
     $("#finishUpdateBtn").show();
     $(this).hide();
   });
 
   // Finish Update
   $("#updateDetailsForm").submit(function(event) {
     event.preventDefault();
     // Perform the update by sending the updated data to the server via AJAX request
     let mail;
     if($("#employeeEmail2").val())
     {
      mail=$("#employeeEmail2").val();
     }
     else
     {
      mail=$("#employeeEmail").text();
     }
     let n;
     if( $("#employeeName2").val())
     {
      n= $("#employeeName2").val();
     }
     else{
      n= $("#employeeName").text();
     }
     var updatedData = {
       "name":n,
       "email": mail,
       // Add more fields as needed
     };
    
     console.log(updatedData);
     var settings = {
        "url": "http://localhost:3000/worker",
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        "data":JSON.stringify(updatedData)
        
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
         // If the update is successful, disable the input fields again and show the "Update Personal Details" button
       $("input").prop("disabled", true);
       $("#updateBtn").show();
       $("#finishUpdateBtn").hide();
       $("#employeeName").text(response.name);
       $("#employeeEmail").text(response.email);
       $("#employeeIDCard").text(response.id);
       $("#employeeFullName").text(response.name);
       
      }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle login error (Bad Request)
        if (jqXHR.status === 400) {
          console.log(jqXHR.responseText); // Log the server's error message
          alert('You are not a subscriber to the registration site, click register');
        } else {
          // Handle other errors, such as server not reachable, etc.
          alert('An error occurred. Please try again later.');
        }
      });
    
     
     // Function to show job posting description
     
   });
   
   
  
 });
 function showJobPostingDesc(i) {
    // Get the job postings array
    //var jobPostings = JobPostings;

    // Check if the index is within the valid range
    if (i >= 0 && i < jobPostings.length) {
      // Get the job posting description
      var desc = jobPostings[i].desc;

      // Display the job posting description in the corresponding jobPosting div
      $("#jobPostings .jobPosting:eq(" + i + ")").append("<p><strong>Description:</strong> " + desc + "</p>");
    } else {
      // Handle invalid index, if necessary
      console.log("Invalid job posting index: " + i);
    }
  }