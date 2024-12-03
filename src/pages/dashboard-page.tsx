import CustomBarChart from "@/components/bar-chart";
import Container from "@/components/container";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUsersByRole, getUsersByStatus } from "@/hooks/chart-data";

const DashboardPage = () => {
  const usersByStatus = getUsersByStatus();
  const usersByRole = getUsersByRole();

  return (
    <div>
      <Container>
        <Header title="Dashboard" style="header-primary" />

        <ScrollArea className="h-[600px] gap-6 w-full rounded-md border p-4">
          <CustomBarChart
            title="User Activity Insights"
            data={usersByStatus}
            dynamicKey="status"
          />
          <CustomBarChart
            title="Role Insigths of users"
            data={usersByRole}
            dynamicKey="status"
          />
        </ScrollArea>
      </Container>
    </div>
  );
};

export default DashboardPage;
