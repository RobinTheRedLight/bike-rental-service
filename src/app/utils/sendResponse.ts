import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(
  res: Response,
  data: TResponse<T> | null | undefined,
) => {
  if (
    data &&
    data.data !== null &&
    data.data !== undefined &&
    (Array.isArray(data.data) ? data.data.length > 0 : true)
  ) {
    res.status(data.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      token: data.token,
      data: data.data,
    });
  } else {
    res.status(204).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
};

export default sendResponse;
