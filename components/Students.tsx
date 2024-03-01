import CardStudents from "./CardStudents";
import fakeStudents from "../app/fakecards/fakeData";
import { useStudents } from "../providers/StudentsProvider";

export default function Students() {
    const data = useStudents();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Alunos</h1>
            <div className="flex flex-wrap gap-4 rounded-md shadow-md">
                {
                    data?.students.map((student, index) => {
                        return (
                                <CardStudents
                                    key={index}
                                    img={fakeStudents[0].img}
                                    name={student.username}
                                />
                        );
                    })
                }
            </div>
        </div>
    );
}