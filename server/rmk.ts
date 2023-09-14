export type RemoteMake = Record<string, Job>;

interface Job {
  after: string[];
  cmd: string;
}
