"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { deleteProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);
  const handleDelete = async () => {
    const { token } = await fetchToken();
    setisDeleting(true);
    try {
      await deleteProject(projectId, token);
      router.push("/");
    } catch (error) {
      console.log("the error while deleting the post: ", error);
    } finally {
      setisDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/project-edit/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn bg-gray ${
          isDeleting ? " bg-red-600" : " bg-primary-purple "
        } `}
        onClick={handleDelete}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
