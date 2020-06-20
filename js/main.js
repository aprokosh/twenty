//блок-аккордеон
$('.accordeon_block h3').click(function () {
    if (!$(this).parent().find('block').is(':visible')) {
        $(this).parent().find('block').show(200)
    }
    else {
        $(this).parent().find('block').hide(200)
    }
});


//закрыть окошко
$(document).on('click', '.cross_image', function(){
    $(this).parent().parent().toggleClass('deleteIt')
   $("div.deleteIt").remove()

});

//
$(document).on('click', '.structItemRemovingCross', function(){
    let n = document.getElementById('addMoreItems').className;
    n = parseInt(n,10);
    n = Number(n) - Number(1);
    document.getElementById('addMoreItems').className = n.toString();
});

//получить сообщение об ошбке
function getErr(){
    fetch('/geterror')
        .then(
            function(response) {
                if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.text().then(function(data) {
                    if (data!=="None") {
                        if (data === "OK") showSuccess();
                        else if (data === "Give") showRes();
                        else showErr(data)
                    }
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

//вывести сообщение об ошибке
function showErr(data){
    let qq = '';
    qq += '<div id="err_msg", class="push">';
    qq += '<div class="push_head"><h3>Ошибка!</h3><img class="cross_image clickable" src="style/img/cross.svg" alt="close"></div>';
    qq += '<div class="push_body">'+data+'</div>';
    document.getElementById('error_message').innerHTML = qq;
}

function showSuccess(){
    let qq = '';
    qq += '<div id="err_msg", class="push">';
    qq += '<div class="push_head"><h3>Успешно!</h3><img class="cross_image clickable" src="style/img/cross.svg" alt="close"></div>';
    qq += '<div class="push_body">Превосходно! Вы определенно Ира. Код доступа: givememypresent</div>';
    document.getElementById('error_message').innerHTML = qq;
}

function showRes(){
    let qq = '';
    qq += '<img src="style/img/coupon.png" alt="coupon">';
    document.getElementById('placeForRes').innerHTML = qq;
}

$("#mainForm").submit(function(event){
    event.preventDefault();
    let ans1 = document.querySelector('#q1').value;
    let ans2 = document.querySelector('#q2').value;
    let ans3 = document.querySelector('#q3').value;
    let ans4 = document.querySelector('#q4').value;
    let ans5 = document.querySelector('#q5').value;
    $.post('/answers', { ans1: ans1, ans2: ans2, ans3: ans3, ans4: ans4, ans5: ans5});
    getErr()
});

$("#resForm").submit(function(event){
    event.preventDefault();
    let code = document.querySelector('#code').value;
    $.post('/code', { code: code});
    getErr();
});

getErr();

