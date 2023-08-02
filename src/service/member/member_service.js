const memberDAO = require("../../database/member/member_dao");

const loginCheck = async(body) => {
    // 해당하는 id에 맞는 정보가 있으면 사용자를 가져옴
    let member = await memberDAO.getMember(body.id);
    console.log("=== ser loginCheck ===");
    console.log( member );
    let msg = "", url = "", msgPack={};
    if( member.rows.length === 1){
        member = member.rows[0];
        if(member.PWD == body.pwd){
            msg = member.NAME+"님 환영합니다!!";
            url = "/";
            //msgPack = {result : 0}
            msgPack.result = 0;
        }else {
            msg = "비밀번호가 틀렸습니다!";
            url = "/member/login";
        } 
    }else { // 해당하는 id가 존재하지 않는 경우
        msg = "해당하는 id는 존재하지 않습니다";
        url = "/member/login";
    }
    msgPack.msg = getMessage(msg, url);
    // msgPack = {msg:"<sc ...</script>"} (key,value로 따로 만듬)
    return msgPack;
}

const getMessage = (msg, url)=>{
    return `<script>
                alert("${msg}");
                location.href="${url}";
            </script>`;
}

const memberList = () => {
    return memberDAO.memberList();
 
}

const insert = async (body) =>{
    const result = await memberDAO.insert(body);
    console.log("service insert =>", result);
    let msg="", url="";
    if(result == 0){
        msg="문제 발생";
        url = "/member/register_view";
    }else{
        msg = "등록 성공";
        url = "/member/list";
    }
    const msgPack = getMessage(msg, url);
    return msgPack;
}

const getMember =  ( id ) => {
    console.log("service =>", memberDAO.getMember02(id));
    return memberDAO.getMember02(id);
}

const modify = async (body) => {
    const result = await memberDAO.modify(body);
    let msg="", url="";
    if(result==0){
        msg="문제발생";
        url="/member/modify_form?id="+body.id;
    }else{
        msg="수정 되었습니다";
        url="/member/member_view/"+body.id;
    }
    return getMessage(msg, url);
}

const deleteMember = async (body) =>{
    const result = await memberDAO.deleteMember(body);
    if(result==0){
        msg="문제 발생";
        url="/member/member_view/"+body.id;
    }else{
        msg="삭제 되었습니다";
        url="/member/list/";
    }
    return getMessage(msg, url);
}

module.exports = { loginCheck, memberList ,insert , getMember ,modify, deleteMember};