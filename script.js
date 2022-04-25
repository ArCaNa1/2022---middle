$(function(){
    inters = "";
    init();
    event_on();
})

// 클릭 이벤트
function event_on(){
    $(document).unbind();

    // 시작
    $(document).on("click", ".start", function(){
        clearTimeout(inters)
        init();
        random();
        card_see();
        setTimeout(function(){
            countdown();
            start = true;
        },5000)
    })

    $(document).on("click", "#re", function(){
        $(".form").show();
    })

    $(document).on("click", ".form .cur", function(){
        $(".form").hide();
        $(".form input[type='text'],.form textarea").val("");
    })

    $(document).on("click", ".file2", function(){
        $(".file")[0].click();
    });

    $(document).on("click", ".form .sub", function(){
        if($(".name").val() == "" || $(".shop1").val() == "" || $(".shop2").val() == "" || $(".shop3").val() == "" || $(".inp").val() == "" || $(".file").val()  == ""){
            alert("모든 값을 입력해야합니다.");
            return false;
        }

        var pattern = /[(가-힣a-zA-Z)]/;
        if(!pattern.test($(".name").val()) || !($(".name").val().length >= 2 && $(".name").val().length <= 50)){
            alert("한글과 영어만 허용이 가능하며 2자이상 50자 이내여야합니다.")
            return false;
        }
        
        var datatimeRegexp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        if ( !datatimeRegexp.test($(".shop3").val()) ) {
            alert("날짜는 yyyy-mm-dd 형식으로 입력해주세요.");
            return false;
        }

        if($(".inp").val().length < 100){
            alert("글자는 100자 이상 적성해야합니다.")
            return false;
        }

        var file = $(".file")[0].files[0].name;
        file = file.split('').reverse().join('');
        file = file.split('.')[0].split('').reverse().join('');

        if(file != "jpg"){
            alert("형식이 jpg가 아닙니다.");
            return false;
        }

        alert("구매 후기가 등록되었습니다.");
        $(".form").hide();
    })

    $(document).on("mouseover", ".sta .sta1 > div", function(){
        ind = $(this).index();
        par = $(this).parent().index();
        $(".score span").html(Number(par * 2 ) + ind + 1);
        $(".sta1 div").each(function(idx,elem){
            if(idx + 1 >= Number(par * 2 ) + ind + 2){
                $(this).find('i').removeClass("fa-star-half-o");
                $(this).find('i').addClass("fa-star-o")
            } else {
                $(this).find('i').addClass("fa-star-half-o");
                $(this).find('i').removeClass("fa-star-o")
            }
        }); 
    })

    $(document).on("click", ".game .main tr td", function(){
        card_change(this);
    })

    // 힌트
    $(document).on("click", ".hint", function(){
        if(start){
            start = false;
            $(`.game .main tr td`).find(".back").css({"transform" : "rotateY(180deg)"});
            $(`.game .main tr td`).find("img").css({"transform" : "rotateY(0deg)"});
            
            setTimeout(function(){
                $(".game .main tr td").each(function(idx,elem){
                    if($(elem).attr("data-chk") == "true"){
                        $(elem).find("div").css({"transform" : "rotateY(0deg)"});
                        $(elem).find("img").css({"transform" : "rotateY(180deg)"});
                    }
                })
                start = true;
            },3000);
        }
    });
}

// 초기값
function init(){
    start = false;
    rand = [];
    seat = [];
    country = ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군","함안군", "함양군", "합천군"]

    count = 0;
    img_chk = false;
    rotate_start = false;
    first_index = 0;
    first_seat = 0;

    $(".last_time").text("00:00");
    $(".card_count").text("0개");
}

