import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { grabApi } from "../src/api.js";

$(document).ready(function() {
  $(".callDoctor").click(function() {
    let newApi = new grabApi();
    let input = $("#issue").val();
    let docs = false;
    let promise = newApi.runDoctor();

    promise.then(function(response) {
      let body = JSON.parse(response);
      // const newObject = body.data;
      console.log(body);
      body.data.forEach(function(index){
        for (let i = 0; i < index.specialties.length; i++) {
         if (index.specialties[i].description.match(input)) {
           docs = true;
           let firstName = index.profile.first_name;
           $(".printInfo").append("<p> First Name: " + firstName + "</p>");

           let lastName = index.profile.last_name;
           $(".printInfo").append("<p> Last Name: " + lastName + "</p>");

           let bio = index.profile.bio;
           $(".printInfo").append("<p> Bio: " + bio + "</p>");

           let gender = index.profile.gender;
           $(".printInfo").append("<p> gender: " + gender + "</p>");

           let pic = index.profile.image_url;
           $(".printInfo").append("<img src='" + pic + "'>");

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
    let newApi = new grabApi();
    let nameInput = $("#name").val();
    let names = false;
    let promise = newApi.runDoctor();


    promise.then(function(response) {
      let body = JSON.parse(response);
      body.data.forEach(function(index){
        if(index.profile.bio.match(nameInput)){
           names = true;
          let firstName = index.profile.first_name;
          $(".printInfo").append("<p> First Name: " + firstName + "</p>");

          let lastName = index.profile.last_name;
          $(".printInfo").append("<p> Last Name: " + lastName + "</p>");

          let bio = index.profile.bio;
          $(".printInfo").append("<p> Bio: " + bio + "</p>");

          let gender = index.profile.gender;
          $(".printInfo").append("<p> gender: " + gender + "</p>");

          let pic = index.profile.image_url;
          $(".printInfo").append("<img src='" + pic + "'>");
        }
        if(!names){
          $(".printInfo").append("<p>Sorry there is no information on that</p>");
        }
      })
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
