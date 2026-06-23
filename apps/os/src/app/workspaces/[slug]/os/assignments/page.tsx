import { ClipboardList, Sparkles, Plus, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = { title: "Assignments | MergeX OS" };

export default async function AssignmentsPage({ params }: PageProps) {
  const { slug } = await params;

  const mockTasks = [
    { id: 1, title: "Review brand onboarding status", priority: "HIGH", status: "PENDING", dueDate: "Today" },
    { id: 2, title: "Audit lead pipeline conversions", priority: "MEDIUM", status: "IN_PROGRESS", dueDate: "Tomorrow" },
    { id: 3, title: "Verify database replication sync", priority: "CRITICAL", status: "PENDING", dueDate: "Today" },
    { id: 4, title: "Finalize client proposal template updates", priority: "LOW", status: "COMPLETED", dueDate: "Done" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            Operational Checklist
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground font-clash">
            Assignments
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and execute operational task assignments across the {slug} workspace.
          </p>
        </div>

        <Button size="sm" className="w-fit cursor-pointer">
          <Plus className="h-4 w-4 mr-1.5" /> Assign Task
        </Button>
      </div>

      {/* Main checklist table */}
      <div className="border border-border/40 bg-card/40 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/5 flex items-center justify-center border border-[#8B5CF6]/15">
              <ClipboardList className="h-5 w-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Active Checklist</h2>
              <p className="text-xs text-muted-foreground">Real-time status of critical path operational items</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border/20">
          {mockTasks.map((task) => {
            const isCompleted = task.status === "COMPLETED";
            return (
              <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : task.status === "IN_PROGRESS" ? (
                      <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-[#8B5CF6]/50 shrink-0" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold leading-relaxed ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${
                        task.priority === "CRITICAL" ? "bg-red-500/10 text-red-500" :
                        task.priority === "HIGH" ? "bg-amber-500/10 text-amber-500" :
                        task.priority === "MEDIUM" ? "bg-blue-500/10 text-blue-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-muted-foreground">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-2.5">
                    {isCompleted ? "Reopen" : "Mark Done"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
