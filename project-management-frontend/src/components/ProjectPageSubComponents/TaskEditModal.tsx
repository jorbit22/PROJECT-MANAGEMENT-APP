import React from "react";
import { Modal } from "antd";
import TaskForm from "./TaskForm";
import { Task } from "../../pages/types";

/**
 * The TaskEditModal component displays a modal dialog for editing a task.
 * It contains a form that allows users to update task details.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {boolean} props.visible - Controls whether the modal is visible.
 * @param {function} props.onCancel - Callback function to close the modal without saving.
 * @param {function} props.onFinish - Callback function to handle form submission and update the task.
 * @param {Task} props.editingTask - The task being edited, passed as initial values to the form.
 * @param {Object} props.form - The form instance provided by Ant Design.
 */
const TaskEditModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: {
    name: string;
    description: string;
    status: string;
  }) => void;
  editingTask: Task | null;
  form: any;
}> = ({ visible, onCancel, onFinish, editingTask, form }) => {
  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {/* Render the TaskForm component inside the modal for editing the task */}
      <TaskForm
        onFinish={onFinish}
        initialValues={editingTask ?? undefined}
        form={form}
      />
    </Modal>
  );
};

export default TaskEditModal;
