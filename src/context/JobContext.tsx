// ** React Imports
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { fetcher } from "src/utils/fetcher";

const JobContext = createContext(null as any);

type Props = {
  children: ReactNode;
};

type IJobPriority = {
  key: string;
  value: number;
  label: string;
};

export type IJobType = {
  jobPriority: IJobPriority;
  jobName: string;
  id?: string;
};

type ISortType = {
  sortBy: "jobName" | "jobPriority";
  order: "asc" | "desc";
};

const JobProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<IJobType[]>([]);
  const [total, setTotal] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [jobPriorities, setJobPriorities] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<IJobPriority>();
  const [sort, setSort] = useState<ISortType>({
    sortBy: "jobPriority",
    order: "asc",
  });

  useEffect(() => {
    fetcher("/server", "GET").then((res: any) => setJobPriorities(res));
  }, []);

  const sortData = (data: IJobType[], sort: ISortType) => {
    if (sort.sortBy === "jobName") {
      data.sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.sortBy] > b[sort.sortBy] ? 1 : -1;
        }
        return a[sort.sortBy] < b[sort.sortBy] ? 1 : -1;
      });
    } else if (sort.sortBy === "jobPriority") {
      data.sort((a: any, b: any) => {
        if (sort.order === "asc") {
          return a[sort.sortBy]?.value > b[sort.sortBy]?.value ? 1 : -1;
        }
        return a[sort.sortBy]?.value < b[sort.sortBy]?.value ? 1 : -1;
      });
    }

    return data;
  };

  const filterJobs = useCallback(
    (search?: string, selected?: IJobPriority, sort?: ISortType) => {
      if (search) {
        const filteredJobs = jobs.filter((job) => {
          return job.jobName.toLowerCase().includes(search?.toLowerCase());
        });
        // sort the filtered jobs
        const sortedJobs = sortData(filteredJobs, sort!);
        setFilteredCount(sortedJobs.length);
        return sortedJobs;
      }
      if (selected) {
        const filteredJobs = jobs.filter((job) => {
          return job.jobPriority.key === selected.key;
        });
        // sort the filtered jobs
        const sortedJobs = sortData(filteredJobs, sort!);
        setFilteredCount(sortedJobs.length);
        return sortedJobs;
      }

      setFilteredCount(total);
      return sortData(jobs, sort!);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, selected, sort.sortBy, sort.order, []]
  );

  const deleteJob = (id: string) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(filteredJobs));
    setJobs(filteredJobs);
  };

  const editJob = (job: IJobType) => {
    const filteredJobs = jobs.filter((j) => j.id !== job.id);
    const updatedJobs = [...filteredJobs, job];
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const createId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const addJob = (job: IJobType) => {
    let newJobs;
    newJobs = [...jobs, { ...job, id: createId() }];
    setTotal(newJobs.length);
    setJobs(newJobs);
    localStorage.setItem("jobs", JSON.stringify(newJobs));
  };

  useEffect(() => {
    const data = localStorage.getItem("jobs");
    if (data) {
      setJobs(JSON.parse(data));
      setTotal(JSON.parse(data).length);
    }
  }, []);

  const values = {
    addJob,
    total,
    filteredCount,
    filterJobs,
    deleteJob,
    jobPriorities,
    search,
    setSearch,
    sort,
    setSort,
    selected,
    setSelected,
    editJob,
  } as any;

  return <JobContext.Provider value={values}>{children}</JobContext.Provider>;
};

export { JobContext, JobProvider };
