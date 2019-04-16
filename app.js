var SurveyObjectModel = function () {
    var self = this;
    self.surveyObj = ko.observable();
    self.arrayOfQuestions = ko.observable();
    self.SurveyTitle = ko.observable();
    self.IdSurveyParam = ko.observable();
    self.LangLocale = ko.observable();
    self.DropdownsOptions = ko.observableArray([]);
    self.SurveyTreshold = ko.observable();
    self.TextTreshold = ko.observable();
    self.Disclaimer = ko.observable();
    self.Description = ko.observable();
    self.UseCookie = ko.observable();
    self.IsActive = ko.observable();
    self.IsTest = ko.observable();
    self.CompletelyTranslatedLangs = ko.observableArray([]);


    self.getSurvey = function () {
        var r = $.Deferred();
        var params={};
        params.lang = self.LangLocale();
        $.ajax({
           type: 'POST',
           crossDomain: true,
           dataType: 'json',
           data: JSON.stringify(params),
           url: '/services/api/getSurveyForPopUp.xsjs?id=' + self.IdSurveyParam(),
           error: function(x,s,m){
               console.log(x);
               console.log(s);
               console.log(m);
                // alert('There are some problem loading data. Please try again later');
                $("#sbmtBtn, .privacy_container").hide();
                setTimeout(function(){
                    window.close();
                },1000);
            },
            success: function(res){

                if (typeof(res) == 'string') {
                    alert('You don\'t have any questions!!');
                    $("#sbmtBtn, .privacy_container").hide();
                    setTimeout(function(){
                        window.close();
                    },1000);
                }

                if (res.Survey.IsTest == 0 && res.Survey.IsActive == 0) {
                    alert('This Survey is no longer open for participation.');
                    $("#sbmtBtn, .privacy_container, logo_home_container").hide();
                    res.Survey.Questions = '';
                    return;
                }

        		console.log(res);
                self.arrayOfQuestions(res.Survey.Questions);
                currentQuestionObject.Questions(surveyObject.arrayOfQuestions());
                for (var i = 0; i < currentQuestionObject.Questions().length; i++) {
                    if(currentQuestionObject.Questions()[i].IsMultiChoice == 0) {
                        currentQuestionObject.Questions()[i].NumericAnswer = '';
                    } else if (currentQuestionObject.Questions()[i].IsMultiChoice == 1 || currentQuestionObject.Questions()[i].IsMultiChoice == 3) {
                        currentQuestionObject.Questions()[i].NumericAnswerForMulti = [];
                    }
                }

        		self.surveyObj(res.Survey);
                currentQuestionObject.IdSurvey(surveyObject.surveyObj().SurveyId);

        		self.SurveyTitle(res.Survey.SurveyTitle);
                currentQuestionObject.Title(surveyObject.surveyObj().SurveyTitle);

                self.Disclaimer(res.Survey.Disclaimer);
                currentQuestionObject.Disclaimer(surveyObject.surveyObj().Disclaimer);

                self.Description(res.Survey.Description);
                currentQuestionObject.Description(surveyObject.surveyObj().Description);

                self.SurveyTreshold(res.Survey.SurveyTreshold);
                currentQuestionObject.SurveyTreshold(surveyObject.surveyObj().SurveyTreshold);

                self.TextTreshold(res.Survey.TextTreshold);
                currentQuestionObject.TextTreshold(surveyObject.surveyObj().TextTreshold);

                self.UseCookie(res.Survey.UseCookie);
                currentQuestionObject.UseCookie(surveyObject.surveyObj().UseCookie);

                self.IsActive(res.Survey.IsActive);
                currentQuestionObject.IsActive(surveyObject.surveyObj().IsActive);

                self.IsTest(res.Survey.IsTest);
                currentQuestionObject.IsTest(surveyObject.surveyObj().IsTest);

                self.CompletelyTranslatedLangs(res.Survey.CompletelyTranslatedLangs);
                currentQuestionObject.CompletelyTranslatedLangs(res.Survey.CompletelyTranslatedLangs);

                // self.arrayOfQuestions(json.Survey.Questions);
                // currentQuestionObject.Questions(surveyObject.arrayOfQuestions());
                // self.surveyObj(json.Survey);
                // currentQuestionObject.IdSurvey(surveyObject.surveyObj().SurveyId);
                // self.SurveyTitle(json.Survey.SurveyTitle);
                // currentQuestionObject.Title(surveyObject.surveyObj().SurveyTitle);
                // console.log(json.Survey.Questions)
                // console.log(currentQuestionObject.Questions())

                r.resolve();
            }
        });
        return r;
    }

    self.ReplaceDisclaimer=function(){
    	var discStr=" ";
    	discStr=self.Disclaimer();
    	// console.log(discStr)
    	if(discStr){    		
	    	if(discStr.localeCompare('The participation in this survey is voluntary and anonymous, please read the  <a href="https://jam4.sapjam.com/groups/IG97lmkubtXbaRWtX7Yw74/documents/s9K6jQ1Q7Ux4OGhzMEMUjm/slide_viewer" target="_blank">Privacy Statement</a>  for further information. The agreed Threshold for numeric values is {Threshold for Reporting} and for text answers it is {Text Threshold}.') == 0 && self.LangLocale() == 'de'){
	    		discStr = 'Die Teilnahme an dieser Umfrage ist freiwillig und anonym. Bitte lies das '+' <a href="https://jam4.sapjam.com/groups/IG97lmkubtXbaRWtX7Yw74/documents/s9K6jQ1Q7Ux4OGhzMEMUjm/slide_viewer" target="_blank">Privacy Statement</a> '+' für weitergehende Informationen. Die vereinbarte Mindestauswertungsgrenze für numerische Werte ist {Threshold for Reporting} und für Textantworten ist sie {Text Threshold}.';
	    	} else {
	    	    discStr=self.Disclaimer();
	    	}
                discStr=discStr.split("{Threshold for Reporting}").join(self.SurveyTreshold());
                discStr=discStr.split("{Text Threshold}").join(self.TextTreshold());
    	}    	
    	return discStr;
    };

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
    self.SurveyTreshold = ko.observable();
    self.TextTreshold = ko.observable();
    self.UseCookie = ko.observable();
    self.Disclaimer = ko.observable();
    self.Description = ko.observable();
    self.IsActive = ko.observable();
    self.IsTest = ko.observable();
    self.Questions = ko.observableArray();
    self.param11 = ko.observable();
    self.param22 = ko.observable();
    self.sentSurvey = ko.observable(false);
    self.CompletelyTranslatedLangs = ko.observableArray([]);

    self.submitBtn = function ($data) { // sending answers submit button
        var r = $.Deferred();
        var validate = true;
        var alertBox = false;
        for(var i = 0; i < currentQuestionObject.Questions().length; i++){ // validate answers
            console.log(currentQuestionObject.Questions()[i])
            if(currentQuestionObject.Questions()[i].IsMultiChoice == 0 && currentQuestionObject.Questions()[i].AllowCantSay == 0 && (currentQuestionObject.Questions()[i].QuestionType == 'Rating' || currentQuestionObject.Questions()[i].QuestionType == 'Options')){
                if(currentQuestionObject.Questions()[i].NumericAnswer == '') {
                    $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"2px solid #a94442", padding:"0 15px"});
                    validate = false;
                } else {
                    $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"none", padding:"0"});
                } 
            }

            if(currentQuestionObject.Questions()[i].IsMultiChoice == 1 && currentQuestionObject.Questions()[i].AllowCantSay == 0 && (currentQuestionObject.Questions()[i].QuestionType == 'Rating' || currentQuestionObject.Questions()[i].QuestionType == 'Options')){
                if(currentQuestionObject.Questions()[i].NumericAnswerForMulti.length == 0) {
                    $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"2px solid #a94442", padding:"0 15px"});
                    validate = false;
                } else {
                $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"none", padding:"0"});
                }
            }

            if(currentQuestionObject.Questions()[i].IsMultiChoice == 3  && currentQuestionObject.Questions()[i].AllowCantSay == 0 && (currentQuestionObject.Questions()[i].QuestionType == 'Rating' || currentQuestionObject.Questions()[i].QuestionType == 'Options')){
                if(currentQuestionObject.Questions()[i].NumericAnswerForMulti.length != currentQuestionObject.Questions()[i].DropdownsOptions.length) {
                    $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"2px solid #a94442", padding:"0 15px"});
                    validate = false;
                } else {
                $("#content_feedback_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"none", padding:"0"});
                }
            }

            if(currentQuestionObject.Questions()[i].AllowCantSay == 0 && currentQuestionObject.Questions()[i].QuestionType == 'Text') {
                if( $("#message_txt_area_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).val() == ''){
                    $("#message_txt_area_box_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css({border:"2px solid #a94442", padding:"0 15px"});
                    validate = false;
                } else {
                    $("#message_txt_area_box_"+currentQuestionObject.Questions()[i].IdSurveyQuestions).css('border', 'none');
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
            console.log(value);
            console.log(value.value);
            console.log(index);
            if (currentQuestionObject.Questions()[index].QuestionType == "Text") {
                tempText = $("#message_txt_area_" + value.IdSurveyQuestions).val() // texts answers

                tempParams = {};
                tempParams.IdSurveyQuestions = value.IdSurveyQuestions;
                tempParams.IdQuestionType = 1;
                tempParams.TextAnswer = tempText ? tempText : '';
                tempParams.NumericAnswer = null;
                tempParams.IsTest = 1;
                paramsList.push(tempParams);
                // console.log(paramsList);
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
                    }else {
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
                    }else {
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
                    }else {
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
                        tempParams.NumericAnswer =  currentQuestionObject.Questions()[index].NumericAnswer;
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

        if(validate) {
            console.log(params);
            $.ajax({
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(params),
                crossDomain: true,
                url: '/services/api/SendSurveyForPop.xsjs',
                error: function (x, s, m) {
                    alert("Something went wrong, please try later!");
                    console.log(x, s, m);
                },
                success: function (res) {
                    console.log(res);
                    setTimeout(function(){
                        $("#testForBinding, .flagsDiv, #disclaimerText, #sbmtBtn, #user_desktop_container, .info_content_page").hide();
                        $("#thankst-template").show();
                    }, 1000);
                    r.resolve();
                    self.sentSurvey(true);
                    if (self.UseCookie()==1) {
                        setOrGetCookie();
                    }
                }
            });
            return r;
         }else {
            alert('Please fill all questions!!');
         }
    };
};


var surveyObject = new SurveyObjectModel();
ko.applyBindings(surveyObject, document.getElementById("header"));
ko.applyBindings(surveyObject, document.getElementById("testForBinding"));


var currentQuestionObject = new CurrentQuestionObject();
ko.applyBindings(currentQuestionObject, document.getElementById("sbmtBtn"));
ko.applyBindings(currentQuestionObject, document.getElementById("textBox-template"));
ko.applyBindings(currentQuestionObject, document.getElementById("ratingBox-template"));
ko.applyBindings(currentQuestionObject, document.getElementById("optionsBox-template"));
ko.applyBindings(currentQuestionObject, document.getElementById("disclaimerText"));

$(document).ready(function () {

    if (getCookie('IdSurveyPermanent')) {
        var tempArr = getCookie('IdSurveyPermanent').split(',');
        for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i] == getParameterByName("id")) {
                alert('You already participated in this permanent Survey');
                $("#testForBinding, #thankst-template, #disclaimerText, .flagsDiv, #sbmtBtn").hide();
                window.close();
            }
        }
    }
    
    surveyObject.IdSurveyParam(getParameterByName("id")); // getting IdSurvey parameter from url

    surveyObject.LangLocale(getCookie('lang')); // getting cookie lang for language

    currentQuestionObject.param11(getParameterByName('param1')); // getting parameter one from url
    currentQuestionObject.param22(getParameterByName('param2')); // getting parameter two from url

    
    surveyObject.getSurvey().done(function () {

        if (getCookie('lang')) { // check flag from cookie
            if ((surveyObject.IsTest() == 1 && surveyObject.IsActive() == 0) || (surveyObject.IsTest() == 0 && surveyObject.IsActive() == 0)) {
                if (getCookie('lang') == 'en') { 
                    surveyObject.LangLocale(getCookie('lang'));
                    setTimeout(function(){ 
                        setEnglish();
                    }, 1000);
                } else if (getCookie('lang') == 'de') {
                    surveyObject.LangLocale(getCookie('lang'));
                    setTimeout(function(){ 
                        setDutch();
                    }, 1000);
                }
            } else if (surveyObject.IsActive() == 1) {
                if (getCookie('lang')=='de' && surveyObject.CompletelyTranslatedLangs().length > 0) {
                    surveyObject.LangLocale(getCookie('lang'));
                    setTimeout(function(){ 
                        setDutch();
                    }, 1000);
                } else {
                    if (getCookie('lang') != 'en') {
                        setCookie('lang', 'en', 360);
                        surveyObject.LangLocale(getCookie('lang'));
                        setTimeout(function(){ 
                            setEnglish();
                            $('.flag1').addClass('active');
                            $('.menu_cont').remove();
                            $('#user_desktop_container').removeClass('user_desktop_container');
                        }, 1000);
                        location.reload();
                    } else if (surveyObject.CompletelyTranslatedLangs().length == 0){
                        setTimeout(function(){ 
                            setEnglish();
                            $('.flag1').addClass('active');
                            $('.menu_cont').remove();
                            $('#user_desktop_container').removeClass('user_desktop_container');
                        }, 1000);
                    }
                }
            }
        } else { // set cookie english if don't have it
            setCookie('lang', 'en', 360);
            surveyObject.LangLocale(getCookie('lang'));
            setEnglish();
            location.reload();
        }


        if (getCookie('lang')) { // set flag from cookie
            if ((surveyObject.IsTest() == 1 && surveyObject.IsActive() == 0) || surveyObject.CompletelyTranslatedLangs().length > 0) {
                if (getCookie('lang')=='en') { 
                    surveyObject.LangLocale(getCookie('lang'));
                    setTimeout(function(){ 
                        setEnglish();
                    }, 1000);
                } else if (getCookie('lang')=='de') {
                        surveyObject.LangLocale(getCookie('lang'));
                        setTimeout(function(){ 
                            setDutch();
                        }, 1000);
                }
            }  
        }

        $('.flags').on('click', function() { // logic for changing flags and permanent language
            var lang = this.id;
    
            if (lang == 'english') {
                setCookie('lang', 'en', 360);
                location.reload();
            } else if (lang == 'germany') {
                setCookie('lang', 'de', 360);
                location.reload();
            }
    
        });

        //rating
        $("input[type='radio']").on('change touchend', function($data){
            this.parentElement.parentElement.style.border = 'none';
            var idto = this.id;
            var valval = this.value;
            $.each(currentQuestionObject.Questions(), function(index, value) {
                console.log(idto);
                console.log(valval);
                if (idto.indexOf("odg"+value.IdSurveyQuestions+"_") >= 0){
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
            var htmlElement = this;
            $.each(currentQuestionObject.Questions(), function(index, value) {
                console.log(idto);
                console.log(valval);
                if (idto.indexOf("odg_"+value.IdSurveyQuestions+"_") >= 0){
                    for (var i = 0; i < value.QuestionOptions.length; i++) {
                        if (value.QuestionOptions[i].Value == valval && value.QuestionOptions[i].OptionEndSurvey == 1) {
                            if (confirm('This option selected will end your Survey! Do you want to coninue?')) {
                                setTimeout(function(){
                                    $("#testForBinding, #sbmtBtn, .flagsDiv, #disclaimerText").hide();
                                    $("#thankst-template").show();
                                    if (currentQuestionObject.UseCookie()==1) {
                                        setOrGetCookie();
                                    }
                                }, 1000);
                            } else {
                                htmlElement.checked = false;
                                value.NumericAnswer = '';
                                console.log(value.NumericAnswer);
                            }
                        } else if (value.QuestionOptions[i].Value == valval) {
                            value.NumericAnswer = valval;
                            console.log(value.NumericAnswer);
                        }
                    }
                }
            })
        });

        // rating dropdown
        $(".ddlOptionsRating").on('change', function () {
            this.parentElement.parentElement.parentElement.parentElement.style.border = 'none';
            var idto = this.id;
            var valval = this.value;

            $.each(currentQuestionObject.Questions(), function(index, value) {
                console.log(idto);
                console.log(valval);
                if (idto.indexOf("ddl"+value.IdSurveyQuestions+"_") >= 0){
                    if(currentQuestionObject.Questions()[index].IsMultiChoice ==3 ){
                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                        var tempObj = [];
                        for(var i=0;i < currentQuestionObject.Questions()[index].DropdownsOptions.length;i++){
                            console.log(parseInt($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val(),0));
                            if(parseInt($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val(),0)!=NaN && $("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val()!=""){ //something is selected
                                tempObj.push($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val());
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

            $.each(currentQuestionObject.Questions(), function(index, value) {
                console.log(idto);
                console.log(valval);
                if (idto.indexOf("ddl"+value.IdSurveyQuestions+"_") >= 0){
                    if(currentQuestionObject.Questions()[index].IsMultiChoice ==3 ){
                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                        var tempObj = [];
                        for(var i=0;i < currentQuestionObject.Questions()[index].DropdownsOptions.length;i++){
                            console.log(parseInt($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val(),0));
                            if(parseInt($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val(),0)!=NaN && $("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val()!=""){ //something is selected
                                tempObj.push($("#ddl"+value.IdSurveyQuestions+"_"+i+" option:selected").val());
                                currentQuestionObject.Questions()[index].NumericAnswerForMulti = tempObj;
                            }
                        }
                    } else if(currentQuestionObject.Questions()[index].IsMultiChoice ==1){
                        currentQuestionObject.Questions()[index].NumericAnswerForMulti = [];
                        var tempObj = [];
                        for(var i=0;i < currentQuestionObject.Questions()[index].QuestionOptions.length;i++){
                            if($("#"+idto).is(':checked')) {
                                console.log($("#"+idto).val());
                                tempObj.push($("#"+idto).val())
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
            var tempObjM=[];
            var idto = this.id;
            var valval = this.value;

            $.each(currentQuestionObject.Questions(), function(index, value) {
                console.log(idto);
                console.log(valval);
                if (idto.indexOf("odg"+value.IdSurveyQuestions+"_") >= 0){
                    if(currentQuestionObject.Questions()[index].IsMultiChoice ==1){
                        console.log($("#"+idto).val());
                        if($("#"+idto).is(":checked")){
                            currentQuestionObject.Questions()[index].NumericAnswerForMulti.push( $("#"+idto).val())
                        }else{
                            for (var i=currentQuestionObject.Questions()[index].NumericAnswerForMulti.length-1; i>=0; i--) {
                                if (currentQuestionObject.Questions()[index].NumericAnswerForMulti[i] == $("#"+idto).val()) {
                                    currentQuestionObject.Questions()[index].NumericAnswerForMulti.splice(i, 1);
                                }
                            }
                        }
                    }
                }
            });
        });

        // reset validation
        $('.message_text ').on('click', function(){ this.parentElement.parentElement.style.border = 'none' });


    });

})

function setCookie(cname, cvalue, exdays) { // SET cookie for language
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) { // GET cookie for language
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setEnglish() { // set english language on app
    $('.flag1').addClass('active');
    $('.flag2').removeClass('active');
    $('.flagsDiv').remove();
    // document.getElementsByClassName('desktop_img_profile').appendChild('<div class="flagsDiv"><a id="english" class="flags flag1"> <img src="img/flag-kingdom.png" alt=""></a> </div>')
    $('.desktop_img_profile').append(`<div class="flagsDiv"><a id="english" class="flags flag2"> <img src="img/flag-kingdom.png" alt=""></a> </div>`); 
    $('.icon-primary').text('Submit');
    $('.copyright_dm').text('Copyright © 2018 SurveyRocks. All rights reserved.'); 
    $('.message_text').attr('placeholder', 'Write your answer here and consider the assistance found in the side panel...');
    $('.naslov_thankst').text('You have successfully submitted your survey answers! Thanks for your Feedback');
    setTimeout(function(){
        for (var i = 0; i < $('select').length;i++){
            $("select").eq(i).find('option:first').text('Choose...')
        }
    }, 0);
}

function setDutch () { // set german language on app
    $('.flag2').addClass('active');
    $('.flag1').removeClass('active');
    $('.flagsDiv').remove();
    // document.getElementsByClassName('desktop_img_profile').appendChild('<div class="flagsDiv"><a id="english" class="flags flag1"> <img src="img/flag-kingdom.png" alt=""></a> </div>')
    $('.desktop_img_profile').append(`<div class="flagsDiv"><a id="english" class="flags flag2"> <img src="img/flag-germany.png" alt=""></a> </div>`); 
    $('.icon-primary').text('Einreichen');
    $('.copyright_dm').text('Copyright © 2018 SurveyRocks. Alle Rechte vorbehalten');
    $('.message_text').attr('placeholder', 'Schreibe bitte hier deine Antwort und beachte mögliche Hinweise auf der rechten Seite des Bildschirms...');
    $('.naslov_thankst').text('Sie haben Ihre Umfrageantworten erfolgreich eingereicht! Vielen Dank für Ihr Feedback');
    setTimeout(function(){ 
        for (var i = 0; i < $('select').length;i++){
            $("select").eq(i).find('option:first').text('Wählen...')
        }
    }, 0);
}

function getParameterByName(name) { // function for getting parameter from url
    url = window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
function setOrGetCookie() {
    if (getCookie('IdSurveyPermanent')) {
        var tempVal = getCookie('IdSurveyPermanent');
        tempVal = tempVal.concat(','+surveyObject.IdSurveyParam())
        setCookie('IdSurveyPermanent', tempVal, 1000);
    } else {
        setCookie('IdSurveyPermanent', surveyObject.IdSurveyParam(), 1000);
    }
}
