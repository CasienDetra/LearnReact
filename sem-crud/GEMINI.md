# 📚 Student Management CRUD App (React JSX)

## 📌 Project Overview

Build a **Student Management CRUD Application** using **React (JSX)** that allows users to **Create, Read, Update, and Delete (CRUD)** student records.

The application must:

- Use **Chakra UI** (❌ no Tailwind)
- Use **pure CSS** for layout and custom theming
- Use **Zustand** for global state management
- Support **Dark & Light theme switching**
- Restrict dropdown inputs to **predefined datasets only**

---

## 🚀 Project Initialization

🛠 Tech Stack

    Frontend: React (JSX)

    UI Components: Chakra UI

    Styling: Pure CSS (custom dark & light themes)

    State Management: Zustand

    Persistence: localStorage

🎯 Features

    Add new student records

    View students in a table

    Edit student information

    Delete student records

    Toggle between Dark Mode / Light Mode

    Persist theme & data using Zustand + localStorage

    Responsive and accessible UI

🧾 Student Data Model
| Field Name | Type | Input Type |
| ------------ | ------ | -------------------------------- |
| `student_id` | String | Text |
| `stu_name` | String | Text |
| `BOD` | Date | Date Picker |
| `Department` | String | Dropdown |
| `Major` | String | Dropdown (depends on Department) |
| `Contact` | String | Phone |
| `Province` | String | Dropdown |
🔒 Dropdown Data Constraints

Only the following predefined values are allowed.
Departments

const departments = ["SocialHumanities", "IFL", "Engineering", "Science","Education"];

Majors (Dependent Dropdown)

const majors = {
Engineering: [
"Information Technology Engineering",
"Telecommunication and Electronic Engineering",
"Bio Engineering",
"Automation & Supply Chain Systems Engineering",
"Environmental Engineering",
],
SocialHumanities: [
"History",
"Khmer Literature",
"Media and Communication",
"IBM",
"Philosophy",
"Psychology",
"Tourism",
],
IFL: ["Chinese", "English", "Japanese", "France", "Korean"],
Science: [
"Physics",
"Computer Science",
"Chemistry",
"Biology",
"Mathematics",
],
Education: [
"Educational Studies",
"Higher Education Development and Management",
"Lifelong Learning",
"Center for Educational Research and Training",
],
};

Provinces / Cities

const provinces = [
"Phnom Penh",
"Banteay Meanchey",
"Battambang",
"Kampong Cham",
"Kampong Chhnang",
"Kampong Speu",
"Kampong Thom",
"Kampot",
"Kandal",
"Kep",
"Koh Kong",
"Kratie",
"Mondulkiri",
"Oddar Meanchey",
"Pailin",
"Preah Sihanouk",
"Preah Vihear",
"Pursat",
"Ratanakiri",
"Siem Reap",
"Stung Treng",
"Svay Rieng",
"Takeo",
"Tboung Khmum",
];

⚠️ Manual text input for Department, Major, and Province is not allowed.
🧠 Zustand Store Requirements
Student Store

    State: students[]

    Actions:

        addStudent

        updateStudent

        deleteStudent

    Sync with localStorage

Theme Store

    State: theme ("light" | "dark")

    Action: toggleTheme

    Persist theme preference using localStorage

🎨 Theme Switching Requirements

    Theme toggle button in the header

    Apply theme via root class:

        .theme-dark

        .theme-light

    Use CSS variables for custom colors

    Smooth transitions between themes

🌗 Theme Example (Pure CSS)

:root {
--bg-color: #ffffff;
--text-color: #1a1a1a;
--card-bg: #f9f9f9;
}

.theme-dark {
--bg-color: #0f172a;
--text-color: #e5e7eb;
--card-bg: #1e293b;
}

.theme-light {
--bg-color: #ffffff;
--text-color: #1a1a1a;
--card-bg: #f9f9f9;
}

📊 Example Student Data

{
"student_id": "B-001",
"stu_name": "Makara",
"BOD": "2004-05-24",
"Department": "Science",
"Major": "Computer Science",
"Contact": "0192083",
"Province": "Phnom Penh"
}

📂 Suggested Folder Structure

src/
├── components/
│ ├── StudentForm.jsx
│ ├── StudentTable.jsx
│ ├── ThemeToggle.jsx
│ └── StudentDialog.jsx
├── stores/
│ ├── useStudentStore.js
│ └── useThemeStore.js
├── constants/
│ └── studentOptions.js
├── styles/
│ └── theme.css
├── App.jsx
└── main.jsx

✅ Acceptance Criteria

    Zustand manages all global state

    CRUD operations function correctly

    Dependent dropdown logic works

    Theme persists after refresh

    No Tailwind or utility CSS used

🚀 Goal

Create a maintainable Student Management System that demonstrates:

    Zustand state management

    Controlled forms

    Dependent dropdowns

    Pure CSS theming

    Chakra UI integration
