import React from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { Dayjs } from "dayjs";

// Descriptive comments for each prop
interface ProjectFiltersProps {
  filters: {
    name: string;
    dueDateRange: [Dayjs, Dayjs] | [];
    minTasks: number | null;
    taskStatus: string;
  };
  handleFilterChange: (changedFields: any) => void;
  applyFilters: () => void;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  handleFilterChange,
  applyFilters,
}) => {
  return (
    <Form
      layout="inline"
      style={{ marginBottom: "24px", justifyContent: "center" }}
    >
      {/* Filter by project name */}
      <Form.Item label="Project Name">
        <Input
          placeholder="Enter project name"
          value={filters.name}
          onChange={(e) => handleFilterChange({ name: e.target.value })}
        />
      </Form.Item>

      {/* Filter by due date range */}
      <Form.Item label="Due Date">
        <RangePicker
          value={filters.dueDateRange.length ? filters.dueDateRange : null}
          onChange={(dates) =>
            handleFilterChange({ dueDateRange: dates as [Dayjs, Dayjs] | [] })
          }
        />
      </Form.Item>

      {/* Filter by minimum number of tasks */}
      <Form.Item label="Min Tasks">
        <Input
          type="number"
          placeholder="Enter minimum tasks"
          value={filters.minTasks ?? ""}
          onChange={(e) =>
            handleFilterChange({
              minTasks: e.target.value ? parseInt(e.target.value, 10) : null,
            })
          }
        />
      </Form.Item>

      {/* Filter by task status */}
      <Form.Item label="Task Status">
        <Select
          placeholder="Select task status"
          value={filters.taskStatus}
          onChange={(value) => handleFilterChange({ taskStatus: value })}
        >
          <Option value="">Any</Option>
          <Option value="completed">Completed</Option>
          <Option value="inprogress">In Progress</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </Form.Item>

      {/* Apply filters button */}
      <Form.Item>
        <Button type="primary" onClick={applyFilters}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectFilters;
