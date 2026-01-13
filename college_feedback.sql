CREATE DATABASE college_feedback;
USE college_feedback;

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100),
    student_email VARCHAR(100),
    subject_name VARCHAR(100),
    semester VARCHAR(20),
    q3_understanding INT,
    q4_structured VARCHAR(20),
    q5_difficulty VARCHAR(20),
    q6_teaching INT,
    q7_realworld VARCHAR(20),
    q8_numerical VARCHAR(10),
    q9_lab VARCHAR(50),
    q10_balance VARCHAR(10),
    q11_materials VARCHAR(10),
    q12_advanced VARCHAR(20),
    q13_overall INT,
    q14_improvements VARCHAR(10),
    q15_comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);