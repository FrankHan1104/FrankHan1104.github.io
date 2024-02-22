$(document).ready(function() {
    init_Sign_Canvas();

    // 휴대폰서명 SMS 팝업창 추가
    $('body').append('<div id="popupExportMobile"><div class="signContentWrap"></div></div>');

    // 휴대폰으로 서명 URL 전송.
    $('#popupExportMobile').on('click', '.sendUrlSms', function() {

        alert("데모 버전에서는 지원하지 않습니다.");
        return false;

        if(signBtnRst==true) {
            $(this).css('display', 'none');
            sendSMS();
            signBtnRst = false;
        }
    });

    // 휴대폰서명 - 팝업 취소
    $('#popupExportMobile').on('click', '.sendUrlSmsClose', function() {
       $('#popupExportMobile').css('display', 'none');
       $('.signContentWrap').empty();
    });

    // 휴대폰 서명 가져오기
    $('#popupExportMobile').on('click', '.importSignData', function() {
        get_signImage();
     });

});

/**
 * 서명확인하기 - 이미지데이타 생성
 */
function fun_submit() {
	var fomSignature = $('.formSignature').val();
	if(!fomSignature && isSign) {
		var canvas = $("#canvas").get(0);
		var imgData = canvas.toDataURL();
		jQuery('#signResultMsg').append(jQuery('<p>아래의 서명날인은 사용합니다.</p>'));
		jQuery('#signature').append($('<input type="hidden" name="signature" class="formSignature form-control input-sm">').attr('value', imgData));
        jQuery('#signResultIMG').append($('<img src="">').attr('src', imgData));
        jQuery('.signData').val(imgData);
	}
    else {

		if(fomSignature) {
			alert('이미 서명 되었습니다.\n다시 서명을 하려면 [ 다시쓰기 ] 버튼을 클릭해 주세요.');
		}
		else {
			alert('서명이 없습니다.\n서명을 해주세요.');
		}
	}
}


/**
 * 서명초기화 (페이지 접속시)
 */
function init_Sign_Canvas() {

	isSign = false; // 서명(싸인패드)
	leftMButtonDown = false; // 서명(싸인패드)

	$('#signature').empty();
	$('#signResultMsg').empty();
    $('#signResultIMG').empty();
    $('.signData').val('');

	//Set Canvas width
	var sizedWindowWidth = $(window).width();
	if(sizedWindowWidth > 700)
		sizedWindowWidth = $(window).width() / 2;
	else if(sizedWindowWidth > 400)
		sizedWindowWidth = sizedWindowWidth - 100;
	else
		sizedWindowWidth = sizedWindowWidth - 50;

	 //$("#canvas").width(sizedWindowWidth);
	 $("#canvas").width(300);
	 $("#canvas").height(100);
	 $("#canvas").css("border","1px solid #333");

	 var canvas = $("#canvas").get(0);

	 canvasContext = canvas.getContext('2d');

	 if(canvasContext) {
		 //canvasContext.canvas.width  = sizedWindowWidth;
		 canvasContext.canvas.width  = 300;
		 canvasContext.canvas.height = 100;

		 canvasContext.fillStyle = "#fff";
		 canvasContext.fillRect(0, 0, sizedWindowWidth, 200);
		 //canvasContext.fillRect(0, 0, 0, 0);

		 canvasContext.moveTo(50, 150);
		 canvasContext.lineTo(sizedWindowWidth-50, 150);
		 canvasContext.stroke();

		var x = canvas.width / 2;
		var y = (canvas.height / 2) + 10; // 폰트 크기의 1/2 값을 더한다.

		canvasContext.textAlign = 'center';
		canvasContext.fillStyle = "#ececec";
		canvasContext.font = "bold 40pt Arial";
		canvasContext.fillText("서 명", x, y);

        canvasContext.font = "bold 18pt Arial";
        canvasContext.fillText(ctNos, x, (canvas.height - 10));
	 }

	 // Bind Mouse events
	 $(canvas).on('mousedown', function (e) {
		 if(e.which === 1) {
			 leftMButtonDown = true;
			 canvasContext.fillStyle = "#000";
			 var x = e.pageX - $(e.target).offset().left;
			 var y = e.pageY - $(e.target).offset().top;
			 canvasContext.moveTo(x, y);
		 }
		 e.preventDefault();
		 return false;
	 });

	 $(canvas).on('mouseup', function (e) {
		 if(leftMButtonDown && e.which === 1) {
			 leftMButtonDown = false;
			 isSign = true;
		 }
		 e.preventDefault();
		 return false;
	 });

	 // draw a line from the last point to this one
	 $(canvas).on('mousemove', function (e) {
		 if(leftMButtonDown == true) {
			 canvasContext.fillStyle = "#000";
			 var x = e.pageX - $(e.target).offset().left;
			 var y = e.pageY - $(e.target).offset().top;
			 canvasContext.lineTo(x,y);
			 canvasContext.stroke();
		 }
		 e.preventDefault();
		 return false;
	 });

	 //bind touch events
	 $(canvas).on('touchstart', function (e) {
		leftMButtonDown = true;
		canvasContext.fillStyle = "#000";
		var t = e.originalEvent.touches[0];
		var x = t.pageX - $(e.target).offset().left;
		var y = t.pageY - $(e.target).offset().top;
		canvasContext.moveTo(x, y);

		e.preventDefault();
		return false;
	 });

	 $(canvas).on('touchmove', function (e) {
		canvasContext.fillStyle = "#000";
		var t = e.originalEvent.touches[0];
		var x = t.pageX - $(e.target).offset().left;
		var y = t.pageY - $(e.target).offset().top;
		canvasContext.lineTo(x,y);
		canvasContext.stroke();

		e.preventDefault();
		return false;
	 });

	 $(canvas).on('touchend', function (e) {
		if(leftMButtonDown) {
			leftMButtonDown = false;
			isSign = true;
		}
	 });
}

