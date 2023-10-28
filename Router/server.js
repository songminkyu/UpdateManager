const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8015;
const fs = require('fs');
const data = fs.readFileSync(__dirname + '\\database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const http = require('http');
const { Console } = require('console');
const multer = require('multer');
const upload = multer({dest:'../upload'});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connect = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connect.connect();

app.get('/api/updateinfo',async (req,res) =>{
  await connect.query(
    "SELECT * FROM management.updateinfo WHERE isDeleted = 0",
    (err,rows,fields) =>{      
      res.send(rows);          
    }
  );
});
app.use('/image',express.static('../upload'));
app.post('/api/updateinfo',upload.single('image'),(req,res)=>{  
  let sql = 'INSERT INTO management.updateinfo values(null,? ,?, ?, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name  = req.body.name;
  let gender  = req.body.gender;
  let employeenumber  = req.body.employeenumber;
  let department  = req.body.department;
  let ip  = req.body.ip;
  let mac  = req.body.mac;
  let wpmversion  = req.body.wpmversion;
  let params = [image,gender,employeenumber,name,department,ip,mac,wpmversion];
  connect.query(sql,params,(err,rows,fields) =>{   
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

app.delete('/api/updateinfo/:id',(req,res) =>{
  let sql = 'UPDATE management.updateinfo SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connect.query(sql,params,
    (err,rows,fields) =>{
      res.send(rows);
    });  
})

app.listen(port, () => console.log(`Listening on port ${port}`));

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  })  
  req.on('end', () => {
  var params = new URLSearchParams(data);
  var Msg = Object.fromEntries(params.entries());
 
  connect.query("SELECT name FROM management.updateinfo WHERE name = '"+ Msg['UserName'] +"'", async function(err, result, field)
  {
      try
      {
          if(err)
          {
              await connect.rollback();
          }
          else      
          {
             await connect.beginTransaction();
             
             if(result.length === 0)
             {                  
                query = "INSERT INTO management.updateinfo(image, gender, employeenumber, name, department, ip, mac, wpmversion, createdDate, isDeleted)";
                query += `VALUES('${Msg['Image']}','${Msg['Gender']}','${Msg['Employeenumber']}','${Msg['UserName']}',
                                 '${Msg['Department']}', '${Msg['IP']}', '${Msg['Mac']}', '${Msg['CurrentVersion']}', now(),0);`;
                await connect.query(query);    
             }
             else
             {
                query = "UPDATE management.updateinfo SET wpmversion='"+ Msg['CurrentVersion'] +"'" + " WHERE"+ " name='"+ Msg['UserName'] +"'";   
                await connect.query(query);    
             }

             await connect.commit();

          }            
      }
      catch(ex)
      {
          console.log(ex);
          await connect.rollback();
      }              
  });    
  res.end();
  })
}).listen(8013);