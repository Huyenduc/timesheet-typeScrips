

export const handleServiceError = (error: any) => {
    let message = "";
    if (error.response && error.response.data)
      message = error.response.data.error.message;
    if (!message) message = "Something wrong";
    return { error: message };
  };
  