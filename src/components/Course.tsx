import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { UpdateCourseEnc } from "../api/client";

interface CourseProps {
    courseName: string;
}

export function Course(props: CourseProps) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleUpdateEnc = (qrCodeContent: string) => {
        (async () => {
            const enc = /enc=(.*)$/.exec(qrCodeContent)!;
            console.log(enc[1]);
            UpdateCourseEnc(props.courseName, enc[1]);
        })();
    };

    return (
        <Box>
            <Card sx={{ width: 200, m: 2, p: 1 }}>
                <CardContent>
                    <Typography>{props.courseName}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        sx={{ margin: "auto" }}
                        size="small"
                        onClick={handleClick}
                        endIcon={<QrCodeScannerIcon></QrCodeScannerIcon>}
                    >
                        扫码二维码
                    </Button>
                </CardActions>

                <Dialog
                    fullWidth
                    onClick={() => {
                        setOpen(false);
                    }}
                    open={open}
                >
                    <DialogTitle>scan qrcode</DialogTitle>
                    <QrReader
                        onResult={(result) => {
                            if (result) {
                                setOpen(false);
                                handleUpdateEnc(result.getText());
                            }
                        }}
                        constraints={{ facingMode: "environment" }}
                    ></QrReader>
                </Dialog>
            </Card>
        </Box>
    );
}
