import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllCourse } from "./api/client";
import "./App.css";
import background from "./assets/background.png";
import { Course } from "./components/Course";

function App() {
    const [course, setCourse] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const resp = await GetAllCourse();
            if (resp) setCourse(resp);
        })();
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sign Fxxker - created by xylonx
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    background: `url("${background}")`,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ToastContainer
                    position="top-right"
                    autoClose={1650}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    limit={4}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Box
                    sx={{ display: "flex", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}
                    alignItems="center"
                >
                    {course.map((v, idx) => (
                        <Course key={idx} courseName={v}></Course>
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default App;
