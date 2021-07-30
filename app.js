const http = require("http");
const fs = require("fs");

// create students start
const createStudent = (req, res) => {
  const sStudents = fs.readFileSync("./data/students.json", {encoding: "utf-8",});
  const students = JSON.parse(sStudents);
  newId = [];
  for (key in students) {
    newId.push(students[key]["id"]);
  }
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  console.log(body);
  req.on("end", () => {
    const newStudent = JSON.parse(body);

    objId = {
      id: newId.length + 1,
    };

    for (key in newStudent) {
      Object.assign(newStudent[key], objId);
    }

    Object.assign(students, newStudent);

    data = JSON.stringify(students);

    fs.writeFileSync("./data/students.json", data);

    res.end(
      JSON.stringify({
        msg: "saved",
      })
      );
  });
};
// create students end



// create Mentors start
const createMentors = (req, res) => {
  const sMentors = fs.readFileSync("./data/mentors.json", {encoding: "utf-8",});
  const mentors = JSON.parse(sMentors);
  newId = [];
  for (key in mentors) {
    newId.push(mentors[key]["id"]);
  }
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  console.log(body);
  req.on("end", () => {
    const newMentor = JSON.parse(body);

    objId = {
      id: newId.length + 1,
    };

    for (key in newMentor) {
      Object.assign(newMentor[key], objId);
    }

    Object.assign(mentors, newMentor);

    data = JSON.stringify(mentors);

    fs.writeFileSync("./data/mentors.json", data);

    res.end(
      JSON.stringify({
        msg: "saved",
      })
      );
  });
};
// create students end


//start of get students 
const getStudents = (req, res) => {
  const sStudents = fs.readFileSync("./data/students.json", {encoding: "utf-8",});
  const students = JSON.parse(sStudents);
  const rMethod = req.method.toLowerCase();
  if (rMethod == "get") {
    res.end(sStudents);
  }else if (rMethod == "post") {
    return createStudent(req, res);
  }else  if (rMethod == "deleti") {
    return deleteStudent(req, res);
  }
};
//end of get students 

//start of get mentor 
const getMentors = (req, res) => {
  const sMentors = fs.readFileSync("./data/mentors.json", {encoding: "utf-8",});
  const mentors = JSON.parse(sMentors);
  const rMethod = req.method.toLowerCase();
  if (rMethod == "get") {
    res.end(sMentors);
  }else if (rMethod == "post") {
    return createMentors(req, res);
  }else  if (rMethod == "deleti") {
    return getStudents(req, res);
  }
};
//end of get mentor 

//start of get students Name
const getStudentByName = (req, res) => {
  const sStudents = fs.readFileSync("./data/students.json", {
    encoding: "utf-8",
  });
  let students = JSON.parse(sStudents);

  const splitedPaht = req.url.split("/");  
  const reqMethod = req.method.toLowerCase();

  if(splitedPaht.length > 1 && reqMethod =='delete' ){
    let removeId = 0;
    // let studentsArr = Object.entries(students);
    for (variable in students) {
      if(variable ==splitedPaht[2]){
       delete students[variable];
     }

   }
   let st =  JSON.stringify(students);
   fs.writeFile('./data/students.json', st, (err)=>{
    if(err) console.log(err);

    console.log('Students.json write fil')
  });

 }else{
  const targetStudent = students[req.params.name];
  if(!targetStudent){
    res.end(JSON.stringify({
      msg: 'Student not found!'
    }))
  }
  targetStudent.name = req.params.name;
  res.end(JSON.stringify(targetStudent))
}
}
//end of get Students Name

//start of get mentors Name
const getMentorsByName = (req, res) => {
  const sMentors = fs.readFileSync("./data/mentors.json", {encoding: "utf-8",});
  const mentors = JSON.parse(sMentors);
  const splitedPaht = req.url.split("/");  
  const reqMethod = req.method.toLowerCase();

  if(splitedPaht.length > 1 && reqMethod =='delete' ){
    let removeId = 0;
    // let studentsArr = Object.entries(students);
    for (variable in mentors) {
      if(variable ==splitedPaht[2]){
       delete mentors[variable];
     }

   }
   let mt =  JSON.stringify(mentors);
   fs.writeFile('./data/mentors.json', mt, (err)=>{
    if(err) console.log(err);

    console.log('Students.json write fil')
  });

 }else{
  const targetMentors = mentors[req.params.name];
  if(!targetMentors){
    res.end(JSON.stringify({
      msg: 'Mentors not found!'
    }))
  }
  targetMentors.name = req.params.name;
  res.end(JSON.stringify(targetMentors))
}
}

//end of gey Name


const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");  
  const splitedPaht = req.url.split("/");  
  if (splitedPaht[1] == "students") {
    if(splitedPaht.length == 2){
      return getStudents(req, res)
    }
    if(splitedPaht.length == 3){
      req.params = {
        name: splitedPaht[2]
      };
      return getStudentByName(req, res);
    }
  }else if(splitedPaht[1] == "mentors"){
    if(splitedPaht.length == 2){
      return getMentors(req, res);
    }
    if(splitedPaht.length == 3){
      req.params = {
        name: splitedPaht[2]
      };
      return getMentorsByName(req, res);
    }
  }
  
  res.end(
    JSON.stringify({
      msg: "Not Found",
    })
    );
});

server.listen(8000, (err) => {
  if(err) console.log('err');
  console.log("server started on 8000 port !");


});