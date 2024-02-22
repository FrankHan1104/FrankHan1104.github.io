<?php
include_once('./_common.php');

$navigaterArr[] = "SUU";
$navigaterArr[] = "서명하기";

include_once(G5_PATH.'/_head.php');

// 계약서 번호
$ctNo = date("Ymd")."-".rand(11111111,99999999);
$member['mb_hp'] = "010-1234-0000";


add_stylesheet('<link rel="stylesheet" href="sign.css">', 0);
add_javascript('
<script>
var ctNos = "'.$ctNo.'";
var signBtnRst = true; // SMS 전송버튼 중복 클릭 방지용
</script>
', 0);
add_javascript('<script src="sign.js"></script>', 0);
?>
<div id="signContainer">
    <div id="signature"></div>
    <div id="signResultMsg"></div>

    <div id="signWrap">
        <canvas id="canvas">Canvas is not supported</canvas>
        <ul class="signBtns">
            <li type="button" class="signBtn" id="btnSubmitSign" onclick="fun_submit();">서명확인</li>
            <li type="button" class="signBtn" id="btnClearSign" onclick="init_Sign_Canvas();">다시쓰기</li>
            <li type="button" class="signBtn" id="btnExportToMobile" onclick="exportToMobile('<?php echo $member['mb_hp'];?>');">휴대폰에서 서명</li>
        </div>
    </div>
	<div class="signResult">
		서명된 이미지 데이터
		<textarea name="signData" class="signData"></textarea>
		서명된 이미지
		<div id="signResultIMG"></div>
	</div>

</div>

<?php
include_once(G5_PATH.'/_tail.php');
