import {  useNavigate } from "react-router-dom";

const students = [
  { name: "Adam Maharjan", 
    email: "adam@gmail.com",
    rollno: 500, 
    sId: 1 
  },
  { name: "Adina Karmacharya", 
    email: "adina@gmail.com", 
    rollno: 501, 
    sId: 2 
  },
  { name: "Krisa Darnal", 
    email: "krisa@gmail.com", 
    rollno: 502, 
    sId: 3 
  }
];


const Student = () => {
    const navigate = useNavigate();

  return (
    <div>
      <h2>Student List</h2>
      {students.map((student) => (
    // <Link to={`/students/${student.sId}`} style={{textDecoration:"none", color:"inherit"}}>  

      <div style={{backgroundColor: "gray"}} onClick={() => navigate (`/students/${student.sId}`)}>
            <p>Name: {student.name}</p>
             <p>Email: {student.email}</p>
              <p>RollNo: {student.rollno}</p>
             
        </div>
        // </Link>
      ))}
    </div>
  );
}

export default Student
