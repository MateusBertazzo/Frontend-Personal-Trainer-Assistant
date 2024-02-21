import CardStudents from "./CardStudents";
import students from "../fakecards/fakeData";

function Students() {
    return (
        <div>
            <h1>Alunos</h1>
            <div>
                {
                    students.map((student, index) => {
                        return (
                                <CardStudents
                                    key={index}
                                    img={student.img}
                                    name={student.name}
                                />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Students;