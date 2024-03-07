import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const task = useTaskStore((state) => state.tasks);
  const pendingTasks = useTaskStore((state) => state.getTaskByStatus("open"));
  const inPorgressTasks = useTaskStore((state) =>
    state.getTaskByStatus("in-progress")
  );
  const doneTasks = useTaskStore((state) => state.getTaskByStatus("done"));

  //console.log({ pendingTasks, inPorgressTasks, doneTasks });

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" tasks={pendingTasks} value="open" />

        <JiraTasks
          title="Avanzando"
          tasks={inPorgressTasks}
          value="in-progress"
        />

        <JiraTasks title="Terminadas" tasks={doneTasks} value="done" />
      </div>
    </>
  );
};
