import { useContext } from "react";
import { JobContext } from "./JobContext";

export const useJob = () => useContext(JobContext);
