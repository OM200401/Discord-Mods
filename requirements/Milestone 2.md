**Milestone 2: Project Description and Requirements**

**Project Description:**

Our project is an E-Learning platform designed to facilitate seamless interaction between teachers, students, and administrators. It offers a comprehensive suite of features to support course creation, management, and engagement. The platform aims to enhance the learning experience by providing intuitive tools for content delivery, assignment submission, grading, communication, and collaboration.

**High-level description:**

We are creating an E-learning platform that will enable students to enroll in and keep track of the courses they are taking. Courses, each taught by one teacher, are created by admins of the platform. Admins will have to accept a student enrolling in a course. Students will have their own interface where they will be able to seamlessly search for, add, or drop courses. For each of their courses, they should be able to submit assignments and view grades for those assignments. Teachers will also have an instructor interface where they can create assignments (either in the form of a quiz or an essay). They should be able to grade assignments for students taking their classes.

Admins, teachers, and students are all users. Users should be able to sign up for the platform by providing an email, password and information about themselves such as first and last name, gender, date of birth, etc. All of this information is securely stored in a database, and when a user attempts to login, we check the information against a database for authentication. Users should be able to reset their passwords if they forget it, and also update other information about themselves at a later date if they choose to.

**User Requirements:**

- Teachers
  - Create assignments with criteria, total marks, and percentage grade.
  - Grade student assignments and notify them of their grades.
- Students
  - View pending assignments and quizzes on a to-do list.
  - Reset password if forgotten.
  - Submit assignments by uploading files or entering text.
- Admin
- Create courses for the e-learning platform
- Accept students for courses

**Functional Requirements**

1. **Course Creation**

a. Admin can create courses and include features like quizzes, modules, assignments.

2. **User Management**

a. Admin can delegate moderating capabilities to teachers and students.

3. **Assignment Management**
1. Teachers can create assignments with criteria, marks, deadlines and grade submissions.
1. Students can view pending assignments and submit work.
1. Students can view feedback and grades for their assignments
4. **Grading System**
1. Teachers can grade assignments and notify students of their grades.
1. Teachers can access and modify grades.

**Non-Functional Requirements**

1. **Usability**: The platform should be intuitive and easy to navigate for both teachers and students.
1. **Performance**: The system should be responsive and able to handle multiple users concurrently without significant delays.
1. **Security**: User data should be securely stored and transmitted, with password reset functionality ensuring account access is protected.
1. **Reliability**: The platform should be available and functional at all times, with minimal downtime for maintenance or updates.

**Tech Stack:**

- Front-End: ReactJS, NextJS, TailwindCSS
- Back-End: Firebase

**Use Case Diagram:**

![](USE%20CASE%20DIAGRAM.png)

**Use Case Descriptions:**

- *USERS* of all types can login/signup and update their own user details
- *ADMIN* can create courses and accepts students to the course
- *TEACHERS* can create different assignments (quizzes and essays) and grade them
- *STUDENTS* can enroll in the course, submit assignments and view their own grades

**User Stories Teacher user stories:**

- As a teacher, I want to be able to create assignments for my students with a criteria section, the total amount of marks the assignment is out of, and the percentage grade the assignment is worth. Once a grade is assigned, the student's total concurrent mark should be updated.
  - Acceptance Criteria: Teachers only will be given a button that reads “Create assignment”, a pop up menu will open in which the teacher and title the assignment, include a jpeg or png of a criteria table, or write a text entry criteria, set the marks the assignment is out of, and finally set the percentage grade that the assignment is worth. The teacher will also be provided the ability to set the deadline by selecting a date from a calendar pop up. Once the teacher is satisfied, they can press “Done” and the assignment will automatically be rendered to the students in the classroom.
- As a teacher, I want to be able to grade my students assignments and afterwards have them be able to see the grade they received
  - Acceptance criteria: Once a teacher receives a submission, they should be able to view the submission by clicking the file they submitted, or simply just viewing the text entry submission. The teacher will then have the option to click on the submission, which will open an option called “Grade”, the teacher can then input the grade they believe the student should receive, and click “upload grade”. Once they click “upload grade”, the student will receive a notification that they received a grade.

**Student**

- As a student, I want to be able to view my pending assignment and quizzes on a to-do list.
  - Acceptance criteria: Once a student clicks the To-do list, they should be viewing a list of pending assignments/quizzes and once the student clicks on any one of these the student should be redirected to the pending assignments/quizzes.
- As a student, I should be able to reset my password if I forget my previous password so that I can regain access to my account.

\-

- Acceptance Criteria: Once a student clicks forget password he/she should be redirected to a page which requests a code sent to the email address provided by the student during registration. Once the code input is verified, a link to reset password is sent to the student via his email.
- As a student, after starting an assignment I should be able to submit an assignment by uploading a file or submitting a text entry box.
  - Acceptance Criteria: Once a student clicks the start assignment button, they should get an option to upload a file or use a text entry box to input their work. Once they have done either, they can click submit to submit their work.

**Administrator:**

- As an admin, I want to be able to create courses in order to control the courses offered via the e-learning platform.
  - Acceptance Criteria: Once an admin wants to add or remove a course, they should be able to click an “add course” button, which will allow them to add a course with course description, course code and information, and teacher information.
- As an admin, I should be able to accept or reject any students applying to enroll or drop a course.
  - Acceptance Criteria: Once a student attempts to enroll or drop a course, an admin should process the request first and see whether they are eligible to enroll for/drop a course.
- As an admin, I want to be able to give moderating roles to the elected teachers for each course.
  - Acceptance Criteria: Once the admin creates a course, they can select the teacher for each course from their database. This will be based on the teacher’s fields of expertise and schedule.

