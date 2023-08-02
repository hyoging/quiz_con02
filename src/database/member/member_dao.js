const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
/*
설정하지 않으면 2차원 배열로 들어오기 때문에 KEY, VALUE를 사용 할 수 없다[[값],[값],[값]]
설정하는 1차원 배열에 [ {}, {} ...] 형식으로 들어온다
즉, KEY, VALUE를 사용해 정보를 가져올 수 있다.
*/
oracledb.outFormat = oracledb.OBJECT;

const getMember = async (id) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from members02 where id='${id}'`;
    let member;
    try {
        member = await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return member;
}

const memberList = async () => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = "select * from members02";
    return (await con.execute(sql)).rows;
}

const insert = async(body) =>{
    let con = await oracledb.getConnection(dbConfig);
    const sql = `insert into members02(id, pwd, addr, name)
                values(:id, :pwd, :addr, :name)`;
    let result = 0;
    try{
        result = await con.execute(sql, body);
        console.log("dao insert: ", result);
    }catch(err){
        console.log(err);
    }
    return result;
}

const getMember02 = async (id) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from members02 where id=:id`;
    let member;
    try {
        member = await con.execute(sql, id);
    }catch(err){
        console.log(err);
    }
    return member.rows[0];
}

const modify = async(body) => {
    const sql = `update members02 set pwd='${body.pwd}',
                name='${body.name}', addr='${body.addr}'
                where id ='${body.id}'`;
    let con = await oracledb.getConnection(dbConfig);
    let result =0;
    try{
        result = await con.execute(sql);
    }catch(err){
        console.log(err)
    }
    return result;
}

const deleteMember = async (body) => {
    const sql = "delete from members02 where id=:id";

    let con = await oracledb.getConnection(dbConfig);
    let result =0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}

module.exports = {getMember , memberList , insert , getMember02  ,modify, deleteMember};