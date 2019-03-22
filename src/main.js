import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { grabApi } from "../src/api.js";

$(document).ready(function() {
  $(".callDoctor").click(function() {
    $(".printInfo").empty(); //new
    const newApi = new grabApi();
    const input = $("#issue").val();
    let docs = false;
    const promise = newApi.runDoctor();

    promise.then(function(response) {
      const body = JSON.parse(response);
      // const newObject = body.data;
      console.log(body);
      body.data.forEach(function(index){
        for (let i = 0; i < index.specialties.length; i++) {
         if (index.specialties[i].description.match(input)) {
           docs = true;
           const firstName = index.profile.first_name;
           $(".printInfo").append("<p> First Name: " + firstName + "</p>");

           const lastName = index.profile.last_name;
           $(".printInfo").append("<p> Last Name: " + lastName + "</p>");

           const bio = index.profile.bio;
           $(".printInfo").append("<p> Bio: " + bio + "</p>");

           const gender = index.profile.gender;
           $(".printInfo").append("<p> gender: " + gender + "</p>");

           const pic = index.profile.image_url;
           $(".printInfo").append("<img src='" + pic + "'>");

           const newPat = index.practices[0].accepts_new_patients;
           $(".printInfo").append("<p> Accepting patients: " + newPat + "</p>");

           const newAdd = index.practices[0].visit_address.street;
           $(".printInfo").append("<p> Street address: " + newAdd + " Portland, Or</p>");

           const newWeb = index.practices[0].website;
            $(".printInfo").append("<p> website: " + newWeb + "</p>");

           break;

         }
       }
     });
     if(!docs){
       $(".printInfo").append("<p>Sorry there is no information on that</p>");
     }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    })
  });

  $(".callName").click(function() {
    const newApi = new grabApi();
    const nameInput = $("#name").val();
    let names = false;
    const promise = newApi.runDoctor();


    promise.then(function(response) {
      const body = JSON.parse(response);
      body.data.forEach(function(index){
        if(index.profile.bio.match(nameInput)){
           names = true;
          const firstName = index.profile.first_name;
          $(".printInfo").append("<p> First Name: " + firstName + "</p>");

          const lastName = index.profile.last_name;
          $(".printInfo").append("<p> Last Name: " + lastName + "</p>");

          const bio = index.profile.bio;
          $(".printInfo").append("<p> Bio: " + bio + "</p>");

          const gender = index.profile.gender;
          $(".printInfo").append("<p> gender: " + gender + "</p>");

          const pic = index.profile.image_url;
          $(".printInfo").append("<img src='" + pic + "'>");
        }
      })
      if(!names){
        $(".printInfo").append("<p>Sorry there is no doctor with that name</p>");
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
