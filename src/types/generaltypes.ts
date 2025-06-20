

export type EmpProps = {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string;
  bookmark: boolean;
};
export type EmpCardInfo  = {
  name: string;
  bio: string;
  address: string;
  phone: string;
  avgRating: number;
  avatar: string;
};

export type FilterSectionProps = {
  departments: string[];
  onSearch: (query: string) => void;
  onFilterChange: (selected: string[]) => void;
};

export type Performance = {
  year: number;
  rating: number;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string;
  bookmark: boolean;
  address: string;
  phone: string;
  bio: string;
  performance: Performance[];
  projects: string[];
  feedback: string[];
};