// 카드 선택
function card_change(th){
    attr = $(th).attr("data-chk")
    if(start == true && attr == "true"){
        $(th).find(".back").css({"transform" : "rotateY(180deg)"});
        $(th).find("img").css({"transform" : "rotateY(0deg)"});

        if(!img_chk){
            first_seat = $(th).attr("data-seat");
            first_index = $(th).attr("data-index")
            inter = setTimeout(function(){
                if(img_chk){
                    $(`.game .main tr td[data-index="${first_index}"]`).find(".back").css({"transform" : "rotateY(0deg)"});
                    $(`.game .main tr td[data-index="${first_index}"]`).find("img").css({"transform" : "rotateY(180deg)"});
                    first_index = 0;
                    first_seat = 0;
                    img_chk = false;
                } else {
                    clearTimeout(inter);
                }
            },3000)
            img_chk = true;
        } else {
            if(first_index != $(th).attr("data-index")){
                $(th).find(".back").css({"transform" : "rotateY(180deg)"});
                $(th).find("img").css({"transform" : "rotateY(0deg)"});
                if(first_seat == $(th).attr("data-seat")){  
                    clearTimeout(inter);
                    count++;
                    $(".card_count").text(`${count}개`);
                    $(`.game .main tr td[data-index="${first_index}"]`).attr("data-chk", false);
                    $(`.game .main tr td[data-index="${first_index}"]`).find(".text").css({"opacity" : "1"});
                    $(th).find(".text").css({"opacity" : "1"});
                    $(th).attr("data-chk", false);
                    first_index = 0;
                    first_seat = 0;
                    img_chk = false;
                } else {
                    clearTimeout(inter);
                    setTimeout(function(){
                        $(`.game .main tr td[data-index="${first_index}"]`).find("div").css({"transform" : "rotateY(0deg)"});
                        $(`.game .main tr td[data-index="${first_index}"]`).find("img").css({"transform" : "rotateY(180deg)"});
                        $(th).find(".back").css({"transform" : "rotateY(0deg)"});
                        $(th).find("img").css({"transform" : "rotateY(180deg)"});
                        first_index = 0;
                        first_seat = 0;
                        img_chk = false;
                    },1000)
                }
            }
        }
    }
}

// 1분 30초 카운트
function countdown(){ 
    time = 90;
    inters = setInterval(function(){
        time--;
        if(time == 0){
            clearInterval(inters);
        }
        if(time % 60 < 10){
            seconds = "0"+time % 60;
        } else {
            seconds = time % 60;
        }

        if(time > 59){   
            $(".last_time").text(`0${Math.floor(time / 60)}:${seconds}`);
        } else if(time == 60){
            $(".last_time").text(`0${time / 60}:00`);
        } else {
            $(".last_time").text(`00:${seconds}`);
        }

        if(time == 0){
            clearInterval(inters);
            timeover();
        }

        if(count == 8){
            clearInterval(inters);
            timeover();
        }
    },1000);
}

// 성공한 경우 테두리에 색주기
function timeover(){
    start = false;
    $(".game .main tr td > .back").css({"transform" : "rotateY(180deg)"});
    $(".game .main tr td img").css({"transform" : "rotateY(0deg)"});
    $(".game .main tr td").each(function(idx, elem){
        $(this).find(".text").css({"opacity" : "1"})
        if($(elem).attr("data-chk") == "true"){
            $(this).find("img").css("border" , "5px solid red");
        } else {
            $(this).find("img").css("border" , "5px solid green");
        }
    });
}

// 5초동안 보여주기
function card_see(){
    time = 5;
    $(".last_time").text("00:05");
    $(".game .main tr td > .back").css({"transform" : "rotateY(180deg)"});
    $(".game .main tr td img").css({"transform" : "rotateY(0deg)"});

    inter = setInterval(function(){
        time--;
        $(".last_time").text(`00:0${time}`);
    },1000)

    setTimeout(function(){
        $(".game .main tr td > .back").css({"transform" : "rotateY(0deg)"});
        $(".game .main tr td img").css({"transform" : "rotateY(180deg)"});
        clearInterval(inter)
        $(".start").text("다시하기")
        $(".last_time").text(`01:30`);
    },5000)
}

function random(){
    rand = [];
    seat = [];
    
    // 이미지 랜덤으로 뽑아오기
    i = 0;
    while(i < 8){
        chk = true;
        rands = Math.ceil(Math.random() * 18);
        for(j = 0; j < rand.length; j++){
            if(rand[j] == rands){
                chk = false;
                break;
            }
        }
        if(!chk){
            continue;
        }

        rand.push(rands);
        i++;
    }

    // 이미지 8개 가져온거 두개씩 랜덤 배치
    i = 0;
    while (i < 16){
        chk = true;
        rands = Math.ceil(Math.random() * 16);
        for(j = 0; j < seat.length; j++){
            if(seat[j] == rands){
                chk = false;
                break;
            }
        }
        if(!chk){
            continue;
        }
        seat.push(rands);
        i++;
    }

    // 랜덤배치 html로 구현
    i = 1;
    j = 0;
    $(".main table").html("");
    while(i <= 16){
        if(i % 4 == 1){
            $(".main table").append("<tr></tr>");
            j++;
        }

        sit = seat.indexOf(i)
        img = Math.ceil(sit / 2);
        if(sit == 15){
            img = 0;
        }
        $(`.main table tr:nth-child(${j})`).append(`<td data-chk="true" data-index="${i}" data-seat="${rand[img]}"><img style="transition:.5s;" src="선수제공파일/특산품/${rand[img]}.jpg"><div class="text"><p>${country[rand[img]-1]}</p></div><div class="back" style="transition:.5s;"></div></td>`);
        i++;
    }
}