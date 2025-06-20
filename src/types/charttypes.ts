export type BookmarkLineChartProps = {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        fill?: boolean;
        borderColor?: string;
        tension?: number;
      }[];
    };
  };
  
  export type DepartmentBarChartProps = {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor?: string;
      }[];
    };
  };

  export type EmployeePieChartProps = {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
  };