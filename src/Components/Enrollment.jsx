import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    createTheme,
    ThemeProvider,
    Button,
} from '@mui/material';
import axios from 'axios';
import Nav from './NavBar'
const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [enrollmentData, setEnrollmentData] = useState({
        courseId: '',
        dateOfJoining: '',
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios
            .get('https://localhost:7003/api/Course')
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    };

    const handleEnroll = (course) => {
        // Check if the enrollment limit for the course has been reached
        // if (course.enrollmentCount >= 25) {
        //   alert('Enrollment limit for this course has been reached.');
        //   return;
        // }

        const userName = localStorage.getItem('username');
        console.log(userName)
        const courseId = course.courseId;
        const dateOfJoining = enrollmentData.dateOfJoining;

        const newEnrollment = {
            userName,
            courseId,
            enrollmentCount: 1, // Enrollment count is 1
            dateOfJoining,
        };
        console.log(newEnrollment)
        axios
            .post('https://localhost:7003/api/EnrollmentProcesses', newEnrollment)
            .then(() => {
                alert('Enrollment successful!');
                console.log(newEnrollment)
            })
            .catch((error) => {
                console.error('Error enrolling in the course:', error);
            });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2196F3', // Customize the primary color
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Nav/>
            <div>
                <h1>Course List</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>No Of Semesters</TableCell>
                                <TableCell>Course Description</TableCell>
                                <TableCell>Enroll</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.courseId}>
                                    <TableCell>{course.courseName}</TableCell>
                                    <TableCell>{course.durationOfCourse}</TableCell>
                                    <TableCell>{course.amountForCourse}</TableCell>
                                    <TableCell>{course.noOfSemester}</TableCell>
                                    <TableCell>{course.courseDescription}</TableCell>
                                    <TableCell>
                                        <div>
                                            <TextField
                                                type="datetime-local"
                                                value={enrollmentData.dateOfJoining}
                                                onChange={(e) =>
                                                    setEnrollmentData({ ...enrollmentData, dateOfJoining: e.target.value })
                                                }
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEnroll(course)}
                                            >
                                                Enroll
                                            </Button>
                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </ThemeProvider>
    );
};

export default CourseList;
