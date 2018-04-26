window.onload = function() {

    //two main variables wchich defines recent day and recent week
    let todayIs = 65;
    let recentWeek = week7;

    
    let weeks = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12];

    let mealPlanContainer = document.querySelector('.meal-plan-container');               
    let switchWeek = document.querySelectorAll('.week-navigation');

    //add user info
    let userName = document.querySelector('.user-info-link');
    let userPhoto = document.querySelector('.user-photo');

    userName.innerHTML = user.name + ' ' + user.surname;
    userPhoto.innerHTML = '<img src="' + user.photo + '" alt="User Photo" />';

    //add diet icons
    let dietType = document.querySelector('.diet-type-container');
    let weekProgress = document.querySelector('.week-progress-bar');
    let weekProgressNumber = document.querySelector('.week-progress-number');

    dietType.innerHTML = '<p>select your protein options</p>' +
                    '<div><span class="diet-icon vegetarian"></span>' +
                    '<span class="diet-icon cheese"></span>' +
                    '<span class="diet-icon meat"></span>' +
                    '<span class="diet-icon fish"></span>' +
                    '<span class="diet-icon chicken"></span></div>';

    //draw progress bar
    for(var d = 0; d < weeks.length; d++){
        if(d <= weeks.length - 2){
            weekProgress.innerHTML += '<div class="progress-bar dot">' + 
                    '</div><div class="progress-bar line"></div>';
            weekProgressNumber .innerHTML += `<p>${d + 1}</p>`;
        }
        else if(d === weeks.length - 1){
            weekProgress.innerHTML += '<div class="progress-bar dot">';
            weekProgressNumber.innerHTML += `<p>${d + 1}</p>`;
        }
    }

    //main loop drawing the meal info
    for(var wk = 0; wk < weeks.length; wk++){
        if(recentWeek === weeks[wk]){
            addWeekMealInfo(recentWeek);
        }
    }     

    //add week meal info depends of recent week
    function addWeekMealInfo(week){
        for(var r = 0; r < week.length; r++){
            addColumnsWithMeals(r);

            let day = week[r].day;
            //add photo on bode shake on the end of the loop
            if(r === week.length-1){
                addShakeImage();
                //console.log('dziala');
                addShakeColorImage();
            }
        }
    }


    //find recent week dot-------
    let recentWeekDotPosition = [];       
    let foundWeek = false;
    let weekDotPosition;
    for(var wkc = 0; wkc < weeks.length; wkc++){
        if(weeks[wkc] === recentWeek){
            foundWeek = true;
            weekDotPosition = wkc;
            recentWeekDotPosition.push(wkc);
            break;
        } 
    }

    let weekDot = document.querySelectorAll('.dot');
    let weekLine = document.querySelectorAll('.line');

    function recentWeekDotLine(rwdp){
        findRecentLine(weekLine);
        findRecentDot(weekDot);
    }
    recentWeekDotLine(recentWeekDotPosition);

    function findRecentLine(weekL){
        for(var ld = 0; ld <weekL.length; ld++){
            if(ld === recentWeekDotPosition[0]){
                for(var i = ld - 1; i < weekL.length; i++){
                    weekL[i].classList.toggle('upcoming-week-line');
                }
                break;
            }
        }
    }

    function findRecentDot(weekD){
        for(var wd = 0; wd < weekD.length; wd++){
            if(wd === recentWeekDotPosition[0]){
                weekDot[wd].classList.toggle('recent-week-dot');
                for(var i = wd + 1; i < weekD.length; i++){
                    weekD[i].classList.toggle('upcoming-week-dot');
                }
                break;
            }
        }
    }


    //make recent dot bigger when navigating/switching between weeks
    function makeRecentWeekDotBigger(weekPos){
        for(var i = 0; i < weekDot.length; i++){
            weekDot[weekPos].classList.add('d-border');
            if(weekPos === 0){
                if(weekDot[weekDot.length - 1].classList.contains('d-border')){
                    weekDot[weekDot.length - 1].classList.remove('d-border');  
                }
                else{
                    weekDot[weekPos + 1].classList.remove('d-border');
                } 
            }
            else if(weekPos === weekDot.length - 1){
                if(weekDot[0].classList.contains('d-border')){
                    weekDot[0].classList.remove('d-border');
                }
                else{
                    weekDot[weekPos - 1].classList.remove('d-border');
                }
            }
            else if(weekDot[weekPos + 1].classList.contains('d-border') === true && weekPos > 0){
                weekDot[weekPos + 1].classList.remove('d-border');
            }
            else if(weekDot[weekPos - 1].classList.contains('d-border') === true && weekPos <= 11 ){
                weekDot[weekPos - 1].classList.remove('d-border');
            }
            else if(weekPos === recentWeekDotPosition[0]){
                weekDot[weekPos].classList.remove('d-border');
            }
        }
    }
    //end of find recent week dot-------

    //minimize start animation to logo size
    let svg = document.querySelector('.svg');
    
    function fadeOutSvg(){
        setTimeout(function(){
            svg.classList.add('fade-out');
        }, 6500);
    }
    function showLogoSvg(){
        setTimeout(function(){
            svg.classList.remove('svg');
            svg.classList.remove('fade-out');
            svg.classList.add('svg-logo');
        },7500);
    }
    fadeOutSvg();
    showLogoSvg();
    //minimize start animation to logo size--------end


    //show as many column as screen allows------------------------
    //and add buttons to navigate through column
    function onResize(){
        addScrollButtons();
        getScrollButtons();
    }
    window.addEventListener('resize', onResize);

    let mealPlanCont = document.querySelector('#meal-plan');
    let mealPlanContWidth = mealPlanCont.clientWidth;
    let mealPlanContWidthUpdate;
    
    function addScrollButtons(){
        let bodyWidth = document.body.clientWidth;
        let getScrollButton = document.querySelectorAll('.scroll-nav');

        if(bodyWidth < 1000){
            if (getScrollButton[0] === undefined){
                mealPlanContainer.innerHTML += `
                <span class="scroll-nav scroll-nav-left center">
                    <span class="nav-arrow"></span>
                </span>   
                <span class="scroll-nav scroll-nav-right center">
                    <span class="nav-arrow"></span>
                </span>
            `;
            } else {
                for(var gsb = 0; gsb < getScrollButton.length; gsb++){
                    getScrollButton[gsb].classList.remove('disp-none');
                }
            }
            
        } else if(bodyWidth > 1000) {
            for(var gsb = 0; gsb < getScrollButton.length; gsb++){
                getScrollButton[gsb].classList.add('disp-none');
            }
        }
    }
    addScrollButtons();

    function getScrollButtons(){
        let getScrollButton = document.querySelectorAll('.scroll-nav');

        for(var gsb = 0; gsb < getScrollButton.length; gsb++){
            getScrollButton[gsb].addEventListener('click', function(){            
                if(this === getScrollButton[1]){
                    getScrollButton[1].scrollLeft += 128;
                    mealPlanContainer.scrollLeft += 128;
                    scaleButton(this);
                    deleteScaleButton(this);
                }
                else {
                    getScrollButton[1].scrollLeft += 128;
                    mealPlanContainer.scrollLeft -= 128;
                    scaleButton(this);
                    deleteScaleButton(this);
                }
            });
        }
    }
    getScrollButtons();
    
    function scaleButton(t){
        t.classList.add('scale-button');
    }

    function deleteScaleButton(t){
        setTimeout(function(){
                t.classList.remove('scale-button');
        }, 200);
    }
    //show as many column as screen allows----------------end

    //change week number and diet type in recent week navigating/switching between weeks------
    let recentWeekPosition = [];
    for(var i = 0; i < switchWeek.length; i++){
        switchWeek[i].addEventListener('click', function(){
            //find recent week
            let found = false;
            let weekPosition;

            for(var wkc = 0; wkc < weeks.length; wkc++){
                if(weeks[wkc] === recentWeek){
                    found = true;
                    weekPosition = wkc;
                    recentWeekPosition.push(wkc);
                    break;
                } 
            }
            if(this.classList.contains('week-nav-back') === true && found === true){
                recentWeek = weeks[weekPosition - 1];
                weekPosition--;
                mealPlanContainer.innerHTML = '';
                
                if(weekPosition < 0){
                    weekPosition = 11;
                    recentWeek = weeks[weekPosition];
                }
                makeRecentWeekDotBigger(weekPosition);
                addWeekMealInfo(recentWeek);
                if(weekPosition < recentWeekPosition[0]){
                    addDumbellColorIcon();

                    let recentDay = document.querySelectorAll('.meal-column');
                    addCheckedIconMeal(recentDay);
                }
                addScrollButtons();
                getScrollButtons();
            }
            else if(this.classList.contains('week-nav-forward') === true && found === true){
                recentWeek = weeks[wkc + 1];
                weekPosition++;
                mealPlanContainer.innerHTML = '';
                
                if(weekPosition > 11){
                    weekPosition = 0;
                    recentWeek = weeks[weekPosition];
                }
                makeRecentWeekDotBigger(weekPosition);
                addWeekMealInfo(recentWeek);
                if(weekPosition < recentWeekPosition[0]){
                    addDumbellColorIcon();
                    let recentDay = document.querySelectorAll('.meal-column');
                    
                    addCheckedIconMeal(recentDay);
                }
                addScrollButtons();
                getScrollButtons();
            }
        });
        
    }
    //end------change week number and diet type in recent week navigating/switching between weeks

    //add day columns 
    function addColumnsWithMeals(i){

        //add recent week number
        if(i === 0){
            let recentWeekNumber = document.querySelector('#week');

            if(recentWeek[i].week !== undefined){
                recentWeekNumber.innerHTML = `
                Week ${recentWeek[i].week}
            `;
            }
            else {
                recentWeekNumber.innerHTML = ':)';
            }
            
        }         
            
        if(recentWeek[i].guiltFree === true){
            mealPlanContainer.innerHTML += `
                    <ul class="meal-column">
                        <li class="day center border-bn"><span>Day ${recentWeek[i].day}</span></li>
                        <li class="guild-free center"><span class="center"><span class="happy-face"></span><p>guild-free day</p></span></li>
                        <li class="print center"><span class="printer"></span><span>Print</span></li>
                    </ul>
                    `;
            if(todayIs === recentWeek[i].day){
                addDumbellColorIcon();
                addBorderRecenDay();
                changeDayCellHeight();
                changeFontColorRecentDay();
            }
        }
        else{
            if(recentWeek[i].week === undefined){
                mealPlanContainer.innerHTML = 'No meals has been added yet';
                
            } 
            else {
                mealPlanContainer.innerHTML += `
                    <ul class="meal-column border-rt">
                        <li class="day center border-bn"><span>Day ${recentWeek[i].day}</span></li>
                        <li id="meal" class="6am meal border-bn"><p>${recentWeek[i].hour6am}</p></li>
                        <li id="meal" class="9am meal border-bn"><p>${recentWeek[i].hour9am}</p></li>
                        <li id="meal" class="12pm meal border-bn"><p>${recentWeek[i].hour12pm}</p></li>
                        <li id="meal" class="3pm meal border-bn"><p>${recentWeek[i].hour3pm}</p></li>
                        <li id="meal" class="6pm meal"><p>${recentWeek[i].hour6pm}</p></li>
                        <li class="diet info center border-bn"><span>${recentWeek[i].diet}</span></li>
                        <li class="workout center info"><span class="dumbell workout-to-do"></span></li>
                    </ul>
                    `;
                if(todayIs === recentWeek[i].day){
                    addDumbellColorIcon();
                    addBorderRecenDay();
                    changeDayCellHeight();
                    changeFontColorRecentDay();
                }
            }
        }
    }
    ////add day columns------------end

    //change grayscale image of Bode Shake to color
    function addShakeColorImage(){
        let colorImage = document.querySelectorAll('.recent-day-border');

        for(var j = 0; j < colorImage.length; j++){
            let childrens = colorImage[0].children;

            for(var k = 0; k < childrens.length; k++){
                if(childrens[k].classList.contains('shake') === true){
                    childrens[k].classList.remove('shake');
                    childrens[k].classList.add('shake-color');
                }
            }
        }
    }
        
    //add class containing grayscale image of Bode Shake
    function addShakeImage(){
        let meal = document.querySelectorAll('#meal');
    
        for(var j = 0; j < meal.length; j++){
            if(meal[j].innerText === 'Bod•ē Shake'){
                meal[j].className += ' shake';
            }
            
        }
    }

    //change dumbell grayscale icon to color when day is done
    function addDumbellColorIcon(){
        let dumbell = document.querySelectorAll('.dumbell');

        for(var d = 0; d < dumbell.length; d++){
            dumbell[d].className += ' workout-done';
            dumbell[d].classList.remove('workout-to-do'); 
            
            if(d === dumbell.length-1){
                addCheckedIconWorkout();
            }
        }
    }

    //add icon "checked" if workout is done
    function addCheckedIconWorkout(){
        let workoutDone = document.querySelectorAll('.workout-done');

        for(var i = 0; i < workoutDone.length; i++){
            workoutDone[i].outerHTML += '<span class="checked"></span>';
        }
    }

    //add border to recent day
    function addBorderRecenDay(){
        let recentDay = document.querySelectorAll('.meal-column');

        for(var i = 0; i < recentDay.length; i++){
            if(i === recentDay.length-1){
                recentDay[i].children[0].children[0].setAttribute('class', 'recent-day-font-color');
                recentDay[i].className += ' recent-day-border';
                
                if(recentDay[i-1] === undefined){
                    continue;
                }
                else if(recentDay[i-1].classList.contains('border-rt') === true){
                    recentDay[i-1].classList.remove('border-rt');
                    addCheckedIconMeal(recentDay);
                    
                }
            }
        }  
    }

    //add "checked" icon when day is done
    function addCheckedIconMeal(elements){
        for(var i = 0; i < elements.length; i++){
            let meals =  elements[i].children;
            let recentDay = elements[i].classList.contains('recent-day-border');
            
            if(recentDay === true){
                continue;
            }
            else{
                for(var j = 0; j < meals.length; j++ ){
                    let cellCointainsMeal = meals[j].classList.contains('meal');

                    if(cellCointainsMeal === true){
                        meals[j].innerHTML = '<p><img class="meal-done" src="gfx/icons/done-icon.png") alt="Meal Done"/>' + meals[j].innerText + '</p>';
                    }

                }
            }
        }
    }


    //change height of cell containing day
    function changeDayCellHeight(){
        let day = document.querySelectorAll('.day');

        for(var i = 0; i < day.length; i++){
            if(i === day.length-1){
                day[i].setAttribute('id', 'day-cell-height');
            }
        }
    }

    //change recent day column font color
    function changeFontColorRecentDay(){
        let mealColor = document.querySelectorAll('.meal-column');

        for(var i = 0; i < mealColor.length; i++){
            if(i === mealColor.length-1){
                mealColor[i].style.color = "#000000";
            }
        }
    }
};