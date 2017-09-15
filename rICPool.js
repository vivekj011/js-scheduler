import rIC from "./rIC"
const jobs = []
const priorityJobs = []
const timeout = 5000 // ms
let isStarted = false

const doJob = deadline => {
  // you should at least have 5ms to do something :p
  while (deadline.timeRemaining() > 5 && isStarted) { 
    const job = priorityJobs.length ? priorityJobs.pop() : jobs.pop()
    job(deadline, addInCompleteJobs)
  }
  if (priorityJobs.length > 0 || jobs.length > 0) {
    rIC(doJob)
  } else {
    isStarted = false
  }
}
const addInCompleteJobs = job => {
  priorityJobs.unshift(job)
}
const addJob = (job, isOnPriority) => {
  isOnPriority ? priorityJobs.push(job) : jobs.push(job)

  if (!isStarted) {
    rIC(doJob, { timeout })
    isStarted = true
  }
}
export default {
  addJob
}
