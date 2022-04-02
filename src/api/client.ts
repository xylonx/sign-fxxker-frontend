import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import config from "../config/config";

const client = axios.create({
    baseURL: config.BaseURL,
});

interface Response<T> {
    success: boolean;
    data: T;
}

interface apiWrapperConfig {
    toastError?: boolean;
}

async function apiWrapper<T>(
    request: Promise<AxiosResponse<Response<T>, any>>,
    config: apiWrapperConfig = { toastError: true }
): Promise<T | null> {
    try {
        const { data } = await request;
        return data.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const resp = err.response.data as Response<T>;
            if (config.toastError) toast.error(resp.data);
        } else {
            if (config.toastError) toast.error(`网络错误: ${err}`);
        }
    }
    return null;
}

export async function GetAllCourse(): Promise<string[] | null> {
    const resp = await apiWrapper<string[]>(client.get("/course"));
    if (resp !== null) toast.success("获取所有课程成功");
    return resp;
}

export async function UpdateCourseEnc(courseName: string, enc: string): Promise<string | null> {
    const resp = await apiWrapper<string>(client.put("/course", { course_name: courseName, enc: enc }));
    if (resp !== null) toast.success("更新二维码信息成功");
    return resp;
}
