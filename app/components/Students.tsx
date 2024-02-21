import CardStudents from "./CardStudents";
import students from "../fakecards/fakeData";

function Students() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Alunos</h1>
            <div className="flex flex-wrap gap-4">
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