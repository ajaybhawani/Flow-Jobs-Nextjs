import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { jobFilterSchema, jobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButtom from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";

async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

interface jobfilterSlidebarProps {
  defaultValues: jobFilterValues;
}


export default async function jobfilterSlidebar({
  defaultValues,
}: jobfilterSlidebarProps) {
  console.log("defaultValues", defaultValues);
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="md:w-[260px sticky top-0 h-fit rounded-lg border bg-background p-4">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="mb-2 flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              name="q"
              id="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value={""}>All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              name="location"
              id="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value={""}>All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButtom className="w-full">Filter jobs</FormSubmitButtom>
        </div>
      </form>
    </aside>
  );
}
