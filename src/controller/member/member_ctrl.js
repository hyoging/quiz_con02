const ser = require("../../service/member/member_service");

const login = (req,res) =>{
    res.render("member/login", {username : req.session.username});
}

const loginCheck =  async (req,res) =>{
    console.log("=== ctrl loginCheck ===");
    console.log(req.body);
    const msgPack = await ser.loginCheck(req.body);
    
    console.log("msgPack : " , msgPack); 
    console.log("msgPack.result : " , msgPack.result);
    if(msgPack.result === 0){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);

}

const logout = (req,res) =>{
    req.session.destroy();
    res.clearCookie("isLogin");
    res.redirect("/");
}

const list = async (req,res) =>{
    
    const mList = await ser.memberList();

    res.render("member/list",
            {username : req.session.username, list:mList});
}

const RegisterViewForm = (req,res)=>{
    res.render("member/register_view" , {username : req.session.username});
}
const RegisterView = async (req, res)=> {
    console.log("RegisterView: ", req.body );
    let msg = await ser.insert( req.body );
    res.send(msg);
}

const memberView = async (req,res) =>{
    console.log("memberView ctrl: ", req.params);
    const member = await ser.getMember(req.params);
    console.log("controller memberview: ", member);
    res.render("member/member_view",{member, username : req.session.username});
}

const modifyForm = async(req,res) => {
    console.log("ctrl modify: ", req.query);
    console.log("ctrl modify: ", req.params);

    const member = await ser.getMember(req.query);
    console.log("ctrl modify: ", member);

    res.render("member/modify_form",{member , username : req.session.username});
}

const modify = async (req,res) =>{
    console.log("ctrl modify: ", req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
}

const deleteMember = async (req,res) =>{
    const msg = await ser.deleteMember(req.params);
    res.send(msg);
}


module.exports = {login , loginCheck, logout, list , RegisterViewForm , RegisterView , 
                    memberView, modifyForm , modify, deleteMember};