/**
 * 서명초기화 (초기화 버튼 클릭시)
 */
 function init_Sign_CanvasSub() {

	isSign = false; // 서명(싸인패드)
	leftMButtonDown = false; // 서명(싸인패드)

	$('#signature').empty();
	$('#signResultMsg').empty();
    $('#signResultIMG').empty();
    $('.signData').val('');

	//Set Canvas width
	var sizedWindowWidth = $(window).width();
	if(sizedWindowWidth > 700)
		sizedWindowWidth = $(window).width() / 2;
	else if(sizedWindowWidth > 400)
		sizedWindowWidth = sizedWindowWidth - 100;
	else
		sizedWindowWidth = sizedWindowWidth - 50;

	 //$("#canvas").width(sizedWindowWidth);
	 $("#canvas").width(300);
	 $("#canvas").height(100);
	 $("#canvas").css("border","1px solid #333");

	 var canvas = $("#canvas").get(0);

	 canvasContext = canvas.getContext('2d');

	 if(canvasContext) {
		 //canvasContext.canvas.width  = sizedWindowWidth;
		 canvasContext.canvas.width  = 300;
		 canvasContext.canvas.height = 100;

		 canvasContext.fillStyle = "#fff";
		 canvasContext.fillRect(0, 0, sizedWindowWidth, 200);
		 //canvasContext.fillRect(0, 0, 0, 0);

		 canvasContext.moveTo(50, 150);
		 canvasContext.lineTo(sizedWindowWidth-50, 150);
		 canvasContext.stroke();

		var x = canvas.width / 2;
		var y = (canvas.height / 2) + 10; // 폰트 크기의 1/2 값을 더한다.

		canvasContext.textAlign = 'center';
		canvasContext.fillStyle = "#ececec";
		canvasContext.font = "bold 40pt Arial";
		canvasContext.fillText("서 명", x, y);

        canvasContext.font = "bold 18pt Arial";
        canvasContext.fillText(ctNos, x, (canvas.height - 10));
	 }

	 // Bind Mouse events
	 $(canvas).on('mousedown', function (e) {
		 if(e.which === 1) {
			 leftMButtonDown = true;
			 canvasContext.fillStyle = "#000";
			 var x = e.pageX - $(e.target).offset().left;
			 var y = e.pageY - $(e.target).offset().top;
			 canvasContext.moveTo(x, y);
		 }
		 e.preventDefault();
		 return false;
	 });

	 $(canvas).on('mouseup', function (e) {
		 if(leftMButtonDown && e.which === 1) {
			 leftMButtonDown = false;
			 isSign = true;
		 }
		 e.preventDefault();
		 return false;
	 });

	 // draw a line from the last point to this one
	 $(canvas).on('mousemove', function (e) {
		 if(leftMButtonDown == true) {
			 canvasContext.fillStyle = "#000";
			 var x = e.pageX - $(e.target).offset().left;
			 var y = e.pageY - $(e.target).offset().top;
			 canvasContext.lineTo(x,y);
			 canvasContext.stroke();
		 }
		 e.preventDefault();
		 return false;
	 });

	 //bind touch events
	 $(canvas).on('touchstart', function (e) {
		leftMButtonDown = true;
		canvasContext.fillStyle = "#000";
		var t = e.originalEvent.touches[0];
		var x = t.pageX - $(e.target).offset().left;
		var y = t.pageY - $(e.target).offset().top;
		canvasContext.moveTo(x, y);

		e.preventDefault();
		return false;
	 });

	 $(canvas).on('touchmove', function (e) {
		canvasContext.fillStyle = "#000";
		var t = e.originalEvent.touches[0];
		var x = t.pageX - $(e.target).offset().left;
		var y = t.pageY - $(e.target).offset().top;
		canvasContext.lineTo(x,y);
		canvasContext.stroke();

		e.preventDefault();
		return false;
	 });

	 $(canvas).on('touchend', function (e) {
		if(leftMButtonDown) {
			leftMButtonDown = false;
			isSign = true;
		}
	 });
}

