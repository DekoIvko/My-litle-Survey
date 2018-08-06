var json = {

        "SurveyId": 12327,
        "SurveyTitle": "P1942475749",
        "Questions": [{
                "IdSurveyQuestions": 6484,
                "QuestionType": "Text",
                "Title": "\n6",
                "RateFrom": 0,
                "RateTo": 0,
                "RateStep": 1,
                "IsMultiChoice": 0,
                "AllowCantSay": 0,
                "HowManyDropdowns": 0,
                "QuestionOptions": [],
                "DropdownsOptions": []
            },
            {
                "IdSurveyQuestions": 6485,
                "QuestionType": null,
                "Title": "123",
                "RateFrom": 1,
                "RateTo": 5,
                "RateStep": 1,
                "IsMultiChoice": 0,
                "AllowCantSay": 0,
                "HowManyDropdowns": 0,
                "QuestionOptions": [{
                        "IdSurveyOptions": 0,
                        "IdSurveyImages": 478722,
                        "Description": "",
                        "Value": 1,
                        "TextDescription": "onea"
                    },
                    {
                        "IdSurveyOptions": 0,
                        "IdSurveyImages": 478723,
                        "Description": "",
                        "Value": 2,
                        "TextDescription": "twoa"
                    },
                    {
                        "IdSurveyOptions": 0,
                        "IdSurveyImages": 478724,
                        "Description": "",
                        "Value": 3,
                        "TextDescription": "three"
                    },
                    {
                        "IdSurveyOptions": 0,
                        "IdSurveyImages": 478725,
                        "Description": "",
                        "Value": 4,
                        "TextDescription": "four"
                    },
                    {
                        "IdSurveyOptions": 0,
                        "IdSurveyImages": 478726,
                        "Description": "",
                        "Value": 5,
                        "TextDescription": "five"
                    }
                ],
                "DropdownsOptions": []
            },
            {
                "IdSurveyQuestions": 6486,
                "QuestionType": "Options",
                "Title": "321",
                "RateFrom": 0,
                "RateTo": 0,
                "RateStep": 1,
                "IsMultiChoice": 0,
                "AllowCantSay": 0,
                "HowManyDropdowns": 0,
                "QuestionOptions": [{
                        "IdSurveyOptions": 10519,
                        "IdSurveyImages": "",
                        "Description": "KAKO DA NE",
                        "Value": 1,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10520,
                        "IdSurveyImages": "",
                        "Description": "PA ZASTO DA NE",
                        "Value": 2,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10521,
                        "IdSurveyImages": "",
                        "Description": "PA STO ZNAM",
                        "Value": 3,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10522,
                        "IdSurveyImages": "",
                        "Description": "PA STO ZNAM AMA AJ",
                        "Value": 4,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10523,
                        "IdSurveyImages": "",
                        "Description": "PA STO ZNAM AMA AJDE STO",
                        "Value": 5,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10524,
                        "IdSurveyImages": "",
                        "Description": "PA AJDE AMA STO ZNAM",
                        "Value": 6,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10525,
                        "IdSurveyImages": "",
                        "Description": "PA AJDE BE SHO",
                        "Value": 7,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10526,
                        "IdSurveyImages": "",
                        "Description": "AJDE BE AJDE IDEME",
                        "Value": 8,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10527,
                        "IdSurveyImages": "",
                        "Description": "IDEME GAZIME",
                        "Value": 9,
                        "TextDescription": ""
                    },
                    {
                        "IdSurveyOptions": 10528,
                        "IdSurveyImages": "",
                        "Description": "AJ NE ZAMARAJ",
                        "Value": 10,
                        "TextDescription": ""
                    }
                ],
                "DropdownsOptions": []
            }
        ]
    }
}
var SurveyObjectModel = function () {
        var self = this;
        self.surveyObj = ko.observable();
        self.arrayOfQuestions = ko.observable();
        self.SurveyTitle = ko.observable();
        self.IdSurveyParam = ko.observable();
        self.DropdownsOptions = ko.observableArray([]);

        self.getSurvey = function () {
            var r = $.Deferred();
            // $.ajax({
            // type: 'POST',
            // crossDomain: true,
            // dataType: 'json',
            // url: 'https://jy3ac4e94dbe.hana.ondemand.com/SurveyRocks/services/api/getSurveyForPopUp.xsjs?id='+self.IdSurveyParam(),
            // error: function(err){
            // alert('You don\'t have any question!!');
            // console.log(err);
            // $("#sbmtBtn").hide();
            // setTimeout(function(){
            // window.close();
            // },2000);
            // },
            // success: function(res){
            console.log(json);
            // self.arrayOfQuestions(res.Survey.Questions);
            // currentQuestionObject.Questions(surveyObject.arrayOfQuestions());

            // self.surveyObj(res.Survey);
            // currentQuestionObject.IdSurvey(surveyObject.surveyObj().SurveyId);
            // self.SurveyTitle(res.Survey.SurveyTitle);
            // currentQuestionObject.Title(surveyObject.surveyObj().SurveyTitle);

            self.arrayOfQuestions(json.Survey.Questions);
            currentQuestionObject.Questions(json.arrayOfQuestions);
                for (let i = 0; i < currentQuestionObject.Questions().length; i++) {
                    if (currentQuestionObject.Questions()[i].IsMultiChoice == 0) {
                        currentQuestionObject.Questions()[i].NumericAnswer = '';
                    } else if (currentQuestionObject.Questions()[i].IsMultiChoice == 1 || currentQuestionObject.Questions()[i].IsMultiChoice == 3) {
                        currentQuestionObject.Questions()[i].NumericAnswerForMulti = [];
                    }
                }
                self.surveyObj(json.Survey); currentQuestionObject.IdSurvey(surveyObject.surveyObj().SurveyId); 
                self.SurveyTitle(json.Survey.SurveyTitle);
                currentQuestionObject.Title(surveyObject.surveyObj().SurveyTitle); console.log(json.Survey.Questions)
                console.log(currentQuestionObject.Questions())
                 r.resolve();
                // }
                // });
                return r;
            }



        }


        var CurrentQuestionObject = function () {
            var self = this;
            self.IdSurveyQuestions = ko.observable();
            self.IdSurvey = ko.observable();
            // self.IdQuestionType = ko.observable();
            self.Title = ko.observable();
            // self.NumericAnswerRating = ko.observableArray();
            // self.NumericAnswerOptions = ko.observableArray();
            // self.NumericAnswerRatingForMulti = ko.observableArray();
            // self.NumericAnswerOptionsForMulti = ko.observableArray();
            self.Questions = ko.observableArray();
            self.param11 = ko.observable();
            self.param22 = ko.observable();

            self.submitBtn = function ($data) {
                var validate = true;
                var alertBox = false;
                for (var i = 0; i < currentQuestionObject.Questions().length; i++) {
                    console.log(currentQuestionObject.Questions()[i])
                    if (currentQuestionObject.Questions()[i].IsMultiChoice == 0 && currentQuestionObject.Questions()[i].AllowCantSay == 0 && (currentQuestionObject.Questions()[i].QuestionType == 'Rating' || currentQuestionObject.Questions()[i].QuestionType == 'Options')) {
                        if (currentQuestionObject.Questions()[i].NumericAnswer == '') {
                            $("#content_feedback_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css({
                                border: "2px solid #a94442",
                                padding: "0 15px"
                            });
                            validate = false;
                        } else {
                            $("#content_feedback_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css({
                                border: "none",
                                padding: "0"
                            });
                        }
                    }

                    if ((currentQuestionObject.Questions()[i].IsMultiChoice == 1 || currentQuestionObject.Questions()[i].IsMultiChoice == 3) && currentQuestionObject.Questions()[i].AllowCantSay == 0 && (currentQuestionObject.Questions()[i].QuestionType == 'Rating' || currentQuestionObject.Questions()[i].QuestionType == 'Options')) {
                        if (currentQuestionObject.Questions()[i].NumericAnswerForMulti.length == 0) {
                            $("#content_feedback_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css({
                                border: "2px solid #a94442",
                                padding: "0 15px"
                            });
                            validate = false;
                        } else {
                            $("#content_feedback_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css({
                                border: "none",
                                padding: "0"
                            });
                        }
                    }

                    if (currentQuestionObject.Questions()[i].AllowCantSay == 0 && currentQuestionObject.Questions()[i].QuestionType == 'Text') {
                        if ($("#message_txt_area_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).val() == '') {
                            $("#message_txt_area_box_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css({
                                border: "2px solid #a94442",
                                padding: "0 15px"
                            });
                            validate = false;
                        } else {
                            $("#message_txt_area_box_" + currentQuestionObject.Questions()[i].IdSurveyQuestions).css('border', 'none');
                        }
                    }


                }
                // debugger;
                var params = {},
                    paramsList = [],
                    tempText, tempRat, tempOpt;
                params.IdSurvey = self.IdSurvey();
                params.param1 = self.param11();
                params.param2 = self.param22();
                $.each(currentQuestionObject.Questions(), function (index, value) {
                    tempText = '';
                    console.log(value)
                    console.log(value.value)
                    console.log(index);
                    if (currentQuestionObject.Questions()[index].QuestionType == "Text") {
                        tempText = $("#message_txt_area_" + value.IdSurveyQuestions).val()

                        tempParams = {};
                        tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                        tempParams.IdQuestionType = 1;
                        tempParams.TextAnswer = tempText ? tempText : '';
                        tempParams.NumericAnswer = null;
                        tempParams.IsTest = 1;
                        paramsList.push(tempParams);
                        console.log(paramsList);
                    } else if (currentQuestionObject.Questions()[index].QuestionType == "Rating") {
                        if (currentQuestionObject.Questions()[index].IsMultiChoice == 3) { // multi rating answers
                            if (currentQuestionObject.Questions()[index].NumericAnswerForMulti.length > 0) {
                                for (var j = 0; j < currentQuestionObject.Questions()[index].NumericAnswerForMulti.length; j++) {
                                    tempParams = {};
                                    tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                    tempParams.IdQuestionType = 4;
                                    tempParams.TextAnswer = null;
                                    tempParams.NumericAnswer = currentQuestionObject.Questions()[index].NumericAnswerForMulti[j];;
                                    tempParams.IsTest = 1;
                                    paramsList.push(tempParams);
                                }
                            } else {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 4;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = '-1';
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            }
                        } else if (currentQuestionObject.Questions()[index].IsMultiChoice == 0) { //simple rating answer
                            if (currentQuestionObject.Questions()[index].NumericAnswer != '') {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 4;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = currentQuestionObject.Questions()[index].NumericAnswer
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            } else {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 4;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = '-1';
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            }
                        }
                    } else if (currentQuestionObject.Questions()[index].QuestionType == "Options") {
                        if (currentQuestionObject.Questions()[index].IsMultiChoice == 3 || currentQuestionObject.Questions()[index].IsMultiChoice == 1) { //multi options answers
                            if (currentQuestionObject.Questions()[index].NumericAnswerForMulti.length > 0) {
                                for (var j = 0; j < currentQuestionObject.Questions()[index].NumericAnswerForMulti.length; j++) {
                                    tempParams = {};
                                    tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                    tempParams.IdQuestionType = 5;
                                    tempParams.TextAnswer = null;
                                    tempParams.NumericAnswer = currentQuestionObject.Questions()[index].NumericAnswerForMulti[j];
                                    tempParams.IsTest = 1;
                                    paramsList.push(tempParams);
                                }
                            } else {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 5;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = '-1';
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            }
                        } else if (currentQuestionObject.Questions()[index].IsMultiChoice == 0) { //simple option answer
                            if (currentQuestionObject.Questions()[index].NumericAnswer != '') {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 5;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = currentQuestionObject.Questions()[index].NumericAnswer;
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            } else {
                                tempParams = {};
                                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                                tempParams.IdQuestionType = 5;
                                tempParams.TextAnswer = null;
                                tempParams.NumericAnswer = '-1';
                                tempParams.IsTest = 1;
                                paramsList.push(tempParams);
                            }
                        }
                    }
                });
                params.Answers = paramsList;
                if (validate) {

                    console.log(params)
                    $.ajax({
                        type: 'POST',
                        dataType: "json",
                        data: JSON.stringify(params),
                        crossDomain: true,
                        url: 'https://jy3ac4e94dbe.hana.ondemand.com/SurveyRocks/services/api/SendSurveyForPop.xsjs',
                        error: function (x, s, m) {
                            alert("Something went wrong, please try later!");
                            console.log(x, s, m);
                        },
                        success: function (res) {
                            console.log(res);
                            $("#testForBinding, #sbmtBtn").hide();
                            $("#thankst-template").show();
                        }
                    });
                } else {
                    alert('Koci majstore odgovaraj!!');
                }
            }
        }


        var surveyObject = new SurveyObjectModel();
        ko.applyBindings(surveyObject, document.getElementById("header"));
        ko.applyBindings(surveyObject, document.getElementById("testForBinding"));


        var currentQuestionObject = new CurrentQuestionObject();
        ko.applyBindings(currentQuestionObject, document.getElementById("sbmtBtn"));
        ko.applyBindings(currentQuestionObject, document.getElementById("textBox-template"));
        ko.applyBindings(currentQuestionObject, document.getElementById("ratingBox-template"));
        ko.applyBindings(currentQuestionObject, document.getElementById("optionsBox-template"));

        $(document).ready(function () {
            function getParameterByName(name) { // function for getting parameter from url
                url = window.location.href;
                console.log("url: " + url);
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                console.log("name: " + name);
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(url);
                console.log("regex: " + regex);
                console.log("results: " + results);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            };
            surveyObject.IdSurveyParam(getParameterByName("id"));

            currentQuestionObject.param11(getParameterByName('param1')); // getting parameter one from url
            currentQuestionObject.param22(getParameterByName('param2')); // getting parameter two from url

            surveyObject.getSurvey().done(function () {
                //rating

                $("input[type='radio']").on('change touchend', function ($data) {
                    this.parentElement.parentElement.style.border = 'none';
                    var idto = this.id;
                    var valval = this.value;
                    $.each(currentQuestionObject.Questions(), function (index, value) {
                        console.log(idto);
                        console.log(valval);
                        if (idto.indexOf("odg" + value.IdSurveyQuestions + "_") >= 0) {
                            value.NumericAnswer = valval;
                            console.log(value.NumericAnswer);
                        }
                    })
                });

                // options
                $(".radioForOptions").on('change', function () {
                    this.parentElement.parentElement.parentElement.style.border = 'none';
                    var idto = this.id;
                    var valval = this.value;
                    $.each(currentQuestionObject.Questions(), function (index, value) {
                        console.log(idto);
                        console.log(valval);
                        if (idto.indexOf("odg_" + value.IdSurveyQuestions + "_") >= 0) {
                            value.NumericAnswer = valval;
                            console.log(value.NumericAnswer);
                        }
                    })
                });

                // rating dropdown
                $(".ddlOptionsRating").on('change', function () {
                    this.parentElement.parentElement.parentElement.parentElement.style.border = 'none';
                    var idto = this.id;
                    var valval = this.value;

                    $.each(currentQuestionObject.Questions(), function (index, value) {
                        console.log(idto);
                        console.log(valval);
                        if (idto.indexOf("ddl" + value.IdSurveyQuestions + "_") >= 0) {
                            if (currentQuestionObject.Questions()[index].IsMultiChoice == 3) {
                                currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                                var tempObj = [];
                                for (var i = 0; i < currentQuestionObject.Questions()[index].HowManyDropdowns; i++) {
                                    console.log(parseInt($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val(), 0));
                                    if (parseInt($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val(), 0) != NaN && $("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val() != "") { //something is selected
                                        tempObj.push($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val());
                                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = tempObj;
                                    }
                                }
                            }
                        }
                    });
                });

                // options dropdown
                $(".ddlOptionsOptions").on('change', function () {
                    this.parentElement.parentElement.parentElement.parentElement.style.border = 'none';
                    var idto = this.id;
                    var valval = this.value;

                    $.each(currentQuestionObject.Questions(), function (index, value) {
                        console.log(idto);
                        console.log(valval);
                        if (idto.indexOf("ddl" + value.IdSurveyQuestions + "_") >= 0) {
                            if (currentQuestionObject.Questions()[index].IsMultiChoice == 3) {
                                currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                                var tempObj = [];
                                for (var i = 0; i < currentQuestionObject.Questions()[index].HowManyDropdowns; i++) {
                                    console.log(parseInt($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val(), 0));
                                    if (parseInt($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val(), 0) != NaN && $("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val() != "") { //something is selected
                                        tempObj.push($("#ddl" + value.IdSurveyQuestions + "_" + i + " option:selected").val());
                                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = tempObj;
                                    }
                                }
                            } else if (currentQuestionObject.Questions()[index].IsMultiChoice == 1) {
                                currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                                var tempObj = [];
                                for (var i = 0; i < currentQuestionObject.Questions()[index].QuestionOptions.length; i++) {
                                    if ($("#" + idto).is(':checked')) {
                                        console.log($("#" + idto).val());
                                        tempObj.push($("#" + idto).val())
                                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = tempObj;
                                    }
                                }
                            }
                        }
                    });
                });

                //checkbox
                $(".ddlMultiOptions").on('change', function () {
                    this.parentElement.parentElement.parentElement.parentElement.style.border = 'none';
                    var tempObjM = [];
                    var idto = this.id;
                    var valval = this.value;

                    $.each(currentQuestionObject.Questions(), function (index, value) {
                        console.log(idto);
                        console.log(valval);
                        if (idto.indexOf("odg" + value.IdSurveyQuestions + "_") >= 0) {
                            if (currentQuestionObject.Questions()[index].IsMultiChoice == 1) {
                                console.log($("#" + idto).val());
                                if ($("#" + idto).is(":checked")) {
                                    currentQuestionObject.Questions()[index].NumericAnswerForMulti.push($("#" + idto).val())
                                } else {
                                    for (var i = currentQuestionObject.Questions()[index].NumericAnswerForMulti.length - 1; i >= 0; i--) {
                                        if (currentQuestionObject.Questions()[index].NumericAnswerForMulti[i] == $("#" + idto).val()) {
                                            currentQuestionObject.Questions()[index].NumericAnswerForMulti.splice(i, 1);
                                        }
                                    }
                                }
                            }
                        }
                    });
                });

                // reset validation
                $('.message_text ').on('click', function () {
                    this.parentElement.parentElement.style.border = 'none'
                });


            });


            // $(".optionsbe").change(function(){
            //     $(this).addClass("radioForOptions")
            //     $(this).val() = 
            //     console.log($(this).val());

            // });

            // $('#slider-feedback-rating').on( 'change', function( event ) {
            //     for(var i =0;i< surveyObject.arrayOfQuestions().length;i++) {
            //         if(surveyObject.arrayOfQuestions()[i].QuestionType == "Rating"){
            //             changeImage(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),surveyObject.arrayOfQuestions()[i].RateTo, i);
            //          }
            //     }
            // });

        })

        // for(var i =0;i< surveyObject.arrayOfQuestions().length;i++) {
        //     if(surveyObject.arrayOfQuestions()[i].QuestionType == "Rating"){
        //         var maxRate = surveyObject.arrayOfQuestions()[i].RateTo;
        //         $("#imgMerchantLogo").removeAttr('src');
        //         $("#min_tick_slide").text(surveyObject.arrayOfQuestions()[i].RateFrom);
        //         $("#max_tick_slide").text(surveyObject.arrayOfQuestions()[i].RateTo);
        //         $('#slider-feedback-rating').attr({ min: surveyObject.arrayOfQuestions()[i].RateFrom, max: surveyObject.arrayOfQuestions()[i].RateTo, step: surveyObject.arrayOfQuestions()[i].RateStep,value:undefined});

        //         $(".image_gift_cart").removeClass("card_logo_initial");
        //         changeImage(parseInt($("#slider-feedback-rating").val()),$('#imgMerchantLogo'),maxRate, i);
        //     }
        // }

        // function changeImage(rating,$image,max_rate, index){

        //     var first = 1;
        //     var last = max_rate;

        //     var img1 = "img/rate_star1.png";
        //     var img2 = "img/rate_star2.png";
        //     var img3 = "img/rate_star3.png";
        //     var img4 = "img/rate_star4.png";
        //     var img5 = "img/rate_star5.png";

        //     var getQuestionTextDescription = function(questionsArray, ratingValue){

        //         for(var i = 0; i < questionsArray.length; i++){
        //             console.log(questionsArray[i])
        //             if(parseInt(questionsArray[i].Value) == ratingValue){
        //                 if(questionsArray[i].TextDescription!=null && questionsArray[i].TextDescription!=undefined && questionsArray[i].TextDescription!="" && questionsArray[i].TextDescription!=" "){
        //                     $("#text_feedback_rating_description").html(questionsArray[i].TextDescription);
        //                     $(".award_points").removeClass('award_points_visiblenone');
        //                 }
        //                 else{
        //                     $(".award_points").addClass('award_points_visiblenone');
        //                 }
        //                 break;
        //             }
        //         }
        //     };

        //     $("#imgMerchantLogo").removeAttr('src');


        //     if(max_rate == 5){
        //         if(rating==first){
        //             $image.attr('src',img1);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index].QuestionOptions,rating);
        //         }
        //         else if(rating == first+1){
        //             $image.attr('src',img2);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index].QuestionOptions,rating);
        //         }
        //         else if(rating == first+2){
        //             $image.attr('src',img3);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index].QuestionOptions,rating);
        //         }
        //         else if(rating == first+3){
        //             $image.attr('src',img4);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index].QuestionOptions,rating);
        //         }
        //         else if(rating == last){
        //             $image.attr('src',img5);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index].QuestionOptions,rating);
        //         }
        //     }
        //     else if(max_rate == 6){
        //         if(rating==first){
        //             $image.attr('src',img1);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == first+1){
        //             $image.attr('src',img2);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == first+2 || rating == first+3){
        //             $image.attr('src',img3);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == last-1){
        //             $image.attr('src',img4);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == last){
        //             $image.attr('src',img5);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //     }
        //     else if(max_rate == 7 || max_rate == 8 || max_rate == 9 || max_rate == 10){
        //         if(rating == first){
        //             $image.attr('src',img1);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == first+1 || rating == first+2){
        //             $image.attr('src',img2);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating > first+2 && rating < last-2){
        //             $image.attr('src',img3);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == last-1 || rating == last-2){
        //             $image.attr('src',img4);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //         else if(rating == last){
        //             $image.attr('src',img5);
        //             getQuestionTextDescription(surveyObject.arrayOfQuestions()[index],rating);
        //         }
        //     }

        //     $('#rating-value-feedback-rating').val($('#slider-feedback-rating').val());
        // }