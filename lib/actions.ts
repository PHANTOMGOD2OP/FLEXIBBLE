import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  getUserQuery,
  createUserMutation,
  projectsQueryAll,
  projectsQueryWithFilter,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  deleteProjectMutation,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

// npx grafbase@0.24 dev
// configure the data
const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "owais";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/token`);
    return res.json();
  } catch (error) {
    console.log("error while fetching the token", error);
  }
};
const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};
export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  client.setHeader("Authorization", `Bearer ${token}`);
  if (imageUrl.url) {
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
export const fetchAllProjects = async (endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
  // if (category) {
  //   return makeGraphQLRequest(projectsQueryWithFilter, {
  //     category,
  //     endcursor,
  //   });
  // }
  return makeGraphQLRequest(projectsQueryAll, {
    endcursor,
  });
};

export const getProjectDetails = async (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};
export const getUserProjects = async (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const editProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }
  let updatedForm = { ...form };
  // check if the image is old/new
  if (isBase64DataURL(form.image)) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = { ...form, image: imageUrl.url };
    }
  }
  const variables = {
    id: projectId,
    input: updatedForm,
  };

  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(updateProjectMutation, variables);
};