/**
 * 휴대폰으로 계약서 서명할 수 있는 전용 URL 내보내기
 */
function exportToMobile(hp) {

	$('#popupExportMobile').css('display', 'block');

	var txt = '<div class="signContent">'
			+ '등록된 휴대폰 번호 "'+hp+'" 으로 계약서 서명을 위한 URL을 문자로 전송합니다.<br/>'
			+ '문자를 받은 시간으로 부터 10분간만 유효하며, 시간이 경과된 이후에는 재발송해야 합니다.<br/>'
			+ '휴대폰으로 서명을 진행하는 동안 현재 페이지에서 나가거나 닫지 마세요.<br/>'
			+ '<div class="singStage">'
			+ '1. 아래의 문자 전송 버튼을 클릭후 휴대폰 문자를 확인하세요.<br/>'
			+ '2. 문자 내용에 포함된 URL 주소로 접속하세요.<br/>'
			+ '3. 휴대폰에서 계약번호를 확인하고 서명을 완료후 저장 하세요.<br/>'
			+ '4. 다음 단계에서 "휴대폰 서명 가져오기"버튼을 클릭하세요.<br/>'
			+ '</div>'
			+ '<div class="ctNoTxt">계약번호 : '+ctNos+'</div>'
			+ '</div>'
			+ '<div class="signContentBtn">'
			+ '<button type="button" class="sendUrlbtn sendUrlSms">문자전송</button>'
			+ '<button type="button" class="sendUrlbtn sendUrlSmsClose">취소</button>'
			+ '</div>';

	$('.signContentWrap').html(txt);

}

/**
 * 휴대폰에서 서명한 파일 가져오기
 */
 function importSignData() {
	alert('휴대폰에서 서명합니다.');
}

/**
 * SMS 발송하기
 */
function sendSMS() {
	$.ajax({
		type :  'POST',
		url: './sms.php',
		data: {
			'mode': 'sms',
			'type': 'ctSign',
			'doc': pg,
			'id': id_no,
			'no': ctNo
		},
		dataType: 'json',
		async: false,
		cache: false,
		error : function(error) {
			//alert("Error!");
		},
		success : function(data) {
			if(data.code=='1001') {
				var msg = '['+data.code+'] '+data.msg;
				var txt = '<div class="signContent">'
							+ '휴대폰으로 문자가 발송되었습니다.<br/>'
							+ '문자 내용에 포함된 주소로 접속하여 서명을 진행하세요.<br/>'
							+ '서명이 완료후 반드시 저장을 해야 합니다.<br/>'
							+ '서명 저장후 아래의 "서명가져오기" 버튼을 클릭해 주세요.<br/>'
						+ '</div>'
						+ '<div class="signContentBtn">'
							+ '<button type="button" class="sendUrlbtn importSignData">서명 가져오기</button>'
						+ '</div>';
				$('.signContentWrap').html(txt);
				//alert(msg);
			}
			else {
				alert(data.msg);
			}
		},
		complete : function() {
			//alert("complete!");
		}
	});

}

/**
 * 이미지 가져오기
 */
 function get_signImage() {
    $.ajax({
		type :  'POST',
		url: './ajax.signImage.php',
		data: {
			'mode': 'signImage',
			'doc': pg,
			'id': id_no,
			'no': ctNo
		},
		dataType: 'json',
		async: false,
		cache: false,
		error : function(error) {
		},
		success : function(data) {

            if(data.code=="1001") {
                $('#div_signcontract').css('display', 'none');
                $('#signature').append($('<input type="hidden" name="signature" class="formSignature form-control input-sm">').attr('value', 'signMobile|'+data.fn));
                $('#signResultIMG').append('<img src="'+data.signImg+'" />').css('display', 'block');
                $('#popupExportMobile').css('display', 'none');
                $('.signContentWrap').empty();
            }
            else {
                alert(data.msg);
            }

        },
		complete : function() {
		}
	});
}