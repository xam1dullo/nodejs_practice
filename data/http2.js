const http = require("http");
const fs = require("fs");


const getStudents=(req,res)=>{
  const strStudents = fs.readFileSync('./data/students.json',{
    encoding:'utf-8',
  });
  const students =JSON.parse(strStudents);
  res.end(students);
  console.log(students);
}
const getMentors=(req,res)=>{
  const strMentors = fs.readFileSync('./data/mentors.json',{
    encoding:'utf-8',
  });
  const mentors =JSON.parse(strMentors)
  res.end(mentors)
  console.log(mentors);
}

const server = http.createServer((req,res)=>{
   res.setHeader('Content-Type','application/json',{
    encoding:'utf-8',
  });
  

  res.end(JSON.stringify({
    name:'user', 
    age:21,
    isMarrid: false
  }));

  const splitePath = req.url.split('/');

  if(splitePath[1].toLowerCase() == 'students'){
   return getStudents(req,res);
  } 
  else
   if(splitePath[1].toLowerCase() == 'mentors'){
   return getMentors(req,res);
  }
})

server.listen(8000,()=>{
  console.log('server started on 8000! ');
})
