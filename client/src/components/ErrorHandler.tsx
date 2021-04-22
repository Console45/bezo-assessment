import React, { FC } from "react";

interface ErrorHandlerProps {
  error: any;
}

export const ErrorHandler: FC<ErrorHandlerProps> = ({ error }) => {
  if (error) {
    return (
      <div>
        <div className="alert alert-danger text-center" role="alert">
          <p>
            {error.response.data.message
              ? error.response.data.message
              : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
