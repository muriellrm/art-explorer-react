import { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "404: This page could not be found.";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex items-center justify-center text-gray-800 text-base font-normal h-15">
        <span
          className="flex items-center justify-center h-full pr-4 text-xl font-medium !border-r !border-gray-800"          
        >
          404
        </span>
        <span className="pl-4 text-xl">This page could not be found.</span>
      </div>
    </div>
  );
};

export default NotFound;
