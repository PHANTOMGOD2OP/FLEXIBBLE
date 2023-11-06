"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import { useState } from "react";
import Image from "next/image";
import { FormField } from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, editProject } from "@/lib/actions";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    const { token } = await fetchToken();
    try {
      if (type === "create") {
        // create a project
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }
      if (type === "edit") {
        // create a project
        await editProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
      console.log("the error while submitting the data: ", error);
    } finally {
      setisSubmitting(false);
    }
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Plz upload an image");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setform((prev) => ({ ...prev, [fieldName]: value }));
  };
  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          type="file"
          id="poster"
          accept="image/"
          required={type == "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Owaisibble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://programmerowais.pro"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/PHANTOMGOD2OP"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/* // custom menu */}
      <CustomMenu
        title="category"
        state={form.category}
        setState={(value) => handleStateChange("category", value)}
        filters={categoryFilters}
      />
      <Button
        title={
          isSubmitting
            ? `${type === "create" ? "Creating" : "Editing"}`
            : `${type === "create" ? "Create" : "Edit"}`
        }
        type="submit"
        leftIcon={isSubmitting ? "" : "/plus.svg"}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default ProjectForm;
