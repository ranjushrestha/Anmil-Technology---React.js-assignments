import { useNavigate, useParams } from "react-router-dom";

const students = [
  { name: "Adam Shtrestha", email: "adam@gmail.com", rollno: 500, sId: 1 },
  { name: "Adina Shtrestha", email: "adina@gmail.com", rollno: 501, sId: 2 },
  { name: "Krisa Shtrestha", email: "krisa@gmail.com", rollno: 502, sId: 3 }
];

const StudentDetailsPage = () => {
  const { studentId } = useParams();
  console.log("Student ID:", studentId);

  const student = students.find(student => student.sId === Number(studentId));
  console.log("Student:", student); 

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/students");
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
     <div>This is students details page</div>
     <div>
        <p>Name:{student?.name}</p>
         <p>Email:{student?.email}</p>
          <p>Roll:{student?.rollno}</p>
     </div>
    </div>
  );
};

export default StudentDetailsPage;
