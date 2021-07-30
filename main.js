const http = require("http");
const fs = require("fs");

// get student start
const getstudents = (req, res) => {
  const sStudents = fs.readFileSync("./data/students.json", {
    encoding: "utf-8",
  });
  const students = JSON.parse(sStudents);

  const sMentors = fs.readFileSync("./data/mentors.json", {
    encoding: "utf-8",
  });
  const mentors = JSON.parse(sMentors);

  let dataStudent = {},
  card = [];

  for (property in students) {
    let mentorId = [];
    for (key in mentors) {
      if (students[property]["group"] === mentors[key]["group"]) {
        mentorId.push(key);
      }
    }
    dataStudent = {
      name: property,
      id: students[property]["id"],
      group: students[property]["group"],
      mentor: mentorId,
    };
    card.push(dataStudent);
  }
  sendData = JSON.stringify(card);
  res.end(sendData);
};

// get student end
/**************************************************************** */
// get student by name
const getStudentByName = (req, res) => {
  const sStudents = fs.readFileSync("./data/students.json", {
    encoding: "utf-8",
  });
  const students = JSON.parse(sStudents);
  const targetStudent = students[req.params.name];

  if (!targetStudent) {
    res.end(
      JSON.stringify({
        msg: "Student not found",
      })
      );
  }
  targetStudent.name = req.params.name;
  res.end(JSON.stringify(targetStudent));
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const splitedPath = req.url.split("/");
  const rMethod = req.method.toLowerCase();

  if (splitedPath[1] === "students") {
    if (splitedPath.length === 2) {
      // console.log(req.params);
      if (rMethod == "get") {
        return getstudents(req, res);
      }
      if (rMethod == "post") {
        console.log(req);
      }
    }
    if (splitedPath.length === 3) {
      req.params = {
        name: splitedPath[2],
      };
      return getStudentByName(req, res);
    }
  }
  res.end(
    JSON.stringify({
      msg: "hello",
    })
    );
});

server.listen(8000, () => {
  console.log("server 8000 portida ishga tushdi!");
})