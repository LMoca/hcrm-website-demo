import ServicePage from "@/pages/ServicePage";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/NotFound";

const Page = () => {
  const service = getServiceBySlug("healthcare-predictive-analytics");
  return service ? <ServicePage service={service} /> : <NotFound />;
};

export default Page;
