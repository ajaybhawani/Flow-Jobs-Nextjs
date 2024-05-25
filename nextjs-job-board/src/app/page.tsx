import Image from "next/image";
import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItems";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Devlpoper jobs
        </h1>
        <p className="text-muted-foreground">find your dream job.</p>
      </div>
      <section>
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
