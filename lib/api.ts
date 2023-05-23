export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.log(res, "res");

    throw new Error("API error");
  }

  if (json) {
    console.log(res, "sdfsdfsdf");
    const data = await res?.json();
    console.log(data, "data");

    return data.data;
  }
};
const REGISTER_URL = "api/register";
const SIGNIN_URL = "api/signin";

export const register = (user) => {
  return fetcher({ url: REGISTER_URL, method: "POST", body: user });
};

export const signin = (user) => {
  return fetcher({ url: SIGNIN_URL, method: "POST", body: user });
};

export const createNewProject = async (name) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};
