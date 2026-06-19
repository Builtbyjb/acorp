export type User = {
  id: number;
  username: string;
  email: string;
  organizationName: string;
  currentOrgId: number;
};

export type FetchInstance = {
  doGET: (url: string) => Promise<Response | Error>;
  doPOST: (url: string, data: unknown) => Promise<Response | Error>;
  doPUT: (url: string, data: unknown) => Promise<Response | Error>;
  doDELETE: (url: string) => Promise<Response | Error>;
};
