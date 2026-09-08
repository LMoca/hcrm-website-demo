import ServicePage from "@/pages/ServicePage";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/NotFound";

const Page = () => {
  const service = getServiceBySlug("stop-loss-reporting");
  return service ? <ServicePage service={service} /> : <NotFound />;
};

export default Page;
