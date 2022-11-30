// ** React Imports
import { createContext, ReactNode, useEffect, useState } from "react";

const JobContext = createContext(null);

type Props = {
  children: ReactNode;
};

type IJobType = {
  jobPriority: string;
  jobName: string;
};

const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<IJobType[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("jobs");
    if (data) {
      setJobs(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("jobs");
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const values = {
    jobs,
    setJobs,
  } as any;

  return <JobContext.Provider value={values}>{children}</JobContext.Provider>;
};

export { JobContext, JobProvider };
