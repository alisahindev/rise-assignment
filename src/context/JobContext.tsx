// ** React Imports
import { createContext, ReactNode, useEffect, useState } from "react";

const JobContext = createContext(null as any);

type Props = {
  children: ReactNode;
};

type IJobType = {
  jobPriority: string;
  jobName: string;
  id?: string;
};

const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<IJobType[]>([]);
  const [total, setTotal] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("jobs");
    if (data) {
      setJobs(JSON.parse(data));
      setTotal(JSON.parse(data).length);
    }
    console.log(data);
  }, []);

  const filterJobs = (search: string) => {
    const filteredJobs = jobs.filter((job) => {
      return job.jobName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCount(filteredJobs.length);
  };

  const sortJobs = (sort: string) => {
    const sortedJobs = [...jobs];
    if (sort === "asc") {
      sortedJobs.sort((a, b) => {
        if (a.jobName < b.jobName) {
          return -1;
        }
        if (a.jobName > b.jobName) {
          return 1;
        }
        return 0;
      });
    } else if (sort === "desc") {
      sortedJobs.sort((a, b) => {
        if (a.jobName < b.jobName) {
          return 1;
        }
        if (a.jobName > b.jobName) {
          return -1;
        }
        return 0;
      });
    }
    setJobs(sortedJobs);
  };

  const deleteJob = (id: string) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);
    setJobs(filteredJobs);
  };

  const createId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addJob = (job: IJobType) => {
    const newJob = { ...job, id: createId() };
    setJobs([...jobs, newJob]);
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
  };

  const values = {
    addJob,
    jobs,
    total,
    filteredCount,
    filterJobs,
    sortJobs,
    deleteJob,
  } as any;

  return <JobContext.Provider value={values}>{children}</JobContext.Provider>;
};

export { JobContext, JobProvider };
