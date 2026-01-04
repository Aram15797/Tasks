export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
};

export type UserDataMap = {
  alexJohnson: UserFormData;
  sarahConnor: UserFormData;
  sarahConnorUpdated: UserFormData;
  markTemporary: UserFormData;
  johnDoe: UserFormData;
  janeSmith: UserFormData;
  webTablesDefault: UserFormData;
};

export const userData: UserDataMap = {
  alexJohnson: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    age: "28",
    salary: "75000",
    department: "Engineering",
  },
  sarahConnor: {
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah.connor@example.com",
    age: "35",
    salary: "65000",
    department: "Security",
  },
  sarahConnorUpdated: {
    firstName: "Sarah Updated",
    lastName: "Connor",
    email: "sarah.connor@example.com",
    age: "36",
    salary: "65000",
    department: "IT Security",
  },
  markTemporary: {
    firstName: "Mark",
    lastName: "Temporary",
    email: "mark.temp@example.com",
    age: "25",
    salary: "45000",
    department: "Temporary",
  },
  johnDoe: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    age: "30",
    salary: "50000",
    department: "QA",
  },
  janeSmith: {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@test.com",
    age: "28",
    salary: "55000",
    department: "Dev",
  },
  webTablesDefault: {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    age: "30",
    salary: "5000",
    department: "QA",
  },
